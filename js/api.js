/* =====================================================================
   API — LẤY NỘI DUNG TỪ GOOGLE SHEET
   ---------------------------------------------------------------------
   Thứ tự ưu tiên:
     1. Bộ nhớ đệm trong trình duyệt (nếu còn hạn) → vào web nhanh
     2. Gọi Apps Script lấy bản mới nhất từ Google Sheet
     3. Nếu hỏng / mất mạng → dùng js/fallback.js để web không bao giờ trắng

   ⚠️ KHÔNG SỬA nếu không được yêu cầu — đây là lớp nạp dữ liệu chung.
   ===================================================================== */

const KHOA_CACHE = 'rdnewlab_noidung_v2';

/* ---------- Tiện ích ---------- */

// Tách chuỗi nhiều giá trị ngăn bởi dấu | thành mảng
function tachDanh(chuoi) {
  if (Array.isArray(chuoi)) return chuoi.filter(Boolean);
  if (!chuoi) return [];
  return String(chuoi).split('|').map(s => s.trim()).filter(Boolean);
}

// Chặn HTML lạ từ Sheet (chống chèn mã độc vào trang)
function locHtml(chuoi) {
  if (chuoi === null || chuoi === undefined) return '';
  return String(chuoi)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

// Chỉ cho phép link http/https hoặc mailto/tel — chặn javascript:
function locLink(url) {
  const s = String(url || '').trim();
  if (!s) return '';
  if (/^(https?:\/\/|mailto:|tel:|#|images\/|\.\/)/i.test(s)) return locHtml(s);
  return '';
}

/* ---------- Bộ nhớ đệm ---------- */

function docCache() {
  try {
    const tho = localStorage.getItem(KHOA_CACHE);
    if (!tho) return null;
    const goi = JSON.parse(tho);
    const hanPhut = (Date.now() - goi.luc) / 60000;
    if (hanPhut > CONFIG.CACHE_PHUT) return null;
    return goi.data;
  } catch (e) { return null; }
}

function ghiCache(data) {
  try {
    localStorage.setItem(KHOA_CACHE, JSON.stringify({ luc: Date.now(), data: data }));
  } catch (e) { /* hết dung lượng thì bỏ qua, không làm hỏng trang */ }
}

/* ---------- Chuẩn hoá dữ liệu từ Sheet ----------
   Sheet trả về mảng các dòng thô. Hàm này gom về đúng hình dạng mà
   phần hiển thị đang chờ, và bù giá trị thiếu bằng nội dung dự phòng. */

/* ═══════════ NHẬN RA SHEET CÒN CŨ HƠN CODE ═══════════
   Giao diện và Google Sheet không phải lúc nào cũng được cập nhật cùng lúc:
   web mới upload trước, vài hôm sau chủ web mới rảnh nạp lại Sheet. Trong
   khoảng đó Sheet còn thiếu hẳn những mục mà giao diện mới đang chờ — chữ
   đầu trang cũ, thiếu app, thiếu nhóm lọc — nhìn như web hỏng.

   Dấu hiệu nhận biết: bản Sheet mới BAO GIỜ cũng có hai khoá dưới đây. Thiếu
   một trong hai nghĩa là Sheet chưa được nạp lại.

   Khi đó web tự lấy bản dự phòng cho những phần code biết là mới hơn, còn
   thông tin sống của chủ web (email, điện thoại, Zalo, link Drive, tài liệu,
   bài viết) VẪN lấy từ Sheet — vì đó là thứ chỉ chủ web mới biết.

   Nạp lại Sheet xong thì dấu hiệu này mất, Sheet tự giành lại toàn quyền —
   KHÔNG phải sửa code lần nữa.                                              */
function sheetConCu(caiDatSheet) {
  const c = caiDatSheet || {};
  return !String(c.nguoiSauTieuDe || '').trim() || !String(c.dichVuTieuDe || '').trim();
}

/* Những khoá chữ mà bản giao diện này "sở hữu" — đổi cùng lúc với bố cục.
   KHÔNG đưa email / điện thoại / Zalo / link Drive vào đây. */
const KHOA_BAN_MOI = [
  'chucDanh', 'heroDong1', 'heroDong2', 'heroTomTat',
  'tieuDeTrang', 'moTaSEO',
  'soLieu1So', 'soLieu1Nhan', 'soLieu2So', 'soLieu2Nhan', 'soLieu3So', 'soLieu3Nhan'
];

/* Ba trường ẢNH đi kèm bản web, không phải nội dung chủ web nhập.
   Sheet cũ trỏ vào tên file của bản trước → phải lấy theo code. */
const ANH_THEO_CODE = ['anh', 'iconAnh', 'poster'];

/* Bổ sung BÀI VIẾT cho app mà Sheet chưa có dòng nào.
   Vì sao cần: khi Sheet còn cũ, danh sách ứng dụng được bù thêm app mới (Auto HCNS)
   từ bản dự phòng — nhưng bảng bài viết của Sheet không có dòng nào cho app đó, nên
   mở ra chỉ thấy "bài viết chưa cập nhật". Ở đây ta ghép: giữ nguyên mọi bài Sheet
   đang có, và THÊM bài dự phòng cho những app mà Sheet chưa viết dòng nào. */
function gopBaiViet(tuSheet, duPhong) {
  const ds = Array.isArray(tuSheet) && tuSheet.length ? tuSheet.slice() : [];
  const daCoBai = {};
  ds.forEach(b => { if (b && b.maApp) daCoBai[b.maApp] = true; });
  (duPhong || []).forEach(b => {
    if (b && b.maApp && !daCoBai[b.maApp]) ds.push(b);   // app Sheet chưa viết → lấy bài dự phòng
  });
  return ds;
}

/* Bổ sung nhóm lọc mà Sheet chưa có, để app thêm vào không bị mồ côi nhóm */
function gopNhom(tuSheet, duPhong) {
  const ds = Array.isArray(tuSheet) && tuSheet.length ? tuSheet.slice() : (duPhong || []).slice();
  const daCo = {};
  ds.forEach(n => { if (n && n.ma) daCo[n.ma] = true; });
  (duPhong || []).forEach(n => { if (n && n.ma && !daCo[n.ma]) ds.push(n); });
  return ds;
}

/* ---------- Ghép ứng dụng: Sheet nói gì thì nghe, THIẾU thì lấy bản dự phòng ----------
   Vì sao cần: web và Google Sheet không phải lúc nào cũng được cập nhật cùng lúc.
   Người quản trị upload web mới trước, vài hôm sau mới rảnh nạp lại Sheet — trong
   khoảng đó Sheet còn thiếu cột mới (IconAnh, Poster). Nếu cứ lấy nguyên bản Sheet
   thì icon và poster biến mất, trang trông như hỏng.

   Luật ghép: ô nào Sheet CÓ CHỮ thì Sheet thắng (chủ web luôn là người quyết định);
   ô nào Sheet thiếu hoặc để trống mới lấy bản dự phòng bù vào. Ghép theo mã app. */
function gopUngDung(tuSheet, duPhong, conCu) {
  if (!Array.isArray(tuSheet) || !tuSheet.length) return duPhong;

  const banDo = {};
  (duPhong || []).forEach(u => { if (u && u.id) banDo[u.id] = u; });

  const ds = tuSheet.map(u => {
    const bu = u && banDo[u.id];
    if (!bu) return u;                       // app chỉ có trên Sheet — giữ nguyên
    const gop = Object.assign({}, u);
    Object.keys(bu).forEach(k => {
      const v = gop[k];
      if (v === undefined || v === null || String(v).trim() === '') gop[k] = bu[k];
    });
    /* Sheet còn cũ thì ĐƯỜNG DẪN ẢNH lấy theo code, kể cả khi Sheet có ghi.
       Lý do: ảnh nằm trong thư mục images/ đi kèm bản web, không phải nội dung
       chủ web nhập. Sheet cũ trỏ vào tên file của bản trước — file đó đã bị thay,
       giữ lại chỉ ra ô ảnh trống. Nạp lại Sheet là Sheet giành lại quyền. */
    if (conCu) ANH_THEO_CODE.forEach(k => { if (bu[k]) gop[k] = bu[k]; });
    return gop;
  });

  /* Sheet còn cũ thì bổ sung nốt app mà nó chưa hề có (ví dụ Auto HCNS).
     KHÔNG làm điều này khi Sheet đã mới — lúc đó chủ web xoá một dòng nghĩa
     là thật sự muốn bỏ app đó, code không được tự thêm lại. */
  if (conCu) {
    const daCo = {};
    ds.forEach(u => { if (u && u.id) daCo[u.id] = true; });
    /* Xếp CUỐI, giữ nguyên thứ tự Sheet đang có. Không sắp lại theo cột ThuTu:
       bản dự phòng không mang cột đó, sắp lại là app bù nhảy lên đầu danh sách. */
    (duPhong || []).forEach(u => { if (u && u.id && !daCo[u.id]) ds.push(u); });
  }
  return ds;
}

/* ---------- Ghép video: Sheet/RSS có video thì nghe, THIẾU thì lấy bản dự phòng ----------
   Vì sao cần: video của web đọc từ kênh YouTube qua Apps Script (RSS). Khi RSS
   trục trặc (kênh mới chưa có nguồn RSS, hoặc YouTube chặn) thì danh sách trả về
   rỗng — nếu cứ nghe theo, mục video trắng trơn. Ở đây: RSS có video thì dùng
   RSS (tự cập nhật video mới); RSS rỗng thì giữ danh sách video trong bản dự
   phòng để mục video luôn có nội dung. Đường dẫn kênh ưu tiên RSS, thiếu thì dự phòng. */
function gopVideo(tuSheet, duPhong) {
  const s = (tuSheet && typeof tuSheet === 'object') ? tuSheet : {};
  const d = duPhong || {};
  const ds = (Array.isArray(s.ds) && s.ds.length) ? s.ds : (Array.isArray(d.ds) ? d.ds : []);
  return { kenh: s.kenh || d.kenh || '', ds: ds };
}

function chuanHoa(tho) {
  const dp = NOI_DUNG_DU_PHONG;
  if (!tho || typeof tho !== 'object') return dp;

  const lay = (khoa) => (Array.isArray(tho[khoa]) && tho[khoa].length) ? tho[khoa] : dp[khoa];

  // Sheet đã nạp lại chưa? Quyết định vài chỗ bên dưới.
  const conCu  = sheetConCu(tho.caiDat);
  const caiDat = Object.assign({}, dp.caiDat, tho.caiDat || {});
  if (conCu) {
    // Sheet còn bản cũ → chữ khung sườn lấy theo giao diện mới cho khớp
    KHOA_BAN_MOI.forEach(k => { if (dp.caiDat[k]) caiDat[k] = dp.caiDat[k]; });
    if (CONFIG.DEBUG) console.info(
      '[web] Google Sheet chưa nạp lại nội dung bản mới — đang dùng bản dự phòng ' +
      'cho phần chữ khung sườn và các ứng dụng còn thiếu.');
  }

  return {
    caiDat:       caiDat,
    dinhHuong:    lay('dinhHuong'),
    linhVuc:      lay('linhVuc'),
    nangLuc:      lay('nangLuc'),
    ungDung:      gopUngDung(lay('ungDung'), dp.ungDung, conCu),
    // Sheet cũ thì bù bài viết cho app Sheet chưa viết (ví dụ Auto HCNS)
    baiViet:      conCu ? gopBaiViet(lay('baiViet'), dp.baiViet) : lay('baiViet'),
    taiLieu:      lay('taiLieu'),
    // Sheet cũ thì bù nốt nhóm lọc còn thiếu, để app thêm vào có chỗ đứng
    nhomUngDung:  conCu ? gopNhom(lay('nhomUngDung'), dp.nhomUngDung) : lay('nhomUngDung'),
    nhomTaiLieu:  lay('nhomTaiLieu'),
    congDong:     lay('congDong'),
    videos:       gopVideo(tho.videos, dp.videos),
    _nguon:       'sheet'
  };
}

/* ---------- Lấy NGAY không chờ mạng ----------
   Trả về bộ nhớ đệm (nếu còn hạn) hoặc nội dung dự phòng — đồng bộ, 0ms.
   Web vẽ bằng bản này trước cho khách thấy trang tức thì, rồi mới lấy
   bản mới từ Sheet ở phía sau và vẽ đè lên khi về tới nơi.              */
function layNhanh() {
  const cache = docCache();
  if (cache) return Object.assign({}, cache, { _nguon: 'cache' });
  return Object.assign({}, NOI_DUNG_DU_PHONG, { _nguon: 'duphong' });
}

/* ---------- Hàm chính ---------- */

async function layNoiDung() {
  // 1. Chưa cấu hình link → chạy bằng nội dung dự phòng
  if (!CONFIG.API_URL) {
    if (CONFIG.DEBUG) console.log('[noi-dung] Chưa có API_URL → dùng fallback.js');
    return Object.assign({}, NOI_DUNG_DU_PHONG, { _nguon: 'duphong' });
  }

  // 2. Còn cache hạn thì dùng luôn
  const cache = docCache();
  if (cache) {
    if (CONFIG.DEBUG) console.log('[noi-dung] Dùng bộ nhớ đệm');
    return Object.assign({}, cache, { _nguon: 'cache' });
  }

  // 3. Gọi Google Sheet, có hẹn giờ để không treo trang
  try {
    const boHen = new AbortController();
    const dongHo = setTimeout(() => boHen.abort(), CONFIG.TIMEOUT_GIAY * 1000);

    const phanHoi = await fetch(CONFIG.API_URL, { signal: boHen.signal });
    clearTimeout(dongHo);

    if (!phanHoi.ok) throw new Error('HTTP ' + phanHoi.status);
    const json = await phanHoi.json();
    if (json.status && json.status !== 'success') throw new Error(json.message || 'Sheet trả lỗi');

    const data = chuanHoa(json.data || json);
    ghiCache(data);
    if (CONFIG.DEBUG) console.log('[noi-dung] Đã lấy từ Google Sheet');
    return data;

  } catch (loi) {
    if (CONFIG.DEBUG) console.warn('[noi-dung] Không lấy được từ Sheet:', loi.message);
    return Object.assign({}, NOI_DUNG_DU_PHONG, { _nguon: 'duphong' });
  }
}

/* ---------- Gửi form liên hệ ----------
   Gửi kèm mấy trường phục vụ chống bot:
     website  — ô mồi, người thật không nhìn thấy nên luôn để trống
     giay     — số giây từ lúc mở trang tới lúc bấm gửi (bot gửi rất nhanh)
     khach    — mã ẩn danh, để máy chủ chặn gửi dồn dập từ cùng một máy
   Máy chủ tự kiểm ba thứ này, phía web không cần làm gì thêm.          */

async function guiLienHe(duLieu) {
  if (!CONFIG.URL_FORM) throw new Error('Chưa cấu hình link Apps Script trong js/config.js');

  const form = new FormData();
  form.append('action', 'lienhe');
  Object.keys(duLieu).forEach(k => form.append(k, duLieu[k]));
  form.append('nguon', location.hostname || 'cuc-bo');
  form.append('thietBi', window.matchMedia('(max-width: 760px)').matches ? 'dien-thoai' : 'may-tinh');
  try { form.append('khach', ThongKe.maKhach()); } catch (e) {}

  const phanHoi = await fetch(CONFIG.URL_FORM, { method: 'POST', body: form });
  if (!phanHoi.ok) throw new Error('Máy chủ trả về mã ' + phanHoi.status);
  return await phanHoi.json();
}

/* ---------- Gửi câu hỏi cho chatbot AI ----------
   Gửi câu hỏi + vài lượt gần nhất (để bot nhớ ngữ cảnh) tới Apps Script;
   Apps Script gọi Gemini rồi trả về câu trả lời. Không thu thập thông tin cá nhân. */
async function guiChat(cauHoi, lichSu) {
  if (!CONFIG.URL_FORM) throw new Error('Chưa cấu hình link Apps Script');
  const form = new FormData();
  form.append('action', 'chat');
  form.append('hoi', String(cauHoi || '').slice(0, 1000));
  form.append('lichSu', JSON.stringify((lichSu || []).slice(-5)));
  try { form.append('khach', ThongKe.maKhach()); } catch (e) {}
  const phanHoi = await fetch(CONFIG.URL_FORM, { method: 'POST', body: form });
  if (!phanHoi.ok) throw new Error('Máy chủ trả về mã ' + phanHoi.status);
  return await phanHoi.json();
}

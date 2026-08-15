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

function chuanHoa(tho) {
  const dp = NOI_DUNG_DU_PHONG;
  if (!tho || typeof tho !== 'object') return dp;

  const lay = (khoa) => (Array.isArray(tho[khoa]) && tho[khoa].length) ? tho[khoa] : dp[khoa];

  return {
    caiDat:       Object.assign({}, dp.caiDat, tho.caiDat || {}),
    dinhHuong:    lay('dinhHuong'),
    linhVuc:      lay('linhVuc'),
    nangLuc:      lay('nangLuc'),
    ungDung:      lay('ungDung'),
    baiViet:      lay('baiViet'),
    taiLieu:      lay('taiLieu'),
    nhomUngDung:  lay('nhomUngDung'),
    nhomTaiLieu:  lay('nhomTaiLieu'),
    videos:       (tho.videos && typeof tho.videos === 'object') ? tho.videos : dp.videos,
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

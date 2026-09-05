/* ═══════════════════════════════════════════════════════════════
   CHAT.JS — Khung trò chuyện với trợ lý AI (Gemini qua Apps Script)
   • Mở bằng nút 💬 trong cụm nút nổi (render.js thêm khi CaiDat.botBat bật).
   • Lưu lịch sử NGAY TRONG MÁY khách (localStorage) — KHÔNG thu thập tên/SĐT.
   • Mọi lỗi nuốt lặng lẽ: hỏng thì mời khách nhắn Zalo, web không vỡ.
   ═══════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var KHOA_LS = 'rdnl_chat_v1';
  var TRAN_TIN = 40;                 // giữ tối đa 40 tin gần nhất trong máy khách
  var khung, than, oNhap, formNhap, luuY, tenBot;
  var lichSu = [];                   // [{vaiTro:'nguoi'|'bot', chu:'...'}]
  var daChao = false, dangGui = false;

  function $(id) { return document.getElementById(id); }
  function cd() { try { return (DU_LIEU && DU_LIEU.caiDat) || {}; } catch (e) { return {}; } }

  /* ---------- lịch sử trong máy khách ---------- */
  function docLS() {
    try { var t = localStorage.getItem(KHOA_LS); return t ? JSON.parse(t) : []; } catch (e) { return []; }
  }
  function luuLS() {
    try { localStorage.setItem(KHOA_LS, JSON.stringify(lichSu.slice(-TRAN_TIN))); } catch (e) {}
  }

  /* Bỏ dấu **, * và markdown cho câu trả lời bot đọc gọn (đề phòng bot lỡ dùng). */
  function lamSach(s) {
    s = String(s || '');
    s = s.replace(/\*\*/g, '');
    s = s.replace(/^[ \t]*[\*\-]\s+/gm, '• ');
    s = s.replace(/\*/g, '');
    return s.trim();
  }

  /* ---------- vẽ một dòng tin ---------- */
  function themTin(vaiTro, chu, dangCho) {
    var d = document.createElement('div');
    d.className = 'chat-tin chat-tin--' + (vaiTro === 'nguoi' ? 'nguoi' : 'bot') + (dangCho ? ' chat-tin--cho' : '');
    if (dangCho) {
      // "đang gõ" — ba chấm nhún cho cảm giác bot đang soạn
      d.innerHTML = '<span class="chat-cham"></span><span class="chat-cham"></span><span class="chat-cham"></span>';
    } else {
      d.textContent = (vaiTro === 'bot') ? lamSach(chu) : chu;   // textContent = an toàn
    }
    than.appendChild(d);
    than.scrollTop = than.scrollHeight;
    return d;
  }
  /* Đổi bong bóng "đang gõ" thành câu trả lời thật (gõ dần cho mượt). */
  function datTraLoi(el, chu) {
    el.classList.remove('chat-tin--cho');
    el.innerHTML = '';
    var full = lamSach(chu), i = 0;
    // Gõ xong trong ~0,35 giây bất kể câu dài ngắn: vẫn thấy chữ chạy ra cho
    // mượt, nhưng không bắt khách ngồi chờ thêm cả giây sau khi bot đã trả lời.
    var buoc = Math.max(1, Math.ceil(full.length / 24));
    (function go() {
      i = Math.min(full.length, i + buoc);
      el.textContent = full.slice(0, i);
      than.scrollTop = than.scrollHeight;
      if (i < full.length) setTimeout(go, 14);
    })();
  }

  /* ---------- mở / đóng ---------- */
  function chao() {
    if (daChao) return;
    daChao = true;
    var c = cd();
    tenBot.textContent = 'Trợ lý ' + (locHtml ? locHtml(c.hieuChu || 'rd.newlab') : 'rd.newlab');
    luuY.textContent = c.botLuuY || 'Câu trả lời do AI tạo, có thể chưa chính xác — chi tiết vui lòng nhắn Zalo.';
    lichSu = docLS();
    if (lichSu.length) {
      than.innerHTML = '';
      lichSu.forEach(function (t) { themTin(t.vaiTro, t.chu); });
    } else {
      themTin('bot', c.botLoiChao || 'Chào anh/chị 👋 Mình có thể giúp gì ạ?');
    }
  }
  function moChat() {
    chao();
    khung.classList.remove('an');
    document.body.classList.add('chat-mo');
    setTimeout(function () { try { oNhap.focus(); } catch (e) {} }, 60);
  }
  function dongChat() {
    khung.classList.add('an');
    document.body.classList.remove('chat-mo');
  }

  /* ---------- gửi câu hỏi ---------- */
  function tuDongCao() { oNhap.style.height = 'auto'; oNhap.style.height = Math.min(oNhap.scrollHeight, 120) + 'px'; }

  async function gui(hoi) {
    if (dangGui) return;
    hoi = String(hoi || '').trim();
    if (!hoi) return;

    dangGui = true;
    themTin('nguoi', hoi);
    lichSu.push({ vaiTro: 'nguoi', chu: hoi });
    luuLS();
    oNhap.value = ''; tuDongCao();

    var cho = themTin('bot', '…', true);

    try {
      var kq = await guiChat(hoi, lichSu);
      var traLoi = (kq && (kq.traLoi || kq.message)) ||
        'Xin lỗi, mình chưa trả lời được lúc này. Anh/chị nhắn Zalo giúp mình nhé.';
      datTraLoi(cho, traLoi);
      lichSu.push({ vaiTro: 'bot', chu: traLoi });
      luuLS();
    } catch (e) {
      datTraLoi(cho, 'Mình đang bận một chút. Anh/chị vui lòng nhắn Zalo để được trả lời nhanh nhé.');
    } finally {
      dangGui = false;
      than.scrollTop = than.scrollHeight;
    }
  }

  /* ---------- gắn sự kiện (một lần) ---------- */
  function gan() {
    khung = $('khung-chat'); than = $('chat-than'); oNhap = $('chat-o');
    formNhap = $('chat-form'); luuY = $('chat-luuy'); tenBot = $('chat-ten');
    if (!khung || !than) return;

    // Mở: nút 💬 do render.js vẽ lại nhiều lần → bắt bằng uỷ quyền trên document
    document.addEventListener('click', function (e) {
      if (e.target.closest && e.target.closest('.mo-chat')) { e.preventDefault(); moChat(); }
    });
    $('chat-dong').addEventListener('click', dongChat);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !khung.classList.contains('an')) dongChat();
    });

    formNhap.addEventListener('submit', function (e) { e.preventDefault(); gui(oNhap.value); });
    oNhap.addEventListener('input', tuDongCao);
    oNhap.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); gui(oNhap.value); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', gan);
  else gan();
})();

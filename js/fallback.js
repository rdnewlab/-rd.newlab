/* =====================================================================
   NỘI DUNG DỰ PHÒNG (FALLBACK) — WEB V5.1
   ---------------------------------------------------------------------
   Web ưu tiên lấy nội dung từ Google Sheet. File này chỉ dùng khi:
     • Chưa dán link Apps Script vào js/config.js, hoặc
     • Google Sheet lỗi / mất mạng / vượt hạn mức.

   ⚙ FILE NÀY DO MÁY SINH RA: chạy hàm doGet() thật của Code.gs V5 trên đúng
     bản mẫu sẽ nạp vào Sheet → nội dung khớp 100% với Sheet lúc mới dựng.
     Muốn đổi nội dung web: SỬA TRÊN SHEET, đừng sửa file này.

   ⚠️ TUYỆT ĐỐI KHÔNG ghi tên công ty / nhà máy / khách hàng vào đây.
   ===================================================================== */

const NOI_DUNG_DU_PHONG = {
 "caiDat": {
  "tenThuongHieu": "rd.newlab",
  "tenHienThi": "Kỹ sư R&D & Tự động hoá",
  "chucDanh": "Nhận viết phần mềm theo yêu cầu",
  "tieuDeTrang": "Viết phần mềm theo yêu cầu cho nhà máy",
  "moTaSEO": "Nhận viết phần mềm theo yêu cầu cho nhà máy dược phẩm – thực phẩm – mỹ phẩm: kế hoạch vật tư, kho theo lô, kiểm nghiệm, điều hành sản xuất, nhân sự, kinh doanh, hồ sơ. Mười ứng dụng đang chạy thật.",
  "heroDong1": "Viết phần mềm cho đúng việc",
  "heroDong2": "nhà máy của bạn đang làm",
  "heroTomTat": "Phần mềm bán sẵn bắt nhà máy uốn theo nó. Tôi làm ngược lại: xuống tận nơi, ngồi cùng người trực tiếp làm — thủ kho, trưởng ca, kiểm nghiệm viên — rồi viết đúng thứ họ cần, chạy khớp quy trình họ đang chạy. **Bạn cứ mô tả bằng lời, không cần biết kỹ thuật; phần còn lại để tôi lo.** Các ứng dụng nối nhau qua Google Sheet, Drive và Apps Script — ==không cần mua máy chủ==, chi phí rất nhẹ, chỉ từ khoảng **100 nghìn đồng**. Những ứng dụng dưới đây đều lớn lên theo cách đó, và đang chạy thật mỗi ngày trong nhà máy.",
  "ctaChinh": "Xem các ứng dụng",
  "ctaPhu": "Thư viện tài liệu",
  "soLieu1So": "10",
  "soLieu1Nhan": "ứng dụng đã xây dựng",
  "soLieu2So": "120",
  "soLieu2Nhan": "phân hệ nghiệp vụ",
  "soLieu3So": "3",
  "soLieu3Nhan": "ngành đang phục vụ",
  "email": "rd.newlab@gmail.com",
  "emailPhu": "softwarefull2023@gmail.com",
  "dienThoai": "0902 620 715",
  "dienThoaiPhu": "0943 156 780",
  "zalo": "https://zalo.me/0943156780",
  "github": "https://github.com/rdnewlab",
  "khuVuc": "Hà Nội, Việt Nam",
  "nhanViec": "Nhận việc ở tất cả khu vực",
  "driveThuVien": "",
  "congTaiBaoMat": "https://drive.google.com/drive/folders/1xh5HYDwtYePJjn9-wUpeXXkIAX15ioPA?usp=sharing",
  "chanTrang": "Nội dung trang được quản lý bằng Google Sheet.",
  "dichVuNhan": "Đặt làm riêng",
  "dichVuTieuDe": "Phần mềm may đo cho mọi ngành sản xuất",
  "dichVuChu": "Mỗi nhà máy một kiểu làm, nhưng ngành nào cũng chạy trên cùng một bộ khung: **nguyên liệu → công thức, định mức → kế hoạch → lệnh sản xuất → kiểm tra chất lượng → kho → bán hàng → nhân sự**. Bộ khung ấy đã chạy thật trong các ứng dụng phía trên. Tôi lấy nó *may đo lại đúng theo cách xưởng của anh chị đang làm* — dù là xưởng may, nhà máy phân bón, hoá chất, thuốc thú y hay thức ăn cho thú cưng. Mọi phần nối nhau qua Google Sheet, Drive và Apps Script, ==không cần mua máy chủ==, chi phí khởi điểm chỉ từ khoảng **100 nghìn đồng**.",
  "dichVuY": "Từ một công cụ nhỏ giải đúng một việc, tới cả hệ thống nhiều phân hệ nối liền nhau|Khảo sát tận nơi, gỡ rối quy trình trước rồi mới viết phần mềm — chạy trên cả máy tính lẫn điện thoại|Dữ liệu nằm trong Google Drive của chính anh chị; bàn giao kèm hướng dẫn và bảo hành chỉnh sửa",
  "dichVuNut": "Trao đổi yêu cầu",
  "dichVuNganhNhan": "Ngành sản xuất phục vụ",
  "dichVuNganh": "🍜 Thực phẩm & đồ uống|💊 Dược phẩm & TPCN|💄 Mỹ phẩm|⚗️ Hoá chất|🌱 Phân bón & thuốc BVTV|🐄 Thuốc thú y|🌾 Thức ăn chăn nuôi|🐾 Pet – thú cưng|👕 May mặc & dệt may|📦 Bao bì & in ấn|⚙️ Cơ khí & lắp ráp|🧴 Nhựa & cao su|🪵 Gỗ & nội thất|🧱 Vật liệu xây dựng|🐟 Thuỷ sản|➕ Ngành khác — cứ hỏi",
  "dichVuVungNhan": "Khâu số hoá được",
  "dichVuVung": "Nghiên cứu – công thức|Mua hàng & kho|Kế hoạch sản xuất|Lệnh sản xuất & hồ sơ lô|Kiểm tra chất lượng|Bảo trì thiết bị|Bán hàng & công nợ|Nhân sự – chấm công – lương",
  "dichVuBuoc": "Anh chị mô tả bằng lời việc cần làm|Khảo sát, chốt quy trình và báo giá|Làm bản chạy thử trên dữ liệu thật|Bàn giao, hướng dẫn, bảo hành",
  "nguoiSauNhan": "Người đứng sau",
  "nguoiSauTieuDe": "Nghiên cứu công thức và tự động hoá quy trình",
  "nguoiSauChu": "Tôi không đi từ nghề lập trình sang nhà máy, mà đi ngược lại. Hơn mười năm làm nghiên cứu phát triển công thức cho thực phẩm, mỹ phẩm và hoá mỹ phẩm, tôi đi gần hết một nhà máy: bàn thí nghiệm R&D, phòng kiểm nghiệm QC, hệ thống chất lượng QA, kế hoạch vật tư và kho, rồi ra tận chuyền sản xuất — ở cả vị trí trực tiếp làm lẫn vị trí quản lý.\nKhi thấy phần lớn thời gian của phòng R&D bị nuốt bởi việc gõ lại số liệu giữa hàng chục file Excel, tôi bắt đầu tự viết phần mềm để dẹp phần việc đó. Vốn nghề ấy cho tôi một thứ khó có được nếu chỉ biết code: ==nhìn một bài toán là thấy ngay nó chạm vào những phòng nào, và ai sẽ là người phải gánh phần khó.==",
  "nguoiSauY": "Bào chế công thức thực phẩm · mỹ phẩm · hoá mỹ phẩm — hiểu tới bản chất từng nguyên liệu|Thiết kế và layout dây chuyền công nghệ chạy được thật: chọn và tính thiết bị, tính công trình và dự trù chi phí đầu tư|Hiểu sâu máy móc sản xuất dược phẩm, thực phẩm, mỹ phẩm; nắm chuẩn GMP và ISO|Vẽ kỹ thuật và sơ đồ quy trình bằng AutoCAD, Visio; thành thạo phần mềm quản lý công việc|Trực tiếp triển khai phần mềm quản trị doanh nghiệp (Bravo, BAS) và lưu trữ dữ liệu trên NAS — dựng hệ truy xuất nguồn gốc|Thành thạo máy tính, mạng và kết nối hệ thống; đưa AI vào công việc mỗi ngày|Rành thủ tục và pháp luật của từng ngành|Hơn 10 năm trong nghề — không phải dân lập trình thuần",
  "nguoiSauThem": "Thứ tôi mang vào mỗi phần mềm không phải là kỹ thuật lập trình, mà là hiểu biết nghề. Tôi bào chế được công thức, nắm quy trình sản xuất và biết thiết kế bố trí một dây chuyền chạy được ngoài thực tế; hiểu thiết bị nhà máy, chuẩn GMP và ISO, thủ tục và pháp luật của từng ngành. Nhờ vậy phần mềm tôi viết không chỉ chạy đúng, mà ==đúng cách người trong nghề cần==.\nTôi cũng đưa AI vào công việc mỗi ngày — để đọc nhanh một quy định, dựng nháp một công thức, hay soi lỗi một quy trình. Công cụ mới giúp một người làm được phần việc của cả nhóm, và đó là cách tôi giữ cho từng ứng dụng vừa ra nhanh, vừa chắc.",
  "danhNgonTren": "Đừng xấu hổ khi không biết, chỉ xấu hổ khi không học.",
  "danhNgonDuoi": "Học nữa, học mãi.",
  "dichVuAnh": "",
  "appTrungTam": "auto-rd",
  "nhomMoRong": "morong",
  "udChinhTieuDe": "Ứng dụng chính",
  "udChinhMoTa": "Bộ phần mềm chạy trọn chuỗi nhà máy — từ công thức, vật tư, sản xuất, kiểm nghiệm tới bán hàng và nhân sự.",
  "videoTuDong": "1",
  "botBat": "1",
  "soGoi": "0943156780",
  "botLoiChao": "Chào anh/chị 👋 Mình là trợ lý của rd.newlab. Anh/chị muốn hỏi về phần mềm nào, hay cần viết phần mềm cho việc gì ạ?",
  "botLuuY": "Câu trả lời do AI tạo, có thể chưa chính xác với phần chưa được cập nhật — chi tiết vui lòng nhắn Zalo.",
  "botKienThuc": "",
  "botKhoApp": "https://drive.google.com/drive/folders/1aplssg2qiDzRNCJqFNye0hyUdwO5yOab",
  "botKhoTaiLieu": "https://drive.google.com/drive/folders/1xh5HYDwtYePJjn9-wUpeXXkIAX15ioPA",
  "phienBanWeb": "V5"
 },
 "dinhHuong": [
  {
   "id": "hoc",
   "icon": "📚",
   "tieuDe": "Muốn tham gia dự án để học nghề thật",
   "noiDung": "Tôi tìm những dự án cho phép mình ngồi cùng người trực tiếp làm việc — trưởng ca, thủ kho, kiểm nghiệm viên — chứ không chỉ nhận bản yêu cầu rồi code. Mỗi lần như vậy tôi học được một quy tắc nghiệp vụ mà không tài liệu nào ghi lại."
  },
  {
   "id": "xaydung",
   "icon": "📐",
   "tieuDe": "Đi cùng dự án từ bản thiết kế tới sản phẩm chạy được",
   "noiDung": "Tôi muốn tham gia trọn vòng đời của một sản phẩm: khảo sát nghiệp vụ, dựng luồng dữ liệu, thiết kế giao diện, viết phần mềm, rồi ngồi cạnh người dùng trong những ngày chạy thật đầu tiên. Bàn giao không phải là vạch đích — phần lớn cải tiến có giá trị nhất chỉ lộ ra sau vài tháng sản phẩm sống trong công việc hằng ngày."
  },
  {
   "id": "gop",
   "icon": "🤝",
   "tieuDe": "Góp được ngay từ buổi đầu",
   "noiDung": "Điểm mạnh của tôi là hiểu cả hai đầu: đọc được công thức, định mức, hồ sơ lô — và cũng viết được phần mềm xử lý chúng. Nhờ vậy giai đoạn khảo sát nghiệp vụ thường rút ngắn đáng kể, vì không phải phiên dịch qua lại giữa dân kỹ thuật và dân lập trình."
  },
  {
   "id": "ai",
   "icon": "🤖",
   "tieuDe": "Đưa AI vào công việc thật, không dùng theo phong trào",
   "noiDung": "Tôi dùng AI hằng ngày như một công cụ sản xuất: soạn và rà soát quy trình, đối chiếu văn bản pháp lý, biến hồ sơ scan thành dữ liệu tra cứu được, dựng và kiểm tra mã nguồn. Giá trị nằm ở chỗ biết việc nào giao cho AI thì nhanh gấp nhiều lần, và việc nào bắt buộc con người phải kiểm — với hồ sơ chất lượng, một câu trả lời sai mà nghe rất hợp lý còn nguy hiểm hơn là không có câu trả lời nào."
  },
  {
   "id": "tich",
   "icon": "🧭",
   "tieuDe": "Tích luỹ để đi xa hơn công cụ nội bộ",
   "noiDung": "Phần lớn ứng dụng hiện tại đều sinh ra từ nhu cầu có thật của một nhà máy. Bước tiếp theo tôi muốn nhắm tới là chuẩn hoá chúng thành sản phẩm dùng được cho nhiều đơn vị: tài liệu đầy đủ, cấp phép rõ ràng, có quy trình cập nhật và hỗ trợ tử tế."
  },
  {
   "id": "mo",
   "icon": "💬",
   "tieuDe": "Sẵn sàng nhận phản biện",
   "noiDung": "Tôi không cho rằng cách mình làm đã là tối ưu. Nếu anh/chị thấy chỗ nào trong các ứng dụng này sai nguyên tắc ngành hoặc có cách làm gọn hơn, tôi rất mong được nghe — đó là loại góp ý khó mua bằng tiền."
  }
 ],
 "linhVuc": [
  {
   "id": "rd",
   "icon": "🧪",
   "tieuDe": "Nghiên cứu & phát triển sản phẩm",
   "tenNgan": "Nghiên cứu & phát triển",
   "moTa": "Xây dựng công thức cho ba nhóm: dược phẩm và thực phẩm bảo vệ sức khoẻ (cốm, viên nén, bao phim, nang cứng, nang mềm, siro), mỹ phẩm (serum, kem, sữa tắm, dầu gội) và hoá mỹ phẩm gia dụng (nước giặt, nước lau sàn). Công việc không dừng ở công thức: nghiên cứu độ ổn định, chọn bao bì phù hợp cho từng dạng bào chế, và đưa mẫu từ phòng lab lên quy mô công nghiệp mà vẫn giữ được chất lượng.",
   "the": "Dược · TPBVSK|Mỹ phẩm|Home care|Độ ổn định & bao bì"
  },
  {
   "id": "chatluong",
   "icon": "🛡️",
   "tieuDe": "Chất lượng & tuân thủ (QA – QC)",
   "tenNgan": "Chất lượng QA – QC",
   "moTa": "Xây dựng, cải tiến và tái cấu trúc hệ thống theo GMP, ISO, HACCP và Halal: soạn SOP, dựng tiêu chuẩn cho nguyên liệu – bao bì – bán thành phẩm – thành phẩm, kiểm soát quá trình trên chuyền, xử lý sự không phù hợp và phản hồi chất lượng từ khách hàng. Trực tiếp đào tạo GMP/ISO cho nhân sự và chủ trì làm việc với đoàn thanh tra, kiểm tra.",
   "the": "GMP · ISO · HACCP · Halal|SOP & tiêu chuẩn|Kiểm soát trên chuyền|Đào tạo nội bộ"
  },
  {
   "id": "vattu",
   "icon": "📦",
   "tieuDe": "Kế hoạch vật tư, kho & điều phối sản xuất",
   "tenNgan": "Vật tư & kho",
   "moTa": "Dự trù nguyên vật liệu từ định mức kỹ thuật cho cả mẻ thử lẫn lô công nghiệp, làm việc với nhà cung cấp để tìm nguyên liệu thay thế, theo dõi tồn kho và xếp lịch chạy cho các tổ pha chế, định liều, đóng gói. Đây là phần việc dạy tôi rằng một kế hoạch chỉ tốt bằng đúng độ chính xác của số liệu tồn kho đứng phía sau nó.",
   "the": "Dự trù NVL|Định mức kỹ thuật|Quản lý tồn kho|Điều phối chuyền"
  },
  {
   "id": "duan",
   "icon": "🏭",
   "tieuDe": "Dự án đầu tư & setup nhà xưởng",
   "tenNgan": "Dự án & nhà xưởng",
   "moTa": "Triển khai các dự án xây dựng và lắp đặt hệ thống thiết bị cho phân xưởng nước giặt, sữa bột, ngũ cốc và mỹ phẩm — đi trọn từ bản vẽ AutoCAD, chọn công nghệ và thiết bị, lập báo giá và tính chi phí đầu tư, cho tới chạy thử rồi bàn giao vận hành. Kèm theo đó là tìm nguồn nguyên liệu thô và tư vấn công nghệ cho từng dây chuyền.",
   "the": "Bản vẽ AutoCAD|Chọn thiết bị & công nghệ|Tính chi phí dự án|Chạy thử & bàn giao"
  },
  {
   "id": "luutru",
   "icon": "🗄️",
   "tieuDe": "Hệ thống lưu trữ & truy xuất hồ sơ",
   "tenNgan": "Lưu trữ hồ sơ",
   "moTa": "Thiết kế cách lưu cho cả hai dạng: hồ sơ bản cứng theo yêu cầu GMP — có quy tắc đánh mã, vị trí và thời hạn lưu — và hồ sơ bản mềm với cây thư mục, quy tắc đặt tên, công cụ tra cứu. Thước đo tôi đặt ra rất đơn giản: bất kỳ ai cũng phải lấy được đúng hồ sơ trong vài phút, kể cả khi người lập hồ sơ đó đã nghỉ việc.",
   "the": "Hồ sơ GMP|Bản cứng & bản mềm|Quy tắc đặt tên|Truy xuất trong vài phút"
  },
  {
   "id": "kpi",
   "icon": "📊",
   "tieuDe": "Công cụ KPI, tính lương & hành chính",
   "tenNgan": "KPI & hành chính",
   "moTa": "Thiết kế bộ chỉ số KPI cho từng phòng ban rồi biến nó thành công cụ chạy được: khai định mức, chấm điểm theo kỳ, tự xếp hạng và xuất báo cáo. Cùng nhóm này là các ứng dụng hành chính — tính lương, tính hệ số khoán theo sản lượng, đăng ký nghỉ phép, tổng hợp công và báo cáo định kỳ tự phát sinh. Phần khó không nằm ở phép tính mà ở chỗ đặt chỉ số sao cho người bị đo thấy công bằng: đo sai một chỉ số là cả phòng xoay theo hướng sai.",
   "the": "Bộ chỉ số KPI theo phòng ban|Tính lương & hệ số khoán|Đăng ký nghỉ · tổng hợp công|Báo cáo định kỳ tự phát sinh"
  },
  {
   "id": "congnghe",
   "icon": "💻",
   "tieuDe": "Công nghệ & AI ứng dụng vào vận hành",
   "tenNgan": "Công nghệ & AI",
   "moTa": "Quy trình hoá công việc trên Google Sheets và lập trình Apps Script để tự động tính giá trị dinh dưỡng, RNI, KPI và dựng hồ sơ PIF cho mỹ phẩm; tham gia triển khai phần mềm quản trị cho nhà máy. Hiện dùng Claude, NotebookLM và Antigravity như bộ công cụ chính để thiết kế, viết và kiểm thử ứng dụng — cách làm này rút thời gian ra được một công cụ dùng thật từ hàng tháng xuống còn vài ngày.",
   "the": "Google Sheets|Apps Script|Claude · NotebookLM · Antigravity|Triển khai app"
  }
 ],
 "nangLuc": [
  {
   "ten": "Thiết kế & tối ưu công thức",
   "nhom": "R&D",
   "muc": 95
  },
  {
   "ten": "Hồ sơ công bố · nhãn · PIF",
   "nhom": "R&D",
   "muc": 90
  },
  {
   "ten": "Hệ thống chất lượng GMP / ISO",
   "nhom": "R&D",
   "muc": 88
  },
  {
   "ten": "Google Sheets & Excel nâng cao",
   "nhom": "Tự động hoá",
   "muc": 95
  },
  {
   "ten": "Google Apps Script",
   "nhom": "Tự động hoá",
   "muc": 90
  },
  {
   "ten": "Xây dựng ứng dụng desktop (HTML → EXE)",
   "nhom": "Tự động hoá",
   "muc": 88
  },
  {
   "ten": "Bản vẽ kỹ thuật (AutoCAD · Visio)",
   "nhom": "Kỹ thuật",
   "muc": 88
  },
  {
   "ten": "Ứng dụng AI vào công việc hằng ngày",
   "nhom": "Kỹ thuật",
   "muc": 85
  }
 ],
 "ungDung": [
  {
   "id": "auto-rd",
   "ten": "Auto RD",
   "phienBan": "V12.1",
   "nhom": "nghiencuu",
   "icon": "🧬",
   "iconAnh": "images/icon/auto-rd.png",
   "phuDe": "Từ ý tưởng công thức tới bộ hồ sơ nộp",
   "anh": "images/bia/auto-rd.webp",
   "poster": "images/poster/auto-rd-1.webp|images/poster/auto-rd-2.webp|images/poster/auto-rd-3.webp|images/poster/auto-rd-4.webp",
   "tomTat": "Phần mềm R&D cho thực phẩm, mỹ phẩm và hoá mỹ phẩm, gói trong 14 phân hệ nối liền nhau. Một công thức khai đúng một lần rồi tự chảy qua tính dinh dưỡng, tính giá, soi pháp lý, quy trình sản xuất và hồ sơ công bố — không phải gõ lại ở bất kỳ bước nào. Từ bản V12 có thêm phần làm việc nhóm: cả phòng ban dùng chung một kho, mỗi người một tài khoản và một vai trò, công thức phải qua duyệt mới thành bản chính thức. Chạy hoàn toàn offline trên máy người dùng. Bản V12.1 sao lưu gom đủ toàn bộ dữ liệu, cài đè lên bản cũ không mất gì.",
   "diemChinh": "Làm việc nhóm theo phòng ban: bốn vai trò, tài khoản do quản trị cấp và khoá|Kho chung cho cả phòng, công thức phải qua duyệt mới được công bố|Tự sinh hồ sơ nghiên cứu, hồ sơ lô GMP và bộ PIF nén ZIP|Tính dinh dưỡng %RNI · Kcal theo 5 chuẩn, cảnh báo ngưỡng UL|Soi pháp lý Codex CXS 192-1995 · Annex EC 1223/2009, báo đỏ chất cấm|Tự gửi mail kiểm nghiệm độ ổn định theo mốc M1–M36, tự chấm Đạt/FAIL",
   "trangThai": "Đã triển khai",
   "mauNhan": "xanh",
   "linkTai": "https://drive.google.com/drive/folders/1dqSODPQ6yYR_gPJxmkErJuamsOYH9NhQ",
   "chuThichTai": "RAR · 92,9 MB · bản dùng thử V11.1",
   "linkVideo": "",
   "linkMo": "https://rdnewlab-rd.web.app"
  },
  {
   "id": "auto-hcns",
   "ten": "Auto HCNS",
   "phienBan": "V5",
   "nhom": "vanphong",
   "icon": "👥",
   "iconAnh": "images/icon/auto-hcns.png",
   "phuDe": "Chấm công · đơn từ · KPI · lương — trên điện thoại và máy tính",
   "anh": "images/bia/auto-hcns.webp",
   "poster": "images/poster/auto-hcns-1.webp|images/poster/auto-hcns-2.webp|images/poster/auto-hcns-3.webp|images/poster/auto-hcns-4.webp",
   "tomTat": "Gom toàn bộ việc của phòng hành chính nhân sự vào một phần mềm: chấm công bằng điện thoại có định vị và ảnh chụp, đơn từ ký duyệt trực tuyến, giao việc chấm KPI, cuối tháng bấm một nút ra bảng lương đủ bảo hiểm, thuế thu nhập cá nhân, tăng ca và thưởng KPI. **Cài thẳng lên màn hình chính điện thoại như một app, đồng thời chạy trên máy tính** — hai nơi dùng chung một dữ liệu, lưu trên Google Sheet của chính công ty. 26 màn hình, 6 cấp phân quyền, chạy tốt tới 500 nhân sự.",
   "diemChinh": "Chấm công bằng điện thoại có định vị và ảnh chụp|Bảng lương một nút: lương theo công · tăng ca · thưởng KPI · trừ bảo hiểm · thuế TNCN đủ 7 bậc|6 cách tính lương: thời gian · sản phẩm · doanh số · theo giờ · NET · tự viết công thức|KPI không chấm cảm tính: hoàn thành 50% + đúng hạn 20% + chất lượng 30%|6 loại đơn từ ký duyệt ngay trên máy: phép năm · trễ, về sớm · ốm BHXH · nghỉ bù…|Mỗi người chỉ thấy phần của mình — nhân viên chỉ tải đúng dữ liệu của mình",
   "trangThai": "Đang triển khai",
   "mauNhan": "cam",
   "linkTai": "https://drive.google.com/drive/folders/1kIb8-yxbrWadmIDRejUkYeneD6ek7Dvz",
   "chuThichTai": "Bản dùng thử 7 ngày",
   "linkVideo": "",
   "linkMo": "https://rdnewlab-hcns-thu.web.app"
  },
  {
   "id": "auto-kd",
   "ten": "Auto KD",
   "phienBan": "V2",
   "nhom": "kinhdoanh",
   "icon": "🤝",
   "iconAnh": "images/icon/auto-kd.png",
   "phuDe": "Từ báo giá đến tiền về — cả đường bán hàng gia công OEM/ODM",
   "anh": "images/bia/auto-kd.webp",
   "poster": "images/poster/auto-kd-1.webp|images/poster/auto-kd-2.webp|images/poster/auto-kd-3.webp",
   "tomTat": "Phần mềm quản trị kinh doanh cho nhà máy gia công thực phẩm bảo vệ sức khoẻ, mỹ phẩm, hoá mỹ phẩm (OEM/ODM). Một app đi trọn đường bán hàng: khách hàng → báo giá → mẫu thử → đơn hàng 8 khâu → công nợ. Mỗi đơn hàng có **hồ sơ riêng 8 tab** — hợp đồng, cảnh báo, thanh toán, hoá đơn VAT, giao hàng, tài liệu, nhật ký; công thức có bước **chọn bao bì 3 cấp** và app tự cộng tiền bao bì vào giá. Kèm **Cổng khách hàng** để khách tự xem tiến độ đơn, nhận báo giá và tự thử xây công thức. Dữ liệu nằm trên Google Sheet riêng của chính nhà máy. Bản mới thêm **thiết kế bao bì 3D xoay tay** (lọ, chai, tuýp, hũ, hộp, thùng — chọn màu thân, nắp, kiểu nhãn) để chốt maket với khách ngay trên màn hình, và phát app cho cả phòng qua một đường link web.",
   "diemChinh": "Báo giá bậc thang theo 4 mốc MOQ: 3.000 · 5.000 · 10.000 · 20.000, VAT 0–10%|Đơn hàng chạy 8 khâu: tạm ứng → maket → vật tư → sản xuất → QC & COA → nhập kho → giao|Cổng khách hàng 7 thẻ: khách tự xem tiến độ, báo giá, công nợ, chấm điểm mẫu|Bao bì 3 cấp + 3 mức giá tự cộng vào giá thành — khách chỉ thấy khoảng giá|Khách của ai người nấy giữ: bảo vệ 45 ngày, cảnh báo trùng khi nhập|Phân quyền 13 menu × 6 thao tác, 4 quy trình duyệt chạy thật|Thiết kế bao bì 3D xoay tay, đổi màu thân · nắp · nhãn, lưu ảnh PNG gửi khách",
   "trangThai": "Đang triển khai",
   "mauNhan": "cam",
   "linkTai": "https://drive.google.com/drive/folders/1HMyRBYeLSTl17dW3HOm5IK6AHPy9p4FX",
   "chuThichTai": "Miễn phí 7 ngày · dùng thử 30 ngày",
   "linkVideo": "",
   "linkMo": "https://rdnewlab-kd.web.app"
  },
  {
   "id": "auto-khvt",
   "ten": "Auto KHVT",
   "phienBan": "V8",
   "nhom": "sanxuat",
   "icon": "📦",
   "iconAnh": "images/icon/auto-khvt.png",
   "phuDe": "Dự trù vật tư, kho theo lô & lịch chạy xưởng",
   "anh": "images/bia/auto-khvt.webp",
   "poster": "images/poster/auto-khvt-1.webp|images/poster/auto-khvt-2.webp|images/poster/auto-khvt-3.webp|images/poster/auto-khvt-4.webp",
   "tomTat": "Quản trị kế hoạch vật tư cho nhà máy, gói trong 14 mục menu với hơn 260 màn hình và tab. Nhận thẳng định mức BOM từ Auto RD rồi tính ra đúng lượng nguyên vật liệu còn thiếu phải mua cho từng đơn hàng; quản tồn theo lô nội bộ kèm sơ đồ vị trí kho; chặn xuất lô chưa đạt kiểm nghiệm; và xếp lịch sản xuất theo tuyến công đoạn thật của từng dạng bào chế. **Chạy hoàn toàn ngoại tuyến** — công thức và giá thành không rời khỏi máy của nhà máy.",
   "diemChinh": "Dự trù nguyên vật liệu: lấy định mức từ Auto RD, trừ tồn theo lô, ra lượng còn thiếu|Kế hoạch sản xuất theo tuyến công đoạn và số chỗ chạy song song của từng phòng|Biểu đồ Gantt: xếp lịch tự động hoặc kéo tay, đơn sắp tới hạn giao tự lên đầu|Sơ đồ kho kéo – thả: gõ một mã lô ra vị trí · hạn dùng · lịch sử nhập xuất|Xuất kho FEFO, chặn lô quá hạn và lô chưa đạt kiểm nghiệm|Tính giá tới từng công đoạn: giờ công · ca máy · khấu hao, bậc giá theo cỡ lô",
   "trangThai": "Đang triển khai",
   "mauNhan": "cam",
   "linkTai": "https://drive.google.com/drive/folders/1nmbkTnAkyUJDiVqyNB4AolPO15sehTBH",
   "chuThichTai": "Bản dùng thử 7 ngày",
   "linkVideo": "",
   "linkMo": "https://rdnewlab-khvt.web.app"
  },
  {
   "id": "auto-sx",
   "ten": "Auto SX",
   "phienBan": "V3",
   "nhom": "sanxuat",
   "icon": "🏭",
   "iconAnh": "images/icon/auto-sx.png",
   "phuDe": "Điều hành xưởng — lệnh sản xuất, hồ sơ lô, máy móc, kho",
   "anh": "images/bia/auto-sx.webp",
   "poster": "images/poster/auto-sx-1.webp|images/poster/auto-sx-2.webp|images/poster/auto-sx-3.webp|images/poster/auto-sx-4.webp",
   "tomTat": "Phần mềm điều hành sản xuất (MES) cho nhà máy GMP, gói trong 7 phân hệ với 20 màn nghiệp vụ: từ đơn hàng → kế hoạch → lệnh sản xuất → hồ sơ lô điện tử, kèm máy móc, kho và nhân sự xưởng. **Chạy ngoại tuyến ngay trên máy tính**, dữ liệu sản xuất nằm tại nhà máy. Khoảng 46 danh sách lựa chọn tự thêm, sửa, đổi tên ngay trong app — không cần lập trình viên. Bản 3.0.48 thêm **thông số – tiêu chuẩn vật tư theo từng máy**: phiếu TS-TC có ảnh, in A4, gõ số đo thực tế là app báo ngay Đạt hay Ngoài ngưỡng; lệnh sản xuất tự hiện thông số chuẩn của máy được chọn.",
   "diemChinh": "Hồ sơ lô điện tử (EBR) truy từ nguyên liệu tới thành phẩm|Tự nhắc hạn hiệu chuẩn, bảo trì, vệ sinh — đếm việc quá hạn ngay màn đầu|Tồn theo từng kho, cảnh báo tồn thấp và hạn dùng, xuất lô hạn gần trước (FEFO)|Xuất Excel số là số thật — gõ =SUM() ra đúng tổng|Chạy offline, không cần máy chủ, không cần thuê cloud|Tiếng Việt toàn bộ, theo đúng dòng chảy xưởng Việt Nam|Thông số – tiêu chuẩn vật tư theo từng máy, số đo thực tế tự báo Đạt / Ngoài ngưỡng",
   "trangThai": "Đang triển khai",
   "mauNhan": "cam",
   "linkTai": "https://drive.google.com/drive/folders/1Ockdn3ls4A9hjFDf2R3vZARbSZy8Fh6S",
   "chuThichTai": "Có key dùng thử",
   "linkVideo": "",
   "linkMo": "https://rdnewlab-sx.web.app"
  },
  {
   "id": "auto-qaqc",
   "ten": "Auto QA-QC",
   "phienBan": "V5.0",
   "nhom": "sanxuat",
   "icon": "🔬",
   "iconAnh": "images/icon/auto-qaqc.png",
   "phuDe": "Trung tâm chất lượng — eQMS & LIMS",
   "anh": "images/bia/auto-qaqc.webp",
   "poster": "images/poster/auto-qaqc-1.webp|images/poster/auto-qaqc-2.webp|images/poster/auto-qaqc-3.webp|images/poster/auto-qaqc-4.webp",
   "tomTat": "Bộ lớn nhất trong cả hệ: 29 phân hệ chia thành năm khối — báo cáo tổng quan, phòng kiểm nghiệm, kiểm tra sản xuất, quản lý tuân thủ và danh mục nền. Chạy từ lúc nguyên liệu vào cổng cho tới lúc ký nhả lô thành phẩm. Một chỉ tiêu không đạt sẽ tự mở hồ sơ điều tra; mọi thao tác ghi vào nhật ký kiểm toán không có chức năng xoá.",
   "diemChinh": "Chuỗi kiểm nghiệm khép kín IQC → IPQC → OQC theo lệnh sản xuất|Khoá cứng lô chờ kiểm: chưa duyệt là không cho xuất kho|Phiếu kiểm nghiệm tự đối chiếu tiêu chuẩn, tự chấm Đạt/Không đạt, in COA khổ A4|Chỉ tiêu FAIL tự mở hồ sơ OOS, đóng hết CAPA mới khép sự cố|Theo dõi độ ổn định, chất chuẩn, hoá chất, thiết bị và lịch hiệu chuẩn|Diễn tập thu hồi khẩn cấp, tra ngược cả chuỗi lô dưới một giây",
   "trangThai": "Đang triển khai",
   "mauNhan": "cam",
   "linkTai": "https://drive.google.com/drive/folders/1mUJuhlKWryrubAkn7Hm8VOBIL443F7Nk",
   "chuThichTai": "Bản dùng thử 7 ngày",
   "linkVideo": "",
   "linkMo": "https://rdnewlab-qaqc.web.app"
  },
  {
   "id": "autofile",
   "ten": "Autofile",
   "phienBan": "V24",
   "nhom": "morong",
   "icon": "🗂️",
   "iconAnh": "images/icon/autofile.png",
   "phuDe": "Chuẩn hoá, tìm kiếm & trích xuất hồ sơ",
   "anh": "images/bia/autofile.webp",
   "poster": "images/poster/autofile-1.webp|images/poster/autofile-2.webp|images/poster/autofile-3.webp|images/poster/autofile-4.webp",
   "tomTat": "Một file EXE chạy thẳng, không cần cài đặt, gồm 10 phân hệ. Bạn tự định nghĩa biến trong ngoặc nhọn rồi dùng chung bộ biến đó cho cả tên file lẫn đường dẫn lưu — điền một lần, phần mềm sinh tên chuẩn và tự tạo đúng cây thư mục. Bản V23 thêm trích xuất trọn bộ chứng từ theo tệp lệnh và xưởng PDF nối – tách – tạo trang; bản V24 thêm **dịch tài liệu sang tiếng Việt** ngay lúc chuyển đổi file, giữ nguyên bảng và khối mã. Toàn bộ xử lý chạy tại chỗ, tài liệu không rời khỏi máy.",
   "diemChinh": "Trích xuất trọn bộ chứng từ theo tệp lệnh · phiếu xuất kho|Xưởng PDF: nối, tách, tạo trang bìa, in hàng loạt đúng thứ tự|Tự tạo danh mục file ra Excel kèm link mở nhanh từng file|Biến tự đặt dùng chung cho tên file và cây thư mục|Dịch tài liệu sang tiếng Việt khi chuyển đổi file — giữ nguyên bảng",
   "trangThai": "Đã triển khai",
   "mauNhan": "tim",
   "linkTai": "https://drive.google.com/drive/folders/1Gj7eezfIqBvblLxRRlp8mw-QQxxXjTOg",
   "chuThichTai": "RAR · 1,2 MB · dùng thử 7 ngày",
   "linkVideo": "",
   "linkMo": ""
  },
  {
   "id": "auto-box",
   "ten": "Auto Box Plus",
   "phienBan": "V16.0",
   "nhom": "morong",
   "icon": "🚚",
   "iconAnh": "images/icon/auto-box.png",
   "phuDe": "Xếp hộp, xếp thùng, xếp cả đội xe",
   "anh": "images/bia/auto-box.webp",
   "poster": "images/poster/auto-box-1.webp|images/poster/auto-box-2.webp|images/poster/auto-box-3.webp|images/poster/auto-box-4.webp",
   "tomTat": "Bài toán đóng gói và điều xe giải bằng thuật toán xếp khối 3D, chia thành 7 mô-đun đi từ hộp sản phẩm lên tới cả đội xe. Kết quả không dừng ở con số mà là mô hình 3D xoay được, bóc xem từng lớp, kèm danh mục lịch sử tính toán và phiếu bốc xếp A4 có mã QR đưa thẳng cho công nhân kho. Đây là công cụ hỗ trợ dùng riêng được, không cần cài chung với hệ nào.",
   "diemChinh": "Xếp tối đa hộp – thùng – container, tự xoay đứng · nằm · ngang|Danh mục lịch sử: nạp lại phương án 3D cũ bằng một cú bấm|Phiếu bốc xếp A4 có mã QR và sơ đồ 3D từng lớp|Cảnh báo quá tải trọng và thể tích an toàn từng chuyến xe",
   "trangThai": "Đã triển khai",
   "mauNhan": "tim",
   "linkTai": "https://drive.google.com/drive/folders/1xMwXGKUCwXxYlJ6Ojf6_Lq71S8eVg3DJ",
   "chuThichTai": "RAR · 73 MB · dùng thử 7 ngày",
   "linkVideo": "",
   "linkMo": "https://rdnewlab-box.web.app"
  },
  {
   "id": "auto-fixcard",
   "ten": "Auto Fix Card",
   "phienBan": "V3.0",
   "nhom": "morong",
   "icon": "💾",
   "iconAnh": "images/icon/auto-fixcard.png",
   "phuDe": "Chẩn đoán & cứu thẻ nhớ · USB — có đường lùi ở mọi bước",
   "anh": "images/bia/auto-fixcard.webp",
   "poster": "images/poster/auto-fixcard-1.webp|images/poster/auto-fixcard-2.webp|images/poster/auto-fixcard-3.webp",
   "tomTat": "Thẻ nhớ hỏng? **Đừng format vội.** Phần lớn thẻ mà Windows đòi format chỉ hỏng *mục lục* — dữ liệu thật vẫn còn nguyên bên trong. Auto Fix Card bấm một nút là chẩn đoán thẻ hỏng kiểu gì, cứu được hay không, rồi chữa theo đúng thứ tự từ nhẹ tới nặng qua 16 mức. 35 chức năng chia 4 bậc màu — nhìn màu là biết bấm có mất dữ liệu hay không, **trước khi bấm**. Bản chạy chỉ 763 KB, chép vào USB chạy thẳng, không cài thêm gì.",
   "diemChinh": "Chẩn đoán một nút — chỉ đúng việc cần làm tiếp theo|4 bậc màu: 🟢 soi · 🟡 cứu giữ dữ liệu · 🔴 dựng lại · ⛔ phục hồi sâu|7 mức chữa giữ nguyên dữ liệu, chép vùng cũ ra tệp trước khi ghi|Theo dõi kết nối 60 giây — bắt đúng ca thẻ lúc nhận lúc không|Thẻ hỏng chip thì nói thẳng: không cứu được, khỏi tốn công|13 bài hướng dẫn tiếng Việt viết sẵn ngay trong app",
   "trangThai": "Đang triển khai",
   "mauNhan": "cam",
   "linkTai": "https://drive.google.com/drive/folders/1xQZjqsdhbl6Nk6qQAeLgmTJe7lTNede6",
   "chuThichTai": "Dùng thử đầy đủ 7 ngày",
   "linkVideo": "",
   "linkMo": "https://rdnewlab-fixcard.web.app"
  },
  {
   "id": "auto-family",
   "ten": "Auto Family",
   "phienBan": "V3",
   "nhom": "morong",
   "icon": "🏡",
   "iconAnh": "images/icon/auto-family.png",
   "phuDe": "Việc nhà · thực đơn · đi chợ · thu chi — cả nhà chung một app",
   "anh": "images/bia/auto-family.webp",
   "poster": "images/poster/auto-family-1.webp|images/poster/auto-family-2.webp|images/poster/auto-family-3.webp|images/poster/auto-family-4.webp",
   "tomTat": "Ứng dụng quản lý gia đình gói trong 11 màn: việc nhà, giao việc, thực đơn, đi chợ, thu – chi, đề xuất & bỏ phiếu, lịch & ghi nhớ. Mỗi người trong nhà **một tài khoản, một mã PIN**, bố mẹ phân quyền tới từng màn — con chỉ thấy phần của con, không thấy tiền. Thực đơn nối sang đi chợ, đi chợ mua xong thành phiếu chi, việc nhà làm xong tự cộng sao đổi quà. **Trợ lý AI trả lời từ chính dữ liệu nhà mình.** Dữ liệu đồng bộ mọi máy qua Google Sheet của chính gia đình — ==không cần máy chủ==; chạy trên điện thoại như một app và cả bản Windows.",
   "diemChinh": "Mỗi người một mã PIN, phân quyền 13 vùng × Xem · Thêm-Sửa · Duyệt|Việc nhà một chạm: tự cộng sao, đổi quà, bảng vinh danh tuần|Thực đơn tuần → danh sách đi chợ → phiếu chi, so với hạn mức|Thu – chi nhiều ví, khoản định kỳ tự nhắc hạn|Trợ lý AI hỏi bằng lời, trả lời từ dữ liệu nhà mình, tôn trọng phân quyền|Gửi link cho cả nhà: chạm tên + nhập PIN là vào, đồng bộ 15 giây",
   "trangThai": "Đang triển khai",
   "mauNhan": "cam",
   "linkTai": "https://drive.google.com/drive/folders/1ko_Ur2GV_8pVi8RThwAaZgH0-zd12MNG",
   "chuThichTai": "Miễn phí 7 ngày · điện thoại + Windows",
   "linkVideo": "",
   "linkMo": "https://rdnewlab-family.web.app"
  }
 ],
 "taiLieu": [
  {
   "id": "pl-attp",
   "tieuDe": "Văn bản An toàn thực phẩm",
   "nhom": "phapluat",
   "dinhDang": "VB",
   "dungLuong": "thư mục",
   "moTa": "Nghị định, thông tư và hướng dẫn về điều kiện sản xuất, công bố và ghi nhãn thực phẩm.",
   "link": "https://drive.google.com/drive/folders/1vYagdiGQlMobSuPWeRce-E1PNYpitJVr",
   "ngayCapNhat": ""
  },
  {
   "id": "pl-mypham",
   "tieuDe": "Văn bản Mỹ phẩm",
   "nhom": "phapluat",
   "dinhDang": "VB",
   "dungLuong": "thư mục",
   "moTa": "Quy định quản lý mỹ phẩm, công bố sản phẩm, hồ sơ thông tin sản phẩm và CGMP ASEAN.",
   "link": "https://drive.google.com/drive/folders/1WW0sK4cFW_Zq5JQzmmIyvhy1JjGW4ZTW",
   "ngayCapNhat": ""
  },
  {
   "id": "pl-duoc",
   "tieuDe": "Văn bản Dược",
   "nhom": "phapluat",
   "dinhDang": "VB",
   "dungLuong": "thư mục",
   "moTa": "Luật Dược và các văn bản hướng dẫn về sản xuất, đăng ký và lưu hành thuốc.",
   "link": "https://drive.google.com/drive/folders/1YU-_MC-gP0tgNVr7dt902peL3MO9AZdF",
   "ngayCapNhat": ""
  },
  {
   "id": "pl-qcvn",
   "tieuDe": "Quy chuẩn kỹ thuật quốc gia (QCVN)",
   "nhom": "phapluat",
   "dinhDang": "VB",
   "dungLuong": "thư mục",
   "moTa": "Bộ QCVN áp dụng cho thực phẩm, phụ gia, giới hạn ô nhiễm và bao bì tiếp xúc.",
   "link": "https://drive.google.com/drive/folders/1Si3dTeGVFRMt_HabUrLlSdB29SSSsL8a",
   "ngayCapNhat": ""
  },
  {
   "id": "pl-tcvn",
   "tieuDe": "Tiêu chuẩn quốc gia (TCVN)",
   "nhom": "phapluat",
   "dinhDang": "VB",
   "dungLuong": "thư mục",
   "moTa": "Tiêu chuẩn Việt Nam dùng khi xây dựng tiêu chuẩn cơ sở và phương pháp thử.",
   "link": "https://drive.google.com/drive/folders/177LOCLCkM9tVWDaImhUEgLPUCCpDG2M5",
   "ngayCapNhat": ""
  },
  {
   "id": "pl-codex",
   "tieuDe": "Tiêu chuẩn CODEX",
   "nhom": "phapluat",
   "dinhDang": "VB",
   "dungLuong": "thư mục",
   "moTa": "Bộ tiêu chuẩn quốc tế CODEX, gồm danh mục phụ gia và mức sử dụng tối đa theo nhóm thực phẩm.",
   "link": "https://drive.google.com/drive/folders/1gNWyw2rZFHCxa3mP8rMK-5YBDz0sfnMJ",
   "ngayCapNhat": ""
  },
  {
   "id": "pl-iso",
   "tieuDe": "Bộ tiêu chuẩn ISO",
   "nhom": "phapluat",
   "dinhDang": "VB",
   "dungLuong": "thư mục",
   "moTa": "Tài liệu ISO phục vụ xây dựng và duy trì hệ thống quản lý chất lượng trong nhà máy.",
   "link": "https://drive.google.com/drive/folders/1l-0YxVbGL_F59Y5Qef-O5jaQcZCFtkJR",
   "ngayCapNhat": ""
  },
  {
   "id": "pl-hoachat",
   "tieuDe": "Luật Hoá chất và văn bản hướng dẫn",
   "nhom": "phapluat",
   "dinhDang": "VB",
   "dungLuong": "thư mục",
   "moTa": "Quy định về khai báo, bảo quản và sử dụng hoá chất trong sản xuất công nghiệp.",
   "link": "https://drive.google.com/drive/folders/1eDJWgsKE4nuD37IQfa-T_qeeEER_pvar",
   "ngayCapNhat": ""
  },
  {
   "id": "pl-moitruong",
   "tieuDe": "Văn bản Môi trường",
   "nhom": "phapluat",
   "dinhDang": "VB",
   "dungLuong": "thư mục",
   "moTa": "Quy định về xả thải, quản lý chất thải và hồ sơ môi trường của cơ sở sản xuất.",
   "link": "https://drive.google.com/drive/folders/1uJelTCwI8pmQlhquU9Dj0QQXDYvf2rli",
   "ngayCapNhat": ""
  },
  {
   "id": "app-rd",
   "tieuDe": "Auto RD — bản dùng thử (V11.1)",
   "nhom": "appdungthu",
   "dinhDang": "RAR",
   "dungLuong": "92,9 MB",
   "moTa": "Bản dùng thử đầy đủ tính năng, có sẵn dữ liệu mẫu để hình dung ngay. Chạy trên Windows 10 / 11, không cần Internet. Trong thư mục có kèm bộ poster sơ đồ tính năng và hướng dẫn cài đặt.",
   "link": "https://drive.google.com/drive/folders/1dqSODPQ6yYR_gPJxmkErJuamsOYH9NhQ",
   "ngayCapNhat": ""
  },
  {
   "id": "app-box",
   "tieuDe": "Auto Box Plus V16.0 — bản dùng thử",
   "nhom": "appdungthu",
   "dinhDang": "RAR",
   "dungLuong": "73 MB",
   "moTa": "Bản portable, giải nén là chạy, không cần cài đặt. Dùng thử 7 ngày đầy đủ tính năng xếp hộp – thùng – xe kèm mô phỏng 3D.",
   "link": "https://drive.google.com/drive/folders/1xMwXGKUCwXxYlJ6Ojf6_Lq71S8eVg3DJ",
   "ngayCapNhat": ""
  },
  {
   "id": "app-file",
   "tieuDe": "Autofile V23 — bản dùng thử",
   "nhom": "appdungthu",
   "dinhDang": "RAR",
   "dungLuong": "1,2 MB",
   "moTa": "Một file EXE duy nhất, không cần cài đặt. Dùng thử 7 ngày toàn bộ chức năng đặt tên, tìm kiếm và trích xuất hồ sơ.",
   "link": "https://drive.google.com/drive/folders/1Gj7eezfIqBvblLxRRlp8mw-QQxxXjTOg",
   "ngayCapNhat": ""
  },
  {
   "id": "nc-excipients",
   "tieuDe": "Handbook of Pharmaceutical Excipients (6th ed.)",
   "nhom": "nghiencuu",
   "dinhDang": "PDF",
   "dungLuong": "",
   "moTa": "Cẩm nang tra cứu tá dược: chức năng, mức dùng thông thường, tương kỵ và độ ổn định — tài liệu tôi mở nhiều nhất khi dựng công thức mới.",
   "link": "https://drive.google.com/file/d/1Zh0l8mP7nlXFFq2yWOHPUWmf_68DE9dy/view",
   "ngayCapNhat": ""
  },
  {
   "id": "nc-formulations",
   "tieuDe": "Handbook of Pharmaceutical Manufacturing Formulations — trọn bộ 6 tập",
   "nhom": "nghiencuu",
   "dinhDang": "PDF",
   "dungLuong": "6 tập",
   "moTa": "Công thức mẫu cho viên nén, thuốc bột, dạng lỏng, bán rắn, OTC và sản phẩm vô trùng. Dùng để tham chiếu khi bắt đầu một dạng bào chế chưa từng làm.",
   "link": "https://drive.google.com/drive/folders/1GdR9spFqVRZAA_s4iz_eoY1tHH12UXvr",
   "ngayCapNhat": ""
  },
  {
   "id": "nc-granulation",
   "tieuDe": "Handbook of Pharmaceutical Granulation Technology",
   "nhom": "nghiencuu",
   "dinhDang": "PDF",
   "dungLuong": "",
   "moTa": "Kỹ thuật tạo hạt: xát hạt ướt, tạo hạt khô, sấy tầng sôi và các yếu tố ảnh hưởng tới độ đồng đều hàm lượng.",
   "link": "https://drive.google.com/file/d/1eW6XFzGJrUZ5j4ygiR6C4mmlLRE15Cwl/view",
   "ngayCapNhat": ""
  },
  {
   "id": "nc-coating",
   "tieuDe": "Coating of Pharmaceutical Solid Dosage Forms",
   "nhom": "nghiencuu",
   "dinhDang": "PDF",
   "dungLuong": "3,1 MB",
   "moTa": "Kỹ thuật bao phim viên nén: lựa chọn polymer, thông số bao, và các lỗi bề mặt thường gặp cùng cách khắc phục.",
   "link": "https://drive.google.com/file/d/1L8SieN4pjcjNrvFCHVC53Z5YAsspHyfH/view",
   "ngayCapNhat": ""
  },
  {
   "id": "nc-stability",
   "tieuDe": "Handbook of Stability Testing in Pharmaceutical Development",
   "nhom": "nghiencuu",
   "dinhDang": "PDF",
   "dungLuong": "",
   "moTa": "Thiết kế nghiên cứu độ ổn định, chọn điều kiện bảo quản và diễn giải số liệu để xác định hạn dùng.",
   "link": "https://drive.google.com/file/d/16kR2i-U_BhetnZnpQ2plby4auv2IBir6/view",
   "ngayCapNhat": ""
  },
  {
   "id": "nc-stability-who",
   "tieuDe": "Stability testing of API and finished products (01/2017)",
   "nhom": "nghiencuu",
   "dinhDang": "PDF",
   "dungLuong": "",
   "moTa": "Hướng dẫn thử độ ổn định cho hoạt chất và thành phẩm — bản cập nhật tháng 01/2017, dùng khi xây dựng đề cương theo dõi.",
   "link": "https://drive.google.com/file/d/1cC0CsvJMVebfWNJDxaFQdTIwqQw9Pr7l/view",
   "ngayCapNhat": ""
  },
  {
   "id": "nc-skincare",
   "tieuDe": "Cosmetic Formulation of Skin Care Products",
   "nhom": "nghiencuu",
   "dinhDang": "PDF",
   "dungLuong": "4,3 MB",
   "moTa": "Nguyên lý xây dựng công thức skincare: hệ nhũ tương, chất làm mềm, hoạt chất và cảm quan sản phẩm.",
   "link": "https://drive.google.com/file/d/1DREPH3fWDjSDt-bRpPHOpBrxkQqGoLpG/view",
   "ngayCapNhat": ""
  },
  {
   "id": "nc-preservation",
   "tieuDe": "Cosmetics Preservation — A Review on Present Strategies",
   "nhom": "nghiencuu",
   "dinhDang": "PDF",
   "dungLuong": "",
   "moTa": "Tổng quan các hệ bảo quản mỹ phẩm hiện hành, phổ tác dụng và xu hướng thay thế paraben.",
   "link": "https://drive.google.com/file/d/1SylZbSZiRlpMkrlb5tMuPTvdj-O3QYaH/view",
   "ngayCapNhat": ""
  },
  {
   "id": "nc-microbio",
   "tieuDe": "Cosmetic Microbiology — A Practical Approach (2nd ed.)",
   "nhom": "nghiencuu",
   "dinhDang": "PDF",
   "dungLuong": "",
   "moTa": "Kiểm soát vi sinh trong sản xuất mỹ phẩm: nguồn nhiễm, phương pháp thử và thử thách hệ bảo quản.",
   "link": "https://drive.google.com/file/d/1V0Qddwl5CP1N4IN2cCVRmMoxkYS91toL/view",
   "ngayCapNhat": ""
  }
 ],
 "congDong": [
  {
   "id": "fb-nghiencuu",
   "nen": "facebook",
   "mau": "#8B5CF6",
   "ten": "Nghiên cứu phát triển TPCN, Mỹ phẩm, Dược phẩm GMP, Hoá phẩm gia dụng",
   "moTa": "Trao đổi công thức, quy trình và tiêu chuẩn giữa những người trực tiếp làm R&D.",
   "link": "https://www.facebook.com/groups/143844272053220/"
  },
  {
   "id": "fb-nguyenlieu",
   "nen": "facebook",
   "mau": "#10B981",
   "ten": "Nguyên liệu — Dược phẩm, Mỹ phẩm, TPCN",
   "moTa": "Hỏi đáp và giới thiệu nguồn nguyên liệu: hoạt chất, tá dược, phụ gia, bao bì.",
   "link": "https://www.facebook.com/share/g/197HdU24Xw/"
  },
  {
   "id": "fb-sanxuat",
   "nen": "facebook",
   "mau": "#F59E0B",
   "ten": "Sản xuất TPCN, Mỹ phẩm, Dược phẩm GMP",
   "moTa": "Chuyện nhà xưởng: thiết bị, cỡ lô, GMP và vận hành sản xuất hằng ngày.",
   "link": "https://www.facebook.com/share/g/1BxQStptdV/"
  },
  {
   "id": "fb-kinhdoanh",
   "nen": "facebook",
   "mau": "#EC4899",
   "ten": "Kinh doanh TPCN, Mỹ phẩm, Dược phẩm GMP",
   "moTa": "Thị trường, công bố, phân phối và câu chuyện bán hàng ngành hàng sức khoẻ.",
   "link": "https://www.facebook.com/share/g/1FBQtQGLkH/"
  },
  {
   "id": "zalo-nhom",
   "nen": "zalo",
   "mau": "#0068FF",
   "ten": "Nhóm Zalo trao đổi trực tiếp",
   "moTa": "Hỏi nhanh đáp nhanh với tôi và anh em trong ngành, ngay trên Zalo.",
   "link": "https://zalo.me/g/kntqdg821"
  }
 ],
 "nhomUngDung": [
  {
   "ma": "all",
   "ten": "Tất cả",
   "icon": "✨",
   "moTa": ""
  },
  {
   "ma": "nghiencuu",
   "ten": "Nghiên cứu R&D",
   "icon": "🧪",
   "moTa": "Từ ý tưởng công thức tới bộ hồ sơ công bố"
  },
  {
   "ma": "sanxuat",
   "ten": "Sản xuất",
   "icon": "🏭",
   "moTa": "Vật tư, lệnh sản xuất và kiểm nghiệm — chạy theo lô"
  },
  {
   "ma": "kinhdoanh",
   "ten": "Kinh doanh",
   "icon": "🤝",
   "moTa": "Khách hàng, báo giá, đơn hàng và công nợ"
  },
  {
   "ma": "vanphong",
   "ten": "Nhân sự",
   "icon": "👥",
   "moTa": "Chấm công, đơn từ, KPI và lương"
  },
  {
   "ma": "morong",
   "ten": "Hỗ trợ & mở rộng",
   "icon": "🧩",
   "moTa": "Công cụ đi kèm — xếp hàng, quản lý hồ sơ, cứu dữ liệu, quản lý gia đình"
  }
 ],
 "nhomTaiLieu": [
  {
   "ma": "all",
   "ten": "Tất cả danh mục",
   "icon": "",
   "moTa": ""
  },
  {
   "ma": "phapluat",
   "ten": "1. Văn bản pháp luật",
   "icon": "",
   "moTa": ""
  },
  {
   "ma": "appdungthu",
   "ten": "2. App dùng thử",
   "icon": "",
   "moTa": ""
  },
  {
   "ma": "nghiencuu",
   "ten": "3. Tài liệu nghiên cứu",
   "icon": "",
   "moTa": ""
  }
 ],
 "videos": {
  "kenh": "https://www.youtube.com/channel/UCe31TzXPFjDIBfJuA0-c8lQ",
  "ds": [
   {
    "id": "cfYAUo0JBXI",
    "ten": "Auto KHVT",
    "moTa": "",
    "ngay": "2026-09-21"
   },
   {
    "id": "X3NdqgG9w1o",
    "ten": "Auto HCNS V5 2",
    "moTa": "",
    "ngay": "2026-09-20"
   },
   {
    "id": "x4NLn_utyx8",
    "ten": "Auto HCNS V5",
    "moTa": "",
    "ngay": "2026-09-20"
   },
   {
    "id": "qatDchrlzYA",
    "ten": "Auto HCNS V2",
    "moTa": "",
    "ngay": "2026-09-01"
   },
   {
    "id": "kL_L1WnCcCw",
    "ten": "Nắm Vững Autofile V21",
    "moTa": "",
    "ngay": "2026-07-12"
   },
   {
    "id": "BSxlW0SSYdY",
    "ten": "Auto RDV8.1 Ban dung thử làm được gì",
    "moTa": "",
    "ngay": "2026-07-04"
   },
   {
    "id": "mtjd5n5przU",
    "ten": "Auto RD_Tính GT DD thế nào",
    "moTa": "",
    "ngay": "2026-06-26"
   },
   {
    "id": "E4F3GPJ3yww",
    "ten": "Auto R&D làm được gì",
    "moTa": "",
    "ngay": "2026-06-21"
   },
   {
    "id": "gb-8zBepnIw",
    "ten": "Auto RD - tinh nang tính GTDD và so sanh RNI",
    "moTa": "",
    "ngay": "2026-06-21"
   },
   {
    "id": "01BGY0EdLG4",
    "ten": "Auto R&D",
    "moTa": "",
    "ngay": "2026-06-21"
   },
   {
    "id": "KQn_SL-tDAA",
    "ten": "Auto Nutri an",
    "moTa": "",
    "ngay": "2026-06-07"
   },
   {
    "id": "obYdseLPLQ0",
    "ten": "Autofile V14",
    "moTa": "",
    "ngay": "2026-05-31"
   }
  ]
 },
 "baiViet": [
  {
   "maApp": "auto-rd",
   "thuTu": 1,
   "tieuDe": "Vấn đề gốc: một công thức bị chép lại quá nhiều lần",
   "noiDung": "Một công thức đi từ bàn thí nghiệm ra tới hồ sơ nộp phải qua rất nhiều lần chép: chép sang bảng tính giá, chép sang bảng dinh dưỡng, chép sang quy trình sản xuất, chép sang tiêu chuẩn cơ sở, rồi chép sang hồ sơ công bố. Mỗi lần chép là một cơ hội sai. Tôi từng mất cả buổi để tìm ra vì sao bảng giá và bảng định mức lệch nhau — hoá ra một nguyên liệu đã đổi tỷ lệ ở file này mà chưa đổi ở file kia. Auto RD sinh ra để cắt đứt vòng chép tay đó."
  },
  {
   "maApp": "auto-khvt",
   "thuTu": 1,
   "tieuDe": "Bài toán: vật tư sống trong một chùm file Excel",
   "noiDung": "Ở phần lớn nhà máy vừa và nhỏ, kế hoạch vật tư nằm rải trong một chùm file: một file đơn hàng, một file dự trù, một file theo dõi mua, một file tồn kho, thêm vài file riêng của từng người. Chúng đúng ở thời điểm lập và bắt đầu lệch nhau từ hôm sau. Hậu quả quen thuộc là mua thừa thứ đang tồn, thiếu đúng thứ cần cho lô tuần này, và một tủ nguyên liệu hết hạn không ai kịp phát hiện."
  },
  {
   "maApp": "auto-qaqc",
   "thuTu": 1,
   "tieuDe": "Chất lượng không nằm ở tờ giấy cuối cùng",
   "noiDung": "Hệ thống chất lượng trên giấy thường trông rất đầy đủ, nhưng khi cần tra ngược một lô có vấn đề thì mọi thứ chậm lại: phiếu kiểm nghiệm ở một tủ, hồ sơ lô ở tủ khác, biên bản xử lý sự cố nằm trong máy của ai đó đã nghỉ. Auto QA-QC gộp cả chuỗi thành một nền tảng 19 phân hệ, chạy liền từ kiểm nguyên liệu đầu vào, kiểm trên dòng sản xuất, kiểm thành phẩm, cho tới lúc ký số nhả lô ra thị trường."
  },
  {
   "maApp": "auto-box",
   "thuTu": 1,
   "tieuDe": "Một bài toán tưởng nhỏ mà tốn tiền thật",
   "noiDung": "Chọn sai kích thước thùng carton là khoản lãng phí âm thầm nhất trong khâu đóng gói: thùng rộng hơn cần thiết vài centimet thì tốn giấy, tốn chèn lót, tốn thể tích xe và tốn cả diện tích kho. Nhân với vài chục nghìn thùng một năm, con số không còn nhỏ. Ở phía vận chuyển cũng vậy — mỗi phần trăm thể tích container bỏ trống là tiền cước trả cho không khí. Trước đây việc này chủ yếu dựa vào kinh nghiệm và thử bằng tay, mỗi lần ra sản phẩm mới lại thử lại từ đầu."
  },
  {
   "maApp": "autofile",
   "thuTu": 1,
   "tieuDe": "Hồ sơ nhiều tới mức tìm lại còn lâu hơn làm mới",
   "noiDung": "Một nhà máy có hệ thống chất lượng chạy đủ sẽ sinh ra lượng hồ sơ khổng lồ: phiếu kiểm nghiệm, hồ sơ lô, COA, hợp đồng, bản công bố, tiêu chuẩn cơ sở. Vấn đề hiếm khi là chỗ lưu — vấn đề là mỗi người đặt tên một kiểu và cất một nơi. Đến lúc thanh tra hỏi một hồ sơ cụ thể thì cả phòng cùng đi tìm. Autofile dẹp phần hỗn loạn đó ngay từ lúc tài liệu được đưa vào, thay vì đi dọn khi đã muộn."
  },
  {
   "maApp": "auto-sx",
   "thuTu": 1,
   "tieuDe": "Mắt xích còn thiếu giữa kế hoạch và nhà xưởng",
   "noiDung": "Auto KHVT trả lời câu hỏi \"cần mua gì, còn tồn gì\", nhưng chưa trả lời \"khi nào tổ nào chạy cái gì\". Đó là khoảng trống Auto SX lấp vào: nhận lệnh sản xuất và xếp thành lịch chạy cụ thể cho từng tổ — pha chế, định liều, dập viên, đóng gói — dựa trên công suất máy và nhân sự đang có."
  },
  {
   "maApp": "auto-hcns",
   "thuTu": 1,
   "tieuDe": "Phòng hành chính bị hỏi lại quá nhiều lần",
   "noiDung": "Phần lớn thời gian của phòng hành chính nhân sự không tiêu vào việc khó, mà tiêu vào việc lặp: tháng này tôi còn mấy ngày phép, phiếu lương của tôi đâu, đơn xin nghỉ đã ai duyệt chưa, bảng chấm công có tính thiếu ca đêm không. Mỗi câu hỏi đều nhỏ, nhưng nhân với hàng trăm người thì thành một công việc toàn thời gian. Auto HCNS sinh ra để trả những câu hỏi đó bằng chính màn hình của người hỏi."
  },
  {
   "maApp": "auto-kd",
   "thuTu": 1,
   "tieuDe": "Vấn đề gốc: đường bán hàng nằm rải rác khắp nơi",
   "noiDung": "Ở một nhà máy gia công, thông tin của một khách nằm ở năm chỗ: danh bạ trong điện thoại của Sales, báo giá trong một file Excel, mẫu thử ở phòng R&D, đơn hàng ở kế hoạch, còn tiền thì ở kế toán. Giám đốc muốn biết đơn nào sắp trễ, khách nào đang nợ bao nhiêu thì phải gọi hỏi từng người. Auto KD gom cả đường đó vào một app: khách hàng → báo giá → mẫu thử → đơn hàng 8 khâu → công nợ. Mở máy là thấy doanh số, tiền đã thu, công nợ và đơn đang nằm ở khâu nào."
  },
  {
   "maApp": "auto-fixcard",
   "thuTu": 1,
   "tieuDe": "Đừng bấm Format",
   "noiDung": "Cắm thẻ nhớ vào máy, Windows hiện một hộp thoại: \"Bạn cần format ổ E: trước khi dùng\" — và chỉ có đúng một nút để bấm. Người dùng bấm, rồi mất sạch ảnh cưới, video, dữ liệu camera. Sự thật là phần lớn những chiếc thẻ ấy **không hỏng dữ liệu**, chỉ hỏng *mục lục* — cái bảng nhỏ ở đầu thẻ ghi tệp nào nằm ở ô nhớ nào. Format nghĩa là viết một mục lục mới, rỗng. Dữ liệu cũ vẫn còn đó nhưng không ai tìm lại được nữa. Mất dữ liệu xảy ra do cái bấm chuột, chứ không phải do thẻ hỏng."
  },
  {
   "maApp": "auto-family",
   "thuTu": 1,
   "tieuDe": "Vì sao một gia đình cũng cần một phần mềm",
   "noiDung": "Việc trong nhà không ít hơn việc ở xưởng: ai nấu bữa nào, tuần này mua gì, tháng này chi bao nhiêu, con đã làm bài chưa, lịch tiêm của bé ra sao. Phần lớn gia đình giữ những thứ đó trong đầu người mẹ, vài nhóm Zalo và một cuốn sổ. Auto Family gom tất cả về một chỗ, và quan trọng hơn: **mỗi người trong nhà cùng nhìn một bức tranh** — không ai phải hỏi lại \"hôm nay nhà mình cần làm gì\"."
  },
  {
   "maApp": "auto-rd",
   "thuTu": 2,
   "tieuDe": "Mười bốn phân hệ, một dòng số liệu duy nhất",
   "noiDung": "Nguyên tắc thiết kế xuyên suốt: mỗi số chỉ được nhập đúng một lần, tại đúng nơi nó phát sinh. Công thức khai ở phân hệ Nghiên cứu sẽ tự chảy sang Tính giá, sang Dinh dưỡng – RNI, sang Quy trình sản xuất và hồ sơ lô GMP, sang Soi pháp lý, sang hồ sơ công bố và PIF. Đổi một nguyên liệu ở gốc thì mười bốn phân hệ cùng cập nhật. Câu hỏi quen thuộc nhất của phòng R&D — \"bản nào mới nhất\" — gần như biến mất, vì chỉ còn đúng một bản."
  },
  {
   "maApp": "auto-khvt",
   "thuTu": 2,
   "tieuDe": "Đơn hàng là chứng từ gốc",
   "noiDung": "Auto KHVT chọn một điểm neo duy nhất: đơn hàng. Từ đơn hàng bung ra dự trù nguyên vật liệu và bao bì dựa trên định mức BOM nhận thẳng từ Auto RD, đã cộng sẵn tỷ lệ hao hụt và quy theo đúng cỡ lô sắp chạy; từ dự trù so với tồn thực tế ra đơn đề nghị mua; rồi nhập kho, lệnh sản xuất, nhập thành phẩm, xuất giao hàng. Bảy bước là một dòng chảy có thứ tự, và bất kỳ chứng từ nào cũng truy ngược được về đúng đơn hàng sinh ra nó."
  },
  {
   "maApp": "auto-qaqc",
   "thuTu": 2,
   "tieuDe": "Máy so tiêu chuẩn thay cho mắt người",
   "noiDung": "Kiểm nghiệm viên chỉ nhập số đo; việc đối chiếu với tiêu chuẩn và kết luận đạt hay không do hệ thống làm, dựa trên bộ chỉ tiêu đồng bộ thẳng từ Auto RD nên luôn là phiên bản mới nhất. Nghe đơn giản, nhưng đây là chỗ loại được một nhóm sai sót rất khó phát hiện: đọc nhầm cột tiêu chuẩn, dùng nhầm bản tiêu chuẩn cũ, hoặc kết quả nằm sát ngưỡng mà người đọc vô thức cho qua. Loại sai sót này không ai cố ý, và cũng không cách nào bắt được bằng cách nhắc nhau cẩn thận."
  },
  {
   "maApp": "auto-box",
   "thuTu": 2,
   "tieuDe": "Ba tầng bài toán: hộp → thùng → xe",
   "noiDung": "Auto Box giải liên tiếp ba tầng. Tầng một: xếp tối đa số hộp sản phẩm vào một thùng carton, tự thử các phương án xoay đứng, nằm và ngang; hoặc làm ngược lại — cho trước số hộp cần đóng rồi đề xuất ba kích thước thùng vừa khít nhất, đây là chỗ tiết kiệm tiền vỏ thùng rõ nhất. Tầng hai: xếp các thùng đó vào container 20ft, 40ft, 40HC hoặc xe tải, tính ngay thể tích an toàn và tổng tải trọng, vượt ngưỡng là cảnh báo đỏ. Tầng ba: chia cả lô hàng nhiều chủng loại lên đội xe, giới hạn được số loại xe huy động và phân bổ sao cho trọng tâm cân bằng."
  },
  {
   "maApp": "autofile",
   "thuTu": 2,
   "tieuDe": "Biến do người dùng tự đặt — chỗ tôi tâm đắc nhất",
   "noiDung": "Thay vì áp một quy tắc đặt tên cứng, Autofile cho người dùng tự định nghĩa biến trong ngoặc nhọn, đặt tên gì cũng được. Điểm mấu chốt: cùng một bộ biến dùng đồng thời cho cú pháp tên file và cho cấu trúc đường dẫn lưu. Khai {MaSP}_{Lo}_{Ngay} thì được tên chuẩn; khai đường dẫn có {MaSP} thì tài liệu tự vào đúng thư mục của mã sản phẩm đó, thư mục chưa có thì tự tạo. Điền một lần, phần mềm lo cả tên lẫn chỗ cất, và mỗi loại hồ sơ có thể mang một bộ quy tắc riêng. Ý tưởng này đến từ chính việc phải viết quy định đặt tên file cho cả phòng — viết ra thì dễ, bắt mọi người làm đúng mới khó."
  },
  {
   "maApp": "auto-sx",
   "thuTu": 2,
   "tieuDe": "Đo cái thực sự mất, không đo cái dễ đo",
   "noiDung": "Hao hụt và thời gian chết là hai khoản mà nhà máy hay ước lượng hơn là đo. Auto SX ghi nhận hao hụt thực tế theo từng lô và cảnh báo khi vượt định mức, đồng thời tính hiệu suất thiết bị tổng thể (OEE) — chỉ số ghép cả ba yếu tố sẵn sàng, tốc độ và chất lượng. Biết dây chuyền mất giờ ở đâu thường có giá trị hơn là biết tổng sản lượng tháng."
  },
  {
   "maApp": "auto-hcns",
   "thuTu": 2,
   "tieuDe": "Trả việc về cho chính người cần",
   "noiDung": "Nhân viên tự chấm công trực tuyến, tự gửi đơn từ và theo dõi đơn đang nằm ở ai, tự xem phiếu lương của mình mà không phải nhờ người khác in hộ. Phòng hành chính chuyển từ vai trò trả lời sang vai trò duyệt và kiểm soát. Đây không phải chuyện tiết kiệm giấy — nó là chuyện bỏ đi cái hàng đợi vô hình trước cửa phòng nhân sự vào mỗi kỳ lương."
  },
  {
   "maApp": "auto-kd",
   "thuTu": 2,
   "tieuDe": "Báo giá bậc thang theo số lượng đặt",
   "noiDung": "Khách gia công nào cũng hỏi cùng một câu: làm 3.000 hộp giá bao nhiêu, làm 20.000 hộp giá bao nhiêu. Auto KD báo giá theo **4 mốc số lượng tối thiểu (MOQ)** mặc định 3.000 · 5.000 · 10.000 · 20.000, kèm mức lợi nhuận mặc định 35 · 30 · 25 · 20% — tất cả đổi được cho hợp từng nhà máy. Chọn VAT 0%, 5%, 8% hoặc 10%. Mỗi báo giá mang một trong 4 trạng thái: giá chốt · đang đàm phán · không ok · tạm dừng, nên nhìn danh sách là biết báo giá nào đang treo."
  },
  {
   "maApp": "auto-fixcard",
   "thuTu": 2,
   "tieuDe": "Bốn bậc màu — biết hậu quả trước khi bấm",
   "noiDung": "Mỗi nút trong Auto Fix Card mang một nhãn màu ở dòng đầu, nhìn màu là biết hậu quả. 🟢 **Xanh — SOI**: chỉ đọc, không ghi gì xuống thẻ, bấm bao nhiêu lần cũng được. 🟡 **Cam — CỨU**: có ghi xuống thẻ nhưng giữ nguyên dữ liệu, và app chép vùng cũ ra tệp trước khi ghi. 🔴 **Đỏ — DỰNG LẠI**: mất hết dữ liệu, phải gõ tay chữ XOA mới chạy. ⛔ **Đen — PHỤC HỒI SÂU**: ghi đè từng ô nhớ, rất lâu, chỉ dùng khi hết cách. Không công cụ nào khác nói trước cho người dùng biết bấm cái nào là mất dữ liệu."
  },
  {
   "maApp": "auto-family",
   "thuTu": 2,
   "tieuDe": "Mỗi người một tài khoản, bố mẹ quyết ai thấy gì",
   "noiDung": "Mỗi thành viên có tài khoản và mã PIN riêng. Bố mẹ thuộc nhóm chủ, mở ma trận phân quyền 13 vùng để bật tắt từng quyền **Xem · Thêm-Sửa · Duyệt** cho con cái, người lớn khác hoặc từng người. Tắt quyền xem một màn thì màn đó biến mất khỏi menu, thông báo và cả Trợ lý AI — máy chủ cũng không gửi dữ liệu đó về máy của người không được xem. Con không thấy số tiền, nhưng vẫn ghi được việc nhà của mình và gửi đề xuất."
  },
  {
   "maApp": "auto-rd",
   "thuTu": 3,
   "tieuDe": "Dinh dưỡng: năm chuẩn tính và một ngưỡng không được vượt",
   "noiDung": "Giá trị dinh dưỡng không có một cách tính duy nhất. Cùng một công thức, đối chiếu theo bảng nhu cầu khuyến nghị của Việt Nam sẽ ra %RNI khác với đối chiếu theo Codex, FAO hay quy định của EU — mà hồ sơ nộp ở mỗi thị trường lại đòi một chuẩn riêng. Auto RD tính song song cả năm cách và cho chọn chuẩn khi xuất hồ sơ. Quan trọng hơn: khi một vi chất chạm hoặc vượt ngưỡng tiêu thụ tối đa an toàn (UL), phần mềm báo đỏ ngay lúc đang dựng công thức — chứ không phải đợi tới lúc hồ sơ bị trả lại."
  },
  {
   "maApp": "auto-khvt",
   "thuTu": 3,
   "tieuDe": "Tồn kho phải quản theo lô, không thể quản theo tổng",
   "noiDung": "Với ngành dược và thực phẩm, con số \"tồn 500 kg\" gần như vô nghĩa nếu không biết 500 kg đó gồm những lô nào và hạn dùng tới đâu. Mỗi lần nhập, Auto KHVT sinh một mã lô nội bộ theo cấu trúc thống nhất, gắn kèm lô nhà cung cấp và hạn dùng, quản song song nhiều kho khác nhau. Xuất kho mặc định chọn lô gần hết hạn trước theo nguyên tắc FEFO, nổi cảnh báo với lô cận hạn dưới 30 ngày, và chặn thẳng thao tác nếu lô đó chưa được phòng chất lượng duyệt đạt. Chặn ngay tại chỗ như vậy hiệu quả hơn nhiều so với một quy định dán trên tường."
  },
  {
   "maApp": "auto-qaqc",
   "thuTu": 3,
   "tieuDe": "Một chỉ tiêu không đạt tự mở hồ sơ điều tra",
   "noiDung": "Điểm rò rỉ lớn nhất của hệ thống chất lượng thủ công nằm ở khoảng giữa: kết quả không đạt đã có, nhưng hồ sơ điều tra thì chưa ai lập. Auto QA-QC bịt khoảng đó bằng cách tự động — khi trưởng phòng ký duyệt một phiếu kiểm nghiệm có chỉ tiêu không đạt, hồ sơ sự cố và điều tra ngoài tiêu chuẩn mở ra ngay theo đúng quy trình đã ban hành, không cần ai nhớ để tạo. Từ đó sinh các hành động khắc phục và phòng ngừa, gán cho người phụ trách kèm hạn hoàn thành. Sự cố chỉ tự khép lại khi toàn bộ hành động thành phần đã đóng — quá hạn cái nào là hiện đỏ trên bảng điều khiển."
  },
  {
   "maApp": "auto-box",
   "thuTu": 3,
   "tieuDe": "Xếp cho vừa chưa đủ, phải xếp cho vững",
   "noiDung": "Đây là chỗ tôi thấy nhiều công cụ tính xếp hàng bỏ sót. Một phương án tối ưu tuyệt đối về thể tích có thể hoàn toàn bất khả thi ngoài thực tế: lớp thưa nằm dưới, lớp dày đè lên trên, xe chạy vài chục cây số là móp hàng. Auto Box dùng quy tắc xếp lớp nhiều hàng xuống dưới, lớp lẻ và thưa lên trên — giữ nguyên sức chứa nhưng khối hàng đứng vững, chịu được rung lắc đường bộ và đường biển. Bài toán ở đây không thuần là hình học, mà là hình học cộng với điều kiện cơ học của hàng thật."
  },
  {
   "maApp": "autofile",
   "thuTu": 3,
   "tieuDe": "Tìm được cả khi nhớ sai",
   "noiDung": "Người đi tìm hồ sơ thường chỉ nhớ mang máng: thiếu dấu, sai chính tả, đảo thứ tự chữ, nhớ nhầm mã. Autofile có nhiều chế độ tìm, trong đó chế độ tìm gần giống dựa trên thuật toán đo khoảng cách Levenshtein giữa hai chuỗi, nên không cần gõ đúng tuyệt đối vẫn ra kết quả. Ngoài tìm theo tên, phần mềm còn tìm được từ khoá nằm sâu bên trong nội dung tài liệu — thứ quyết định khi bạn chỉ nhớ nội dung mà quên hẳn tên file."
  },
  {
   "maApp": "auto-sx",
   "thuTu": 3,
   "tieuDe": "Vì sao tôi cố tình làm chậm ứng dụng này",
   "noiDung": "Lập lịch sản xuất là bài toán rất dễ viết ra một phần mềm chạy đúng trên lý thuyết nhưng không ai ngoài xưởng dùng nổi. Tôi chủ ý làm chậm phần này để có thời gian đứng ở chuyền, xem các tổ thực sự đổi ca thế nào và xử lý ra sao khi lệch kế hoạch. Bản V1 vì vậy chỉ mở những phần tôi đã nhìn thấy tận nơi, còn phần nào chưa hiểu đủ thì để trống chứ không đoán."
  },
  {
   "maApp": "auto-hcns",
   "thuTu": 3,
   "tieuDe": "Giao việc và đánh giá nằm cùng chỗ với hồ sơ người làm",
   "noiDung": "Giao việc mà tách khỏi hồ sơ nhân sự thì tới kỳ đánh giá lại phải ngồi nhớ lại cả quý. Trong Auto HCNS, việc được giao, báo cáo tiến độ và chỉ tiêu KPI nằm cùng một chỗ với hồ sơ của người làm, nên tới kỳ đánh giá là số liệu đã có sẵn chứ không phải dựng lại từ trí nhớ. Trang tin nội bộ và danh bạ đặt cùng cổng, để người mới vào có đúng một nơi cần mở."
  },
  {
   "maApp": "auto-kd",
   "thuTu": 3,
   "tieuDe": "Công thức và bao bì 3 cấp — giá tự cộng đủ",
   "noiDung": "Giá một sản phẩm gia công không chỉ là giá ruột. Auto KD có bước **chọn bao bì 3 cấp**: bao bì trực tiếp (lọ, vỉ, túi), bao bì ngoài (hộp) và thùng, cộng thêm phụ kiện — mỗi loại có 3 mức giá tiết kiệm · tiêu chuẩn · cao cấp. Có sẵn 33 mẫu bao bì và 6 bộ gợi ý để bắt đầu. App tự cộng tiền bao bì vào giá thành. Điểm quan trọng: khách và Sales thường chỉ thấy **khoảng giá** (từ −5% tới +10%), không suy ngược ra được giá vốn của nhà máy."
  },
  {
   "maApp": "auto-fixcard",
   "thuTu": 3,
   "tieuDe": "Chữa từ nhẹ tới nặng, có đường lùi",
   "noiDung": "Người ta hay làm bừa: format, không được thì cài phần mềm lạ, rồi thẻ hỏng nặng hơn. Auto Fix Card đi đúng thứ tự qua **16 mức sửa chữa**, từ nhẹ nhất tới nặng nhất. Trong đó **7 mức giữ nguyên dữ liệu** — chạy xong dữ liệu vẫn còn. Có 7 lớp an toàn chống xoá nhầm. Còn nếu thẻ hỏng chip thật, app nói thẳng: cái này không cứu được — khỏi mất thêm thời gian."
  },
  {
   "maApp": "auto-family",
   "thuTu": 3,
   "tieuDe": "Việc nhà biến thành trò chơi có điểm",
   "noiDung": "Con bấm một chạm \"đã rửa bát\", bố mẹ xác nhận, sao tự cộng. Sao đổi được quà do bố mẹ đặt, cuối tuần có bảng vinh danh. Việc lớn hơn thì giao kiểu bảng Kanban: hạn chót, sao thưởng, nghiệm thu bằng ảnh chụp. Mọi con số thống kê chỉ tính việc đã được xác nhận, nên không có chuyện \"khai khống\" lấy sao."
  },
  {
   "maApp": "auto-rd",
   "thuTu": 4,
   "tieuDe": "Chỗ dễ sai nhất vẫn là đơn vị",
   "noiDung": "Sai đơn vị là loại lỗi nguy hiểm nhất trong phần mềm R&D, vì số vẫn chạy bình thường và không có gì báo động. Nhầm kg/m³ với kg/L là sai một nghìn lần. Vitamin A dạng retinyl acetate và retinyl palmitate có hệ số quy đổi IU khác nhau; vitamin E tự nhiên khác vitamin E tổng hợp. Vì vậy Auto RD bắt buộc nguyên liệu lỏng phải khai tỷ trọng thật thay vì mặc định bằng 1, và quy đổi IU theo đúng dạng hoá học — thiếu dữ liệu thì báo thiếu, không đoán bừa. Kèm theo là bộ công cụ tính sẵn trong app: pha loãng C₁V₁ = C₂V₂, quy đổi %w/w ↔ ppm, °Brix ↔ tỷ trọng, scale cỡ lô và kiểm soát khối lượng đóng gói theo ĐLVN 275."
  },
  {
   "maApp": "auto-khvt",
   "thuTu": 4,
   "tieuDe": "Báo giá mười bước — chỗ Excel đuối nhất",
   "noiDung": "Tính giá nguyên liệu thì Excel làm được. Nhưng một báo giá sản xuất tử tế còn phải tách bạch bao bì cấp 1, bao bì cấp 2, và chi phí công đoạn — thứ phụ thuộc vào năng suất người trên ca, số giờ công và khấu hao máy, nên thay đổi theo cỡ lô. Đây là chỗ bảng tính bắt đầu rối. Auto KHVT tính chi phí công đoạn bung thẳng từ tuyến sản xuất đã khai, rồi xuất bảng so sánh bậc giá theo ba tới năm cỡ lô — nhìn một lần là thấy lô càng lớn giá trên đơn vị càng giảm bao nhiêu. Đó là con số cần có khi ngồi thương lượng với khách, không phải con số ước lượng."
  },
  {
   "maApp": "auto-qaqc",
   "thuTu": 4,
   "tieuDe": "Ba điều kiện trước khi một lô được nhả",
   "noiDung": "Nhả lô là quyết định tốn kém nhất của phòng chất lượng: sai một lần là thu hồi. Vì vậy nút ký số ở màn hình nhả lô chỉ mở khi hệ thống tự kiểm đủ ba điều kiện — phiếu kiểm nghiệm thành phẩm đã duyệt đạt, không còn sự cố ngoài tiêu chuẩn nào đang mở, và toàn bộ hành động khắc phục liên quan đã hoàn tất. Thiếu bất kỳ điều nào thì nút không sáng, kèm dòng chỉ rõ đang vướng ở đâu. Đây không phải rào cản cho vui: nó biến một nguyên tắc vốn phụ thuộc trí nhớ và áp lực tiến độ thành một điều kiện kỹ thuật không thương lượng được."
  },
  {
   "maApp": "auto-box",
   "thuTu": 4,
   "tieuDe": "Mô phỏng 3D để nhìn trước khi làm thật",
   "noiDung": "Kết quả thuật toán xếp khối nếu chỉ hiện ra dưới dạng bảng số thì rất khó tin và khó kiểm tra. Vì vậy Auto Box dựng mô phỏng 3D xoay 360° được, phóng to được, kèm thanh trượt bóc xem từng lớp từ đáy lên. Người điều phối nhìn thấy chính xác lớp dưới đặt hàng gì, lớp trên đặt hàng gì, còn khoảng trống ở đâu. Đây cũng là cách nhanh nhất để một người có kinh nghiệm kho phát hiện phương án nào nghe thì hợp lý mà làm thì không nổi."
  },
  {
   "maApp": "autofile",
   "thuTu": 4,
   "tieuDe": "Đọc được bên trong file, không chỉ đọc tên file",
   "noiDung": "Phần tôi dùng nhiều nhất lại là trích xuất hàng loạt. Nạp vào vài trăm file Word, Excel hoặc PDF — hợp đồng, phiếu kết quả, biên bản — phần mềm đọc sâu vào nội dung, bóc ra các trường cần thiết như số hiệu, ngày ký, giá trị, chỉ tiêu, rồi trả về một bảng Excel tổng hợp. Việc trước đây phải mở từng file để chép tay giờ còn vài phút. Đây cũng là bước biến một đống tài liệu chết thành dữ liệu tra cứu và thống kê được."
  },
  {
   "maApp": "auto-sx",
   "thuTu": 4,
   "tieuDe": "Mười hai phân hệ của bản V1",
   "noiDung": "Bản V1 mở đúng những phần tôi đã đứng ở chuyền nhìn thấy cách người ta làm thật. Lệnh sản xuất nhận từ Auto KHVT được tách thành ba loại lệnh riêng cho ba công đoạn — pha chế, định liều đóng gói, hoàn thiện — vì trên thực tế ba tổ này nhận việc ở ba thời điểm khác nhau chứ không cùng lúc. Kèm theo là quy trình và hồ sơ lô điện tử có ký duyệt, giám sát thiết bị và OEE, vật tư cơ điện với lịch bảo trì, phân ca chấm công cho tổ sản xuất, báo cáo hao hụt, và một cầu nối đồng bộ với Google Sheet cho những chỗ vẫn quen theo dõi trên bảng tính. Phần xếp lịch có cả hai chế độ tự động và kéo tay, vì ngoài xưởng không có ngày nào chạy đúng y kế hoạch."
  },
  {
   "maApp": "auto-hcns",
   "thuTu": 4,
   "tieuDe": "Lương, bảo hiểm và thuế — ba bảng hay lệch nhau nhất",
   "noiDung": "Ba bảng này thường được lập bởi ba người, ở ba file khác nhau, dựa trên cùng một danh sách nhân sự. Chỉ cần một người nghỉ giữa tháng mà một bảng chưa cập nhật là số lệch, và thường tới lúc quyết toán mới phát hiện. Auto HCNS để cả ba bảng đọc chung một danh sách nhân sự và chung một bảng chấm công, nên sửa ở gốc là ba bảng cùng đổi theo."
  },
  {
   "maApp": "auto-kd",
   "thuTu": 4,
   "tieuDe": "Đơn hàng 8 khâu và hồ sơ đơn 8 tab",
   "noiDung": "Mỗi đơn hàng chạy qua 8 khâu cố định: Đặt hàng → Tạm ứng → Maket bao bì → Kế hoạch nguyên vật liệu → Sản xuất → QC & COA → Nhập kho thành phẩm → Đã giao. Nhìn thanh tiến độ là biết hàng đang nằm ở đâu. Mỗi đơn lại có một **hồ sơ riêng 8 tab**: Tổng quan · Hợp đồng · Lưu ý · Thanh toán · Hoá đơn · Giao hàng · Tài liệu · Nhật ký. Lưu ý có 3 mức cảnh báo — cao, trung bình, thông tin — nên việc gấp không bị chìm giữa việc thường."
  },
  {
   "maApp": "auto-fixcard",
   "thuTu": 4,
   "tieuDe": "Chẩn đoán một nút",
   "noiDung": "Nút đầu tiên luôn là 🩺 CHẨN ĐOÁN THẺ: app tự đọc thẻ rồi chỉ đúng việc cần làm tiếp theo, người không biết gì cũng biết bước sau. Muốn nhìn tận nơi có Xem sâu cấu trúc thẻ (MBR, boot sector, bảng FAT), Nhận diện thiết bị (hãng, số hiệu, VID/PID, firmware — tra được thẻ giả nhãn), Theo dõi kết nối 60 giây để bắt đúng ca thẻ lúc nhận lúc không, và Hỏi thẳng chip bằng lệnh gửi xuống tận con chip. Tất cả đều thuộc nhóm 🟢 SOI — an toàn tuyệt đối."
  },
  {
   "maApp": "auto-family",
   "thuTu": 4,
   "tieuDe": "Thực đơn – đi chợ – thu chi nối liền một mạch",
   "noiDung": "Lên thực đơn ba bữa cho cả tuần (có gợi ý món và cảnh báo dị ứng), app tự gom nguyên liệu thành danh sách đi chợ, tìm không dấu. Mua xong đánh dấu là thành phiếu chi, so ngay với hạn mức từng hạng mục. Thu – chi chia nhiều ví, có khoản định kỳ (điện, nước, học phí) tự nhắc trước hạn trên lịch chung của cả nhà."
  },
  {
   "maApp": "auto-rd",
   "thuTu": 5,
   "tieuDe": "Soi pháp lý bằng máy thay vì bằng trí nhớ",
   "noiDung": "Một chuyên viên giỏi vẫn không thể thuộc lòng toàn bộ danh mục phụ gia được phép cùng mức dùng tối đa của từng chất trong từng nhóm thực phẩm. Auto RD bung nguyên công thức ra rồi đối chiếu tự động: thực phẩm soi theo Codex CXS 192-1995, mỹ phẩm soi theo Annex của EC 1223/2009. Chất bị cấm thì báo đỏ chặn lại; chất vượt mức tối đa cho phép thì chỉ rõ ngưỡng để hạ tỷ lệ. Kiểm tra này chạy ngay từ lúc còn đang thử nghiệm — rẻ hơn rất nhiều so với phát hiện sau khi đã sản xuất."
  },
  {
   "maApp": "auto-khvt",
   "thuTu": 5,
   "tieuDe": "Thẩm tra giá: để phần mềm bắt lỗi thay người",
   "noiDung": "Sai sót trong báo giá thường không đến từ phép tính mà từ dữ liệu đầu vào: một nguyên liệu mới chưa khai giá, một đơn giá nhập từ năm ngoái chưa cập nhật, một đơn hàng vô tình báo dưới giá vốn. Auto KHVT rà ba nhóm cảnh báo trước khi cho xuất phiếu: thiếu đơn giá, đơn giá lệch quá 5% so với giá nhập bình quân đang có trong kho, và tỷ lệ lãi rơi dưới ngưỡng an toàn đã cài. Mỗi cảnh báo có nút nhảy thẳng tới ô dữ liệu cần sửa — vì một cảnh báo mà không chỉ được chỗ sửa thì người ta sẽ bỏ qua nó."
  },
  {
   "maApp": "auto-qaqc",
   "thuTu": 5,
   "tieuDe": "Truy xuất 360° và nhật ký không xoá được",
   "noiDung": "Gõ một số lô, hệ thống bung ra cả cây lịch sử: nhà cung cấp, ngày nhập, phiếu kiểm đầu vào, lệnh sản xuất, phiếu kiểm trên dòng và thành phẩm, các sự cố liên quan. Chuỗi này phải đứng vững cả khi bị hỏi ngược lại — một lô nguyên liệu có vấn đề thì đã đi vào những lô thành phẩm nào, đã giao cho ai. Song song, mọi thao tác ghi vào nhật ký kiểm toán theo tinh thần 21 CFR Part 11: ai làm gì, lúc nào, sửa từ giá trị nào sang giá trị nào — và không có chức năng xoá log. Chính chỗ \"không xoá được\" mới là thứ khiến hồ sơ điện tử đứng vững trước đoàn thanh tra, và cũng là chỗ dễ bị làm hời hợt nhất nếu người viết phần mềm không hiểu vì sao nó tồn tại."
  },
  {
   "maApp": "auto-box",
   "thuTu": 5,
   "tieuDe": "Từ màn hình ra tới bãi xe",
   "noiDung": "Phương án xếp chỉ có giá trị khi tới được tay người bốc hàng. Auto Box in sơ đồ bốc xếp khổ A4 kèm hình 3D, số lượng hộp và thùng, thể tích, tải trọng và thứ tự xếp từng lớp — công nhân kho nhìn hình là làm được, không phải suy đoán. Bản in đó cũng xuất PDF gửi cho tài xế và cho khách. Danh mục hộp, thùng, phương tiện nhập xuất bằng Excel, có sao lưu và khôi phục; ứng dụng chạy dạng portable, cắm USB là chạy, không cần cài đặt."
  },
  {
   "maApp": "autofile",
   "thuTu": 5,
   "tieuDe": "Hai chi tiết nhỏ cứu được rất nhiều giờ",
   "noiDung": "Thứ nhất là font tiếng Việt đời cũ. Kho tài liệu của nhiều đơn vị vẫn còn hàng nghìn file gõ bằng VNI-Times hay TCVN3 — mở ra là chữ loạn, đọc không nổi, bỏ thì tiếc. Autofile nhận diện và chuyển mã hàng loạt sang Unicode mà không phá định dạng. Thứ hai là thao tác PDF ngay trong app: xem trước một chạm, ghép nhiều phiếu COA và tiêu chuẩn thành một bộ hồ sơ hoàn chỉnh, hoặc tách một file dày thành từng trang. Hai việc nhỏ, nhưng là hai việc người làm hồ sơ phải làm mỗi ngày."
  },
  {
   "maApp": "auto-sx",
   "thuTu": 5,
   "tieuDe": "Quy trình khai một lần, phòng R&D và nhà xưởng cùng đọc",
   "noiDung": "Chỗ hay đứt nhất giữa phòng nghiên cứu và nhà xưởng là quy trình sản xuất: R&D dựng một đằng, xưởng in ra rồi chép tay lại một nẻo, tới lúc có sự cố không biết bản nào mới. Mục Quy trình của Auto SX vì vậy dựng **theo đúng khung mười bước của Auto RD** — cùng thứ tự, cùng cách gọi tên: danh mục quy trình, thông tin và ký duyệt, công thức R&D, định mức sản xuất, thành phần công thức, quy trình pha chế, vận hành và đóng gói, quy trình hoàn chỉnh, theo dõi sản xuất, hồ sơ sản xuất.\nCách làm việc cũng giống hệt: chọn MỘT quy trình ở ô trên cùng, rồi mọi mục con bên dưới đều thao tác trên đúng quy trình đang chọn. Người đứng máy mở ra thấy đúng thứ phòng R&D đã khai, không phải một bản chép lại."
  },
  {
   "maApp": "auto-hcns",
   "thuTu": 5,
   "tieuDe": "Góp ý và sáng kiến cần một cửa vào",
   "noiDung": "Hòm thư góp ý dán ở hành lang gần như không ai bỏ thư. Nhưng cho người ta một ô nhập ngay trong ứng dụng họ vẫn mở hằng ngày để chấm công thì lại khác. Auto HCNS có hòm thư góp ý – khiếu nại và mục sáng kiến cải tiến, cộng với phân quyền theo vai trò để ai xem được gì là rõ ràng. Một sáng kiến của công nhân đứng máy nhiều khi đáng giá hơn cả một buổi họp cải tiến, chỉ là trước nay không có đường nào để nó đi lên."
  },
  {
   "maApp": "auto-kd",
   "thuTu": 5,
   "tieuDe": "Cổng khách hàng — khách tự tra, Sales đỡ trả lời",
   "noiDung": "Câu khách hỏi nhiều nhất là \"hàng của tôi tới đâu rồi\". Auto KD có **Cổng khách hàng 7 thẻ** xếp theo đường khách đi: khách đăng nhập rồi tự xem tiến độ đơn, nhận báo giá, xem công nợ, nhắn tin với nhà máy, chấm điểm mẫu thử theo 4 tiêu chí cảm quan (màu · mùi · vị · thể chất) và tự thử xây công thức kèm bao bì để thấy khoảng giá dự kiến. Cổng tự đăng xuất sau 15 phút không dùng. Khách xem được gì do nhà máy bật tắt cho từng người."
  },
  {
   "maApp": "auto-fixcard",
   "thuTu": 5,
   "tieuDe": "Ai cần Auto Fix Card",
   "noiDung": "Thợ sửa máy tính và cửa hàng điện thoại — khách mang thẻ hỏng tới mỗi tuần, có app này thì trả lời được trong vài phút: cứu được hay không. Thợ lắp camera giám sát — thẻ camera ghi suốt ngày đêm, tháo ra là Windows đòi format dù thẻ còn tốt. Thợ ảnh, quay phim — biết thẻ sắp hỏng trước khi nó hỏng giữa buổi chụp. Người mua thẻ trên mạng — thẻ giả dung lượng ghi 512 GB nhưng thật chỉ 32 GB. Và văn phòng, trường học không có người IT."
  },
  {
   "maApp": "auto-family",
   "thuTu": 5,
   "tieuDe": "Trợ lý AI đọc đúng dữ liệu nhà mình",
   "noiDung": "Hỏi bằng lời bình thường — \"tháng này nhà mình chi ăn uống bao nhiêu?\", \"tuần sau ai có lịch gì?\" — Trợ lý AI trả lời từ chính dữ liệu của gia đình và kho tài liệu riêng trên Google Drive, đúng theo quyền của người đang hỏi. Khoá AI cất trên máy chủ của gia đình, người nhà dùng được mà không phải dán khoá; trên bản dùng thử, câu hỏi đi qua máy chủ rd.newlab nên trang web không chứa khoá nào."
  },
  {
   "maApp": "auto-rd",
   "thuTu": 6,
   "tieuDe": "Từ công thức tới bộ hồ sơ nộp được",
   "noiDung": "Phần mềm R&D chỉ thực sự có ích khi kết quả in ra nộp được luôn. Auto RD dựng quy trình sản xuất theo mười bước mẫu chia ba công đoạn — pha chế, đóng gói cấp 1, đóng gói cấp 2 — rồi xuất biểu mẫu trống cho ba tổ ký ở ba thời điểm, đúng cách hồ sơ lô GMP vận hành ngoài xưởng. Hồ sơ công bố mỹ phẩm ASEAN và bộ PIF được điền tự động từ chính công thức đó, có sẵn cả bản theo chuẩn áp dụng từ 01/01/2029, xuất ra PDF, Word hoặc gói ZIP. Song song, kế hoạch theo dõi độ ổn định tự lên mốc 1–3–6–9 cho tới 36 tháng, tự soạn phiếu yêu cầu gửi phòng Lab đúng hạn và tự chấm đạt hay không khi kết quả trả về."
  },
  {
   "maApp": "auto-khvt",
   "thuTu": 6,
   "tieuDe": "Tôn trọng thói quen của người đang dùng Excel",
   "noiDung": "Một quyết định thiết kế tôi cho là quan trọng: không bắt người dùng bỏ Excel ngay ngày đầu. Auto KHVT cho dán thẳng bảng từ Excel và tự khớp cột theo tiêu đề, nhập được CSV, gợi ý mã khi gõ, giữ các phím tắt quen tay. Chứng từ in ra theo mẫu quen thuộc của kế toán kho. Ứng dụng chạy offline trên một máy hoặc đặt trên ổ mạng nội bộ cho nhiều người cùng dùng, phân quyền riêng cho thủ kho, người lập kế hoạch và người tính giá. Phần mềm bắt người ta đổi thói quen quá nhiều thì thường chết yểu, dù chức năng có hay tới đâu."
  },
  {
   "maApp": "auto-qaqc",
   "thuTu": 6,
   "tieuDe": "Phòng Lab cũng cần được quản",
   "noiDung": "Một kết quả kiểm nghiệm chỉ đáng tin khi thiết bị còn hiệu chuẩn, chất chuẩn còn hạn và phương pháp thử đã được thẩm định. Vì vậy trong Auto QA-QC có sẵn phần quản lý phòng Lab: vị trí và số lượng mẫu lưu kèm nhật ký huỷ mẫu, hạn dùng hoá chất và chất chuẩn, lịch hiệu chuẩn và bảo trì thiết bị, tất cả đều cảnh báo trước khi tới hạn. Kèm theo là phần thẩm định IQ/OQ/PQ cho thiết bị, quy trình, phương pháp thử và vệ sinh — chưa đủ ba giai đoạn đạt thì hệ thống không cho phê duyệt. Đây là phần ít được nhắc tới nhưng là nền của mọi con số phía trên."
  },
  {
   "maApp": "auto-box",
   "thuTu": 6,
   "tieuDe": "Lịch sử tính toán và phiếu bốc xếp có mã QR",
   "noiDung": "Bản V16 thêm hai thứ sinh ra từ chính phàn nàn của người dùng. Danh mục lịch sử tính toán: mọi lần tính đều được lưu, lọc theo mã sản phẩm, loại xe hay ngày tính — đơn hàng lặp lại thì nạp phương án 3D cũ bằng một cú bấm, không phải nhập lại thông số nào. Và phiếu bốc xếp A4 thế hệ mới: ngoài sơ đồ 3D từng lớp còn in kèm mã QR — công nhân kho quét là mở đúng phương án xếp trên điện thoại, tờ phiếu và màn hình không bao giờ lệch nhau."
  },
  {
   "maApp": "autofile",
   "thuTu": 6,
   "tieuDe": "Dữ liệu không rời khỏi máy",
   "noiDung": "Autofile là một file EXE chạy thẳng, không cần cài đặt, dùng được trên Windows 10 và 11. Toàn bộ xử lý diễn ra tại chỗ: không tải tài liệu lên đám mây, không cần Internet. Với hồ sơ chất lượng, hợp đồng và tài liệu công bố, đây không phải tính năng cộng thêm mà là điều kiện bắt buộc — nhiều đơn vị đơn giản là không được phép đưa loại tài liệu này ra khỏi mạng nội bộ."
  },
  {
   "maApp": "auto-sx",
   "thuTu": 6,
   "tieuDe": "Hồ sơ lô điện tử và cái cửa cuối cùng trước khi hàng ra",
   "noiDung": "Mục cuối của quy trình là hồ sơ lô điện tử — gom hết những gì đã xảy ra với lô đó: ai làm, làm lúc nào, thông số ra sao, ai ký từng bước. Không còn cảnh cuối tháng đi lục từng tờ giấy rời để ghép lại thành một bộ hồ sơ.\nCửa **thả lô** đặt đúng ở cuối mục này, không đặt lung tung giữa chừng. Lý do rất đơn giản: thả lô là quyết định cuối cùng trước khi hàng rời xưởng, nên nó phải đứng sau tất cả các bước khác — nhìn vào là biết đã đi qua đủ chưa rồi mới ký."
  },
  {
   "maApp": "auto-hcns",
   "thuTu": 6,
   "tieuDe": "Giao việc và chấm KPI phải đi cùng nhau, không tách rời",
   "noiDung": "Chỗ hỏng của phần lớn cách chấm KPI là nó tách khỏi việc thật: cuối kỳ ngồi cho điểm theo trí nhớ và theo cảm tình. Auto HCNS buộc hai thứ đó dính vào nhau. Mỗi việc giao ra đều mang sẵn ba thông tin: **giờ chuẩn** để làm, **trọng số KPI** từ 1 tới 5 theo mức khó, và **tiêu chuẩn nghiệm thu** — nghĩa là làm tới đâu mới được tính là xong. Nhân viên nhận việc trên máy của mình, báo tiến độ theo phần trăm, quản lý nhìn thấy ngay ai đang tắc ở đâu.\nTới kỳ, hệ số KPI không phải ngồi nghĩ ra: nó là tỷ lệ việc hoàn thành trên tổng việc đã giao. Hệ số đó chảy thẳng vào bảng lương thành khoản thưởng. Người làm được nhiều việc khó thì thấy điều đó trong phiếu lương, chứ không phải nghe nói suông trong cuộc họp."
  },
  {
   "maApp": "auto-kd",
   "thuTu": 6,
   "tieuDe": "Khách của ai người nấy giữ",
   "noiDung": "Chuyện giành khách giữa các Sales là chuyện có thật ở mọi phòng kinh doanh. Auto KD bảo vệ khách 45 ngày cho Sales đã nhập, cảnh báo ngay khi có người nhập trùng; khách quá 60 ngày không được chăm sóc thì được điều chuyển — các mốc này chỉnh được. Phân quyền chia tới **13 menu × 6 thao tác** (xem · thêm · sửa · xoá · duyệt · in xuất) với 3 mức phạm vi dữ liệu: cá nhân, nhóm, toàn công ty. Có 4 quy trình duyệt đang chạy thật: báo giá, khách mới hoặc tranh chấp, nghiệm thu việc và chốt giá."
  },
  {
   "maApp": "auto-fixcard",
   "thuTu": 6,
   "tieuDe": "Nhỏ, nhanh, nói thật",
   "noiDung": "Bản chạy chỉ **763 KB** — nhỏ hơn một tấm ảnh chụp bằng điện thoại, bật lên trong 0,5 giây, không phải cài thêm gì, chép vào USB chạy thẳng. Trong app có sẵn 13 bài hướng dẫn tiếng Việt, không cần tra mạng. Mỗi lần dựng bản, 559 phép thử tự động chạy lại toàn bộ. Dùng thử đầy đủ mọi tính năng trong 7 ngày."
  },
  {
   "maApp": "auto-family",
   "thuTu": 6,
   "tieuDe": "Dữ liệu ở Google Sheet của chính gia đình",
   "noiDung": "Không có máy chủ trung gian giữ dữ liệu: cả nhà đồng bộ qua một Google Sheet do chính gia đình sở hữu, có chống spam và giới hạn ghi. Bố dựng Sheet một lần, thêm nhanh cả nhà, rồi gửi link — người nhận chạm vào tên mình, nhập PIN là vào, không phải dán mã gì. Mất mạng vẫn dùng được, có mạng lại tự đồng bộ; cài ra màn hình điện thoại như một app, kèm bản Windows."
  },
  {
   "maApp": "auto-rd",
   "thuTu": 7,
   "tieuDe": "Ba bộ hồ sơ tự sinh: nghiên cứu, lô GMP và PIF",
   "noiDung": "Điểm tôi đầu tư nhiều nhất ở bản V12 là để phần mềm tự sinh ba bộ hồ sơ nặng nhất của nghề. Thứ nhất, hồ sơ nghiên cứu: mỗi lần thử V1, V2, V3 đều được ghi nhật ký — thông số, cảm quan, kết luận — chốt công thức là đóng gói thành bộ hồ sơ R&D hoàn chỉnh, khỏi ngồi truy lại trí nhớ. Thứ hai, hồ sơ lô GMP: từ công thức đã duyệt, bấm một nút là bung cỡ lô, tính lượng nguyên liệu thực xuất và in biểu mẫu mười bước cho ba tổ ký. Thứ ba, bộ PIF mỹ phẩm ASEAN: phần mềm tự rút thông tin INCI, CAS, CoA, tiêu chuẩn và quy trình pha chế, nén thành gói ZIP đủ bốn phần sẵn sàng trình cơ quan quản lý. Kho CoA – MSDS – Spec gắn thẳng vào từng mã nguyên liệu nên hồ sơ không bao giờ thiếu chứng từ gốc."
  },
  {
   "maApp": "auto-khvt",
   "thuTu": 7,
   "tieuDe": "Từ đơn hàng tới lệnh sản xuất, không cần tờ giấy nào ở giữa",
   "noiDung": "Từ bản V5, ứng dụng nối nốt đoạn giữa mà trước đây vẫn phải làm tay: chọn danh sách đơn hàng, phần mềm tự lập kế hoạch sản xuất theo năng suất xưởng rồi xuất thẳng lệnh sản xuất cho từng tổ pha chế, đóng gói. Tồn kho có ngưỡng an toàn tối thiểu – tối đa, sắp chạm đáy là cảnh báo trước khi kịp thiếu. Kho thiết kế theo kiểu truy xuất 360°: gõ một mã lô là ra vị trí kệ, nhà cung cấp, hạn dùng và toàn bộ lịch sử nhập xuất. Màn giao hàng theo dõi đơn từ lúc lên lệnh tới lúc hoàn tất, trừ kho FEFO đúng một lần — hết hẳn lỗi trừ kho hai lần vốn rất khó truy ra."
  },
  {
   "maApp": "auto-qaqc",
   "thuTu": 7,
   "tieuDe": "Hoá chất, chất chuẩn và động cơ Autofile nhúng trong app",
   "noiDung": "Bản V3 thêm hai mảng ít phần mềm chất lượng nào chịu làm. Một là kiểm soát trọn vòng đời hoá chất và chất chuẩn phòng Lab: hạn dùng, nồng độ, vị trí tủ lưu, người pha — và chai chất chuẩn hết hạn bị chặn ngay trên phiếu kiểm nghiệm, vì kết quả đo bằng chuẩn hết hạn là kết quả vô giá trị. Hai là động cơ Autofile nhúng thẳng vào app: gom CoA nguyên liệu, phiếu kiểm trên dòng và thành phẩm rồi nối thành một bộ PDF hồ sơ lô, đổi tên phiếu theo biến chuẩn, tra bất kỳ file SOP hay CoA nào trong nửa giây. Chuỗi kiểm nghiệm phủ kín ba chặng — đầu vào IQC, trên dòng IPQC, thành phẩm OQC — bám theo đúng lệnh sản xuất."
  },
  {
   "maApp": "auto-box",
   "thuTu": 7,
   "tieuDe": "Bản V16: bán được phần mềm thì phải khoá được nó",
   "noiDung": "Sáu phần trên nói về chuyện xếp hàng. Phần này nói chuyện khác hẳn: làm sao giao phần mềm cho người lạ mà vẫn giữ được quyền. Bản V16 dựng lại toàn bộ hệ cấp phép thành **ba tầng** — dùng thử miễn phí bảy ngày neo theo mã máy, key dùng thử, và key trả phí khoá theo máy. Khách muốn xin key thì điền tên và số điện thoại ngay trong app, hệ thống tự tạo một dòng chờ duyệt kèm mã máy; không phải soạn mail, không phải chụp màn hình gửi qua lại.\nPhần đáng nói nằm ở chỗ khoá: chìa khoá và địa chỉ máy chủ chuyển hẳn ra khỏi phần giao diện, quyền quyết định cho vào app nằm ở tiến trình chính. Tệp giấy phép được ký và trộn với mã máy, nên sửa tay hay chép sang máy khác đều hỏng chữ ký và app từ chối. Phía máy chủ có khoá chống hai máy cùng nhập một key.\nMột điểm tôi thích nhất: số ngày dùng thử, thông báo, và cả nút khoá từ xa đều đổi được **ngay trên bảng tính**, không phải dựng lại file cài đặt. ==Lá chắn thật không nằm trong file EXE, mà nằm ở chỗ mình còn bật tắt được từ xa.=="
  },
  {
   "maApp": "autofile",
   "thuTu": 7,
   "tieuDe": "Trích xuất theo tệp lệnh và xưởng PDF",
   "noiDung": "Bản V23 có hai bổ sung tôi dùng gần như hằng ngày. Thứ nhất, trích xuất theo tệp lệnh: nạp một lệnh sản xuất hay phiếu xuất kho, phần mềm quét ổ cứng và gom trọn bộ chứng từ liên quan — CoA, MSDS, phiếu kiểm nghiệm, hoá đơn — về một thư mục, sẵn sàng bàn giao cho khách hàng hoặc đoàn kiểm tra. Thứ hai, xưởng PDF: nối chục file CoA lẻ thành một tập, tách trang từ file dày trăm trang, chèn trang bìa, xoay trang và in hàng loạt theo đúng thứ tự. Kèm theo là danh mục file tự sinh ra Excel có link mở nhanh từng file — thứ bắt buộc phải có khi bàn giao cả một kho hồ sơ."
  },
  {
   "maApp": "auto-sx",
   "thuTu": 7,
   "tieuDe": "Cầu nối bốn ứng dụng, mà vẫn không cần máy chủ",
   "noiDung": "Auto SX không sống một mình. Nó có một cầu nối đồng bộ **hai chiều** với Auto KHVT, Auto QA-QC và Auto RD, đi qua Google Apps Script chứ không qua máy chủ thuê. Lệnh sản xuất từ KHVT chảy sang, kết quả kiểm nghiệm từ QA-QC chảy về, quy trình và định mức từ RD đọc thẳng.\nBấm một nút là đồng bộ ngay, hoặc bật chế độ tự động rồi quên đi. ==Bốn ứng dụng nói chuyện được với nhau mà nhà máy không phải trả một đồng tiền thuê máy chủ nào== — đúng nguyên tắc chung của cả bộ: kho chung thay cho máy chủ."
  },
  {
   "maApp": "auto-hcns",
   "thuTu": 7,
   "tieuDe": "Ngành nào cũng dùng được, vì phần người ở đâu cũng giống nhau",
   "noiDung": "Phần lớn ứng dụng còn lại trong bộ này gắn chặt với nhà máy — có định mức, có lô, có kiểm nghiệm. Auto HCNS thì khác: chấm công, giao việc, tính lương, bảo hiểm và thuế là phần việc **công ty nào cũng phải làm**, dù là xưởng sản xuất, công ty thương mại, nhà hàng, xây lắp hay một phòng khám.\nVì vậy danh mục công việc mẫu trong app không khoá cứng theo một nghề, mà chia theo nhóm — Kỹ thuật và Sản xuất, Hành chính Nhân sự, Tài chính Kế toán — rồi để mỗi nơi tự thêm mẫu việc của mình kèm giờ chuẩn và trọng số. Quy trình vẫn là một, chỉ có nội dung việc là khác. ==Một công ty chỉ cần một app cho toàn bộ phần quản lý con người.=="
  },
  {
   "maApp": "auto-kd",
   "thuTu": 7,
   "tieuDe": "Dữ liệu nằm ở đâu, giữ an toàn thế nào",
   "noiDung": "Dữ liệu của Auto KD nằm trên **Google Sheet riêng của chính nhà máy**, không nằm trên máy chủ của người viết phần mềm. Máy văn phòng dùng bản cài trên máy tính, nhân viên đi ngoài và khách dùng trên điện thoại. Về an toàn: nhân viên tự đăng xuất sau 30 phút, khách sau 15 phút; gõ sai mật khẩu 5 lần là khoá 15 phút; tự sao lưu mỗi đêm và lưu trữ cuốn chiếu 4 năm. Mất mạng app vẫn chạy được tối đa 7 ngày."
  },
  {
   "maApp": "auto-rd",
   "thuTu": 8,
   "tieuDe": "Bản V12: cả phòng ban dùng chung một kho",
   "noiDung": "Tới một lúc thì phần mềm của một người không đủ nữa. Công thức nằm trên máy trưởng phòng, nhân viên muốn xem phải hỏi; người nghỉ việc mang theo cả thư mục; và không ai biết chắc bản nào là bản đã duyệt. Bản V12 mở phần làm việc nhóm để cắt đúng ba chuyện đó: cả phòng trỏ vào một kho chung, mỗi người một tài khoản riêng với một trong bốn vai trò — quản trị, trưởng phòng, nhân viên, khách. Quản trị tạo tài khoản, đặt lại mật khẩu, đổi vai trò, khoá hoặc gia hạn ngay trong ứng dụng chứ không phải mở bảng tính. Vai trò khách tự hết hạn sau số ngày đã đặt, nên đối tác vào xem xong là tự đóng, không cần nhớ đi khoá. Nhân viên gửi công thức lên kho chung, nhưng phải qua bước duyệt mới thành bản chính thức — nhờ vậy câu hỏi \"bản nào mới nhất\" có một câu trả lời duy nhất. Điểm tôi giữ chặt: mỗi công ty dựng bộ của riêng mình, người làm phần mềm không giữ dữ liệu cũng không giữ tài khoản của khách."
  },
  {
   "maApp": "auto-khvt",
   "thuTu": 8,
   "tieuDe": "Xếp lịch chạy xưởng — phần khó nhất của nghề kế hoạch",
   "noiDung": "Tính được lượng vật tư phải mua mới là nửa việc. Nửa còn lại khó hơn nhiều: xưởng chạy được đơn này ngày nào. Bản V7 tính phần đó từ chính tuyến công đoạn của từng dạng bào chế — bột, cốm, viên, dung dịch đi qua những công đoạn khác nhau và tốn giờ khác nhau. Quan trọng nhất là ứng dụng biết mỗi phòng chạy song song được mấy chỗ: phòng pha chế có hai máy thì hai lô chạy cùng lúc, lô thứ ba phải đợi. Thiếu con số đó thì mọi phần mềm xếp lịch đều cho ra một bản kế hoạch đẹp trên giấy mà xưởng không chạy nổi. Kết quả hiện ra dạng biểu đồ Gantt: bấm một nút là xếp tự động, không vừa ý thì kéo tay từng lô, và đơn sắp tới hạn giao luôn tự đẩy lên đầu danh sách."
  },
  {
   "maApp": "auto-qaqc",
   "thuTu": 8,
   "tieuDe": "Bản V5: từ mười chín lên hai mươi chín phân hệ",
   "noiDung": "Bản V5 mở rộng chủ yếu về phía QA — phần lâu nay hay bị bỏ lại phía sau vì không cấp bách bằng kiểm nghiệm hằng ngày. Thêm báo cáo đánh giá chất lượng định kỳ, thẩm định thiết bị và quy trình theo bộ ba IQ – OQ – PQ, quản lý thay đổi kèm đánh giá rủi ro, đánh giá nhà cung cấp và danh mục nhà cung cấp được duyệt, đào tạo GxP với ma trận kỹ năng, cùng diễn tập thu hồi khẩn cấp tra ngược cả chuỗi lô. Toàn bộ hai mươi chín phân hệ xếp thành năm khối để người mới không bị lạc: báo cáo tổng quan, phòng kiểm nghiệm, kiểm tra sản xuất, quản lý tuân thủ, và danh mục nền. Đây là những thứ chỉ cần tới khi có đoàn đánh giá — nhưng lúc đó mà đi dựng thì đã muộn."
  },
  {
   "maApp": "auto-rd",
   "thuTu": 9,
   "tieuDe": "Điều tôi rút ra",
   "noiDung": "Bài học lớn nhất từ Auto RD: đừng số hoá một quy trình mình chưa từng tự tay làm. Rất nhiều chi tiết chỉ lộ ra khi ngồi làm thật — người ta hay ghi định mức theo mẻ chứ không theo kilogram; một nguyên liệu có thể mang hai tên gọi ở hai bộ phận; công thức hiếm khi đủ 100% ngay lần đầu mà thường chỉnh vài hoạt chất rồi lấy dung môi bù phần còn lại. Phần mềm bỏ qua những chi tiết đó thì dù tính đúng vẫn không ai dùng."
  },
  {
   "maApp": "auto-khvt",
   "thuTu": 9,
   "tieuDe": "Kho phải có sơ đồ, không chỉ có con số",
   "noiDung": "Thủ kho không tìm hàng bằng con số tồn, họ tìm bằng mắt và bằng trí nhớ vị trí. Vì vậy bản V7 thêm sơ đồ kho: khai các dãy kệ rồi kéo – thả từng lô vào đúng ô của nó, gõ một mã lô là ra ngay vị trí, hạn dùng và toàn bộ lịch sử nhập xuất. Có một luật tôi đặt ra và giữ chặt khi làm phần này: sơ đồ không bao giờ được báo nhiều hơn tồn thật. Thà sơ đồ hiển thị thiếu một lô chưa kịp xếp chỗ, còn hơn để người ta ra kho lấy một thứ mà trên giấy có nhưng trong kệ không có."
  }
 ]
};

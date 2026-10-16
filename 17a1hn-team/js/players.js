/**
 * ==============================================================================
 * DỮ LIỆU ĐỘI BÓNG: ĐỘI TUYỂN ĐIỆN TỬ 17A1HN
 * ==============================================================================
 * File này lưu trữ toàn bộ nội dung của trang poster:
 * - Thông tin chung (tên đội, giải đấu, thời gian, địa điểm, logo, nhà tài trợ)
 * - Cấu hình hiển thị (số cột, bật/tắt số áo, kiểu ảnh giữ chỗ placeholder)
 * - Danh sách Ban huấn luyện (staff)
 * - Danh sách 15 Cầu thủ (players)
 * 
 * Lưu ý:
 * - Để dùng ảnh thật, hãy bỏ ảnh vào thư mục `assets/players/` và điền đường dẫn
 *   vào trường `photo` (Ví dụ: "assets/players/so-7-tuan-anh.jpg").
 * - Nếu để `photo: ""` thì hệ thống sẽ tự động dùng ảnh vector placeholder.
 * - Để thêm/xóa thành viên, chỉ cần thêm/bớt phần tử trong mảng `staff` hoặc `players`.
 * ==============================================================================
 */

const teamData = {
  // 1. THÔNG TIN CHUNG CỦA ĐỘI VÀ SỰ KIỆN
  teamName: "ĐỘI TUYỂN ĐIỆN TỬ 17A1HN",
  title: "Danh sách Đội tuyển Điện tử 17A1HN",
  subtitle: "Giải Bóng Đá Sinh Viên Khoa Điện Tử Và Kỹ Thuật Máy Tính Năm 2026",

  // Đường dẫn logo đội hiển thị ở đầu trang và ô đầu tiên của lưới
  headerLogo: "assets/Logo.jpg",
  teamLogo: "assets/Logo.jpg",
  // Dòng thông tin sự kiện hiển thị dưới lưới ảnh
  timeText: "",
  placeText: "",

  // 2. CẤU HÌNH GIAO DIỆN & TÍNH NĂNG (CONFIG)
  config: {
    columns: 5,               // Số cột trên màn hình desktop (mặc định: 5)
    showNumber: true,         // Bật/tắt hiển thị số áo ở đáy ảnh cầu thủ
    showRole: false,          // Bật/tắt hiển thị chức danh ban huấn luyện dưới ảnh (mặc định: false theo mẫu poster)
    showTeamLogoInGrid: false, // Bật/tắt ô logo trong lưới (đã tắt theo yêu cầu, chỉ hiện ở đầu trang)
    placeholderStyle: "studio" // Tùy chọn kiểu ảnh giữ chỗ: "studio" hoặc "silhouette"
  },

  // 3. NHÀ TÀI TRỢ & ĐỐI TÁC ĐỒNG HÀNH
  showSponsors: true, // Đặt false nếu muốn ẩn hoàn toàn dải trắng nhà tài trợ ở đáy
  sponsors: [],

  // 4. BAN HUẤN LUYỆN / GIÁO VIÊN HƯỚNG DẪN (Staff)
  // Ban huấn luyện không có số áo. Có thể để trống mảng [] nếu không có staff.
  staff: [],

  // 5. DANH SÁCH 15 CẦU THỦ (Players)
  // Lưu ý: Các tên dưới đây là TÊN MẪU (độ dài từ 2 đến 5 từ tiếng Việt) để kiểm tra layout căn chỉnh xoay dọc
  players: [
    {
      number: 7,
      name: "Hoàng Tiến Nhật",
      photo: "assets/Members/HoangTienNhat.jpg"
    },
    {
      number: 31,
      name: "Nguyễn Văn Sinh",
      photo: "assets/Members/NguyenVanSinh.jpg"
    },
    {
      number: 27,
      name: "Nguyễn Đức Anh Tuấn",
      photo: "assets/Members/NguyenDucAnhTuan.jpg"
    },
    {
      number: 9,
      name: "Nguyễn Huy Hân",
      photo: "assets/Members/NguyenHuyHan.jpg"
    },
    {
      number: 17,
      name: "Đỗ Văn Học",
      photo: "assets/Members/DoVanHoc.jpg"
    },
    {
      number: 19,
      name: "Ngô Huy Tùng",
      photo: "assets/Members/NgoHuyTung.jpg"
    },
    {
      number: 6,
      name: "Lê Anh Tuấn",
      photo: "assets/Members/LeAnhTuan.jpg"
    },
    {
      number: 11,
      name: "Khương Đình Dũng",
      photo: "assets/Members/KhuongDinhDung.jpg"
    },
    {
      number: 8,
      name: "Bùi Đức Anh",
      photo: "assets/Members/BuiDucAnh.jpg"
    },
    {
      number: 24,
      name: "Nguyễn Văn Trung",
      photo: "assets/Members/NguyenVanTrung.jpg"
    },
    {
      number: 18,
      name: "Trần Đăng Khoa",
      photo: "assets/Members/TranDangKhoa.jpg"
    },
    {
      number: 26,
      name: "Lại Đức Hưởng",
      photo: "assets/Members/LaiDucHuong.jpg"
    },
    {
      number: 10,
      name: "Đỗ Duy Thái",
      photo: "assets/Members/DoDuyThai.jpg"
    },
    {
      number: 3,
      name: "Phạm Anh Sơn",
      photo: "assets/Members/PhamAnhSon.jpg"
    },
    {
      number: 12,
      name: "Đinh Mạnh Phúc",
      photo: "assets/Members/DinhManhPhuc.jpg"
    }
  ]
};

// Đảm bảo dữ liệu gắn vào window để truy cập toàn cục khi mở dạng file://
if (typeof window !== "undefined") {
  window.teamData = teamData;
}

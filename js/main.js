/**
 * ==============================================================================
 * JAVASCRIPT ĐIỀU KHIỂN & RENDER GIAO DIỆN POSTER ĐỘI BÓNG 17A1HN
 * ==============================================================================
 * Chức năng:
 * 1. Tự động đọc dữ liệu từ biến `teamData` (trong js/players.js)
 * 2. Đổ dữ liệu vào Header (logo, title, subtitle)
 * 3. Render lưới thẻ theo thứ tự: [Ô Logo Đội] -> [Ban huấn luyện] -> [Cầu thủ]
 * 4. Xử lý ảnh giữ chỗ thông minh: chọn placeholder-player.svg, placeholder-staff.svg
 *    hoặc placeholder-silhouette.svg theo cấu hình config.placeholderStyle
 * 5. Tự động tính toán co giãn cỡ chữ tên dọc (JS Auto-fit) để không tràn khung ảnh
 * 6. Hiển thị thông tin sự kiện (thời gian, địa điểm) và dải logo nhà tài trợ ở đáy
 * 7. Hiệu ứng cuộn mượt (Scroll Reveal) bằng IntersectionObserver
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  // Kiểm tra an toàn biến dữ liệu teamData
  if (typeof teamData === "undefined") {
    console.error("Lỗi: Không tìm thấy dữ liệu `teamData`. Vui lòng kiểm tra file js/players.js!");
    return;
  }

  // Khởi tạo các thành phần giao diện
  renderHeader(teamData);
  renderGrid(teamData);
  renderEventInfo(teamData);
  renderSponsors(teamData);

  // Kích hoạt auto-fit chữ xoay dọc & hiệu ứng cuộn trang
  setupNameAutoFit();
  setupScrollReveal();

  // Lắng nghe thay đổi kích thước cửa sổ để tính toán lại cỡ chữ
  let resizeTimer = null;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      adjustAllNameSizes();
    }, 150);
  });
});

/**
 * ------------------------------------------------------------------------------
 * 1. RENDER ĐẦU TRANG (HEADER)
 * ------------------------------------------------------------------------------
 */
function renderHeader(data) {
  const headerContainer = document.getElementById("poster-header");
  if (!headerContainer) return;

  // Cập nhật tiêu đề trang web (thẻ <title>)
  if (data.title) {
    document.title = `${data.title} | ${data.teamName || "17A1HN"}`;
  }

  const logoSrc = data.headerLogo || "assets/logo.svg";
  const titleText = data.title || "Danh sách Đội tuyển";
  const subtitleText = data.subtitle || "";

  headerContainer.innerHTML = `
    <div class="header-logo-wrapper" title="${escapeHtml(data.teamName || 'Logo Đội')}">
      <img src="${escapeHtml(logoSrc)}" alt="Logo ${escapeHtml(data.teamName || '')}" class="header-logo-img" onerror="this.onerror=null; this.src='assets/logo.svg';">
    </div>
    <h1 class="poster-title">${escapeHtml(titleText)}</h1>
    ${subtitleText ? `<p class="poster-subtitle">${escapeHtml(subtitleText)}</p>` : ""}
  `;
}

/**
 * ------------------------------------------------------------------------------
 * 2. RENDER LƯỚI THÀNH VIÊN (GRID)
 * Thứ tự: [Ô Logo Đội] -> [Ban huấn luyện (staff)] -> [Cầu thủ (players)]
 * ------------------------------------------------------------------------------
 */
function renderGrid(data) {
  const gridContainer = document.getElementById("team-grid");
  if (!gridContainer) return;

  const config = data.config || {};
  const showNumber = config.showNumber !== false; // Mặc định true
  const showRole = config.showRole === true;      // Mặc định false
  const placeholderStyle = config.placeholderStyle || "studio"; // "studio" hoặc "silhouette"

  let htmlItems = [];
  let itemIndex = 0; // Dùng để tạo độ trễ hoạt ảnh so le (stagger delay)

  // 2.1. Ô ĐẦU TIÊN: LOGO ĐỘI (Chỉ render nếu config.showTeamLogoInGrid = true)
  if (config.showTeamLogoInGrid === true) {
    const teamLogoSrc = data.teamLogo || "assets/Logo.jpg";
    htmlItems.push(`
      <li class="team-grid-item team-logo-card reveal-item" style="--delay-index: ${itemIndex++};">
        <div class="logo-spacer" aria-hidden="true"></div>
        <div class="logo-box-inner" title="${escapeHtml(data.teamName || 'Logo Đội tuyển')}">
          <img src="${escapeHtml(teamLogoSrc)}" alt="Logo ${escapeHtml(data.teamName || '')}" class="big-team-logo" loading="lazy" onerror="this.onerror=null; this.src='assets/logo.svg';">
          <span class="logo-box-caption">${escapeHtml(data.teamName || "17A1HN")}</span>
        </div>
      </li>
    `);
  }

  // 2.2. BAN HUẤN LUYỆN (STAFF)
  if (Array.isArray(data.staff) && data.staff.length > 0) {
    data.staff.forEach((member) => {
      // Xác định ảnh: ảnh thật hoặc ảnh giữ chỗ ban huấn luyện
      let photoSrc = member.photo && member.photo.trim() !== "" ? member.photo : "";
      if (!photoSrc) {
        photoSrc = placeholderStyle === "silhouette" 
          ? "assets/placeholder-silhouette.svg" 
          : "assets/placeholder-staff.svg";
      }

      htmlItems.push(`
        <li class="team-grid-item person-card reveal-item" data-type="staff" style="--delay-index: ${itemIndex++};">
          <div class="person-name-col">
            <span class="person-name">${escapeHtml(member.name)}</span>
          </div>
          <div class="person-photo-wrapper">
            <img src="${escapeHtml(photoSrc)}" alt="${escapeHtml(member.name)}${member.role ? ' - ' + escapeHtml(member.role) : ''}" class="person-img" loading="lazy">
          </div>
          ${showRole && member.role ? `<span class="person-role">${escapeHtml(member.role)}</span>` : ""}
        </li>
      `);
    });
  }

  // 2.3. CẦU THỦ (PLAYERS)
  if (Array.isArray(data.players) && data.players.length > 0) {
    data.players.forEach((player) => {
      // Xác định ảnh: ảnh thật hoặc ảnh giữ chỗ cầu thủ
      let photoSrc = player.photo && player.photo.trim() !== "" ? player.photo : "";
      if (!photoSrc) {
        photoSrc = placeholderStyle === "silhouette" 
          ? "assets/placeholder-silhouette.svg" 
          : "assets/placeholder-player.svg";
      }

      const defaultPlaceholder = placeholderStyle === "silhouette" 
        ? "assets/placeholder-silhouette.svg" 
        : "assets/placeholder-player.svg";

      const hasNumber = showNumber && (player.number !== undefined && player.number !== null && player.number !== "");

      htmlItems.push(`
        <li class="team-grid-item person-card reveal-item" data-type="player" style="--delay-index: ${itemIndex++};">
          <div class="person-name-col">
            <span class="person-name">${escapeHtml(player.name)}</span>
          </div>
          <div class="person-photo-wrapper">
            <img src="${escapeHtml(photoSrc)}" alt="${escapeHtml(player.name)}${hasNumber ? ' - Số ' + player.number : ''}" class="person-img" loading="lazy" onerror="this.onerror=null; this.src='${defaultPlaceholder}';">
            ${hasNumber ? `<span class="jersey-number">${player.number}</span>` : ""}
          </div>
        </li>
      `);
    });
  }

  gridContainer.innerHTML = htmlItems.join("");
}

/**
 * ------------------------------------------------------------------------------
 * 3. RENDER THÔNG TIN SỰ KIỆN (TIME & PLACE)
 * ------------------------------------------------------------------------------
 */
function renderEventInfo(data) {
  const eventContainer = document.getElementById("event-info");
  if (!eventContainer) return;

  const timeText = data.timeText || "";
  const placeText = data.placeText || "";

  // Nếu cả hai đều rỗng thì ẩn hàng thông tin
  if (!timeText && !placeText) {
    eventContainer.style.display = "none";
    return;
  }

  eventContainer.innerHTML = `
    ${timeText ? `
      <div class="event-info-item">
        <!-- SVG Icon Lịch sự kiện -->
        <svg class="event-info-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z"/>
        </svg>
        <span>${escapeHtml(timeText)}</span>
      </div>
    ` : ""}
    ${placeText ? `
      <div class="event-info-item">
        <!-- SVG Icon Địa điểm ghim -->
        <svg class="event-info-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <span>${escapeHtml(placeText)}</span>
      </div>
    ` : ""}
  `;
}

/**
 * ------------------------------------------------------------------------------
 * 4. RENDER DẢI TRẮNG TÀI TRỢ Ở ĐÁY (SPONSORS FOOTER)
 * ------------------------------------------------------------------------------
 */
function renderSponsors(data) {
  const sponsorsFooter = document.getElementById("sponsors-footer");
  if (!sponsorsFooter) return;

  // Nếu showSponsors = false hoặc không có danh sách tài trợ thì ẩn toàn bộ dải
  if (data.showSponsors === false || !Array.isArray(data.sponsors) || data.sponsors.length === 0) {
    sponsorsFooter.style.display = "none";
    return;
  }

  const sponsorsInner = sponsorsFooter.querySelector(".sponsors-inner");
  if (!sponsorsInner) return;

  const sponsorsHtml = data.sponsors.map((sponsor) => `
    <div class="sponsor-item" title="${escapeHtml(sponsor.name || 'Nhà tài trợ')}">
      <img src="${escapeHtml(sponsor.logo)}" alt="${escapeHtml(sponsor.name || 'Logo tài trợ')}" class="sponsor-logo" loading="lazy">
    </div>
  `).join("");

  sponsorsInner.innerHTML = sponsorsHtml;
  sponsorsFooter.style.display = "block";
}

/**
 * ------------------------------------------------------------------------------
 * 5. TỰ ĐỘNG THU NHỎ CỠ CHỮ TÊN DỌC (JS AUTO-FIT)
 * Đảm bảo tên dài (4-5 từ tiếng Việt) không vượt quá chiều cao ảnh & không bị cắt
 * ------------------------------------------------------------------------------
 */
function setupNameAutoFit() {
  // Thực hiện ngay sau khi DOM sẵn sàng và một lần nữa sau khi ảnh tải xong
  adjustAllNameSizes();
  window.addEventListener("load", adjustAllNameSizes);
}

function adjustAllNameSizes() {
  const personCards = document.querySelectorAll(".person-card");
  
  personCards.forEach((card) => {
    const nameEl = card.querySelector(".person-name");
    const photoWrapper = card.querySelector(".person-photo-wrapper");
    if (!nameEl || !photoWrapper) return;

    // Chiều cao khả dụng dọc theo ảnh (trừ 8px khoảng thở trên dưới)
    const availableHeight = photoWrapper.clientHeight - 8;
    if (availableHeight <= 0) return;

    // Khôi phục cỡ chữ ban đầu
    nameEl.style.fontSize = "";
    nameEl.style.letterSpacing = "";
    nameEl.style.transform = "rotate(180deg)";

    // Lấy kích thước chữ mặc định được tính bởi CSS
    let currentFontSize = parseFloat(window.getComputedStyle(nameEl).fontSize) || 13;
    const minFontSize = 9.5; // Ngưỡng an toàn không để chữ quá bé

    // Đo chiều dài của chuỗi tên xoay dọc (dùng getBoundingClientRect để chính xác)
    let renderedHeight = nameEl.getBoundingClientRect().height;

    // Giảm dần cỡ chữ từng bước 0.4px cho đến khi vừa khít
    while (renderedHeight > availableHeight && currentFontSize > minFontSize) {
      currentFontSize -= 0.4;
      nameEl.style.fontSize = `${currentFontSize}px`;
      renderedHeight = nameEl.getBoundingClientRect().height;
    }

    // Nếu tên vẫn quá dài ở cỡ chữ tối thiểu (ví dụ màn hình điện thoại rất bé)
    // thì thu hẹp nhẹ khoảng cách ký tự (letter-spacing)
    if (renderedHeight > availableHeight) {
      nameEl.style.letterSpacing = "-0.2px";
      renderedHeight = nameEl.getBoundingClientRect().height;
    }

    // Biện pháp bảo vệ cuối cùng: thu nhỏ tỉ lệ nhẹ nếu vẫn chớm vượt
    if (renderedHeight > availableHeight) {
      const scaleFactor = Math.max(0.85, availableHeight / renderedHeight);
      nameEl.style.transform = `rotate(180deg) scale(${scaleFactor.toFixed(2)})`;
    }
  });
}

/**
 * ------------------------------------------------------------------------------
 * 6. HIỆU ỨNG CUỘN TRANG (INTERSECTION OBSERVER SCROLL REVEAL)
 * ------------------------------------------------------------------------------
 */
function setupScrollReveal() {
  // Kiểm tra nếu người dùng chọn chế độ giảm chuyển động
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".reveal-item").forEach((item) => {
      item.classList.add("is-visible");
    });
    return;
  }

  // Sử dụng IntersectionObserver để kích hoạt class .is-visible khi lướt tới
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // Chỉ chạy 1 lần
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px"
    });

    document.querySelectorAll(".reveal-item").forEach((item) => {
      observer.observe(item);
    });
  } else {
    // Trình duyệt cũ không hỗ trợ IntersectionObserver thì hiện luôn
    document.querySelectorAll(".reveal-item").forEach((item) => {
      item.classList.add("is-visible");
    });
  }
}

/**
 * Hàm hỗ trợ làm sạch chuỗi HTML chống XSS
 */
function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

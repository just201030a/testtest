const slider = document.getElementById("categoriesSlider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const cards = document.querySelectorAll(".category-card");

let currentIndex = 0;
let autoSlide = null;

let startX = 0;
let endX = 0;
let isTouching = false;

function getCardsPerView() {
  if (window.innerWidth <= 600) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}

function getGap() {
  return window.innerWidth <= 600 ? 0 : 18;
}

function getMaxIndex() {
  return Math.max(0, cards.length - getCardsPerView());
}

function updateSlider(withAnimation = true) {
  if (!slider || !cards.length) return;

  const cardWidth = cards[0].offsetWidth;
  const gap = getGap();

  slider.style.transition = withAnimation ? "transform 0.45s ease" : "none";
  slider.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
}

function goNext() {
  const maxIndex = getMaxIndex();

  if (currentIndex >= maxIndex) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }

  updateSlider();
}

function goPrev() {
  const maxIndex = getMaxIndex();

  if (currentIndex <= 0) {
    currentIndex = maxIndex;
  } else {
    currentIndex--;
  }

  updateSlider();
}

function stopAutoSlide() {
  clearInterval(autoSlide);
  autoSlide = null;
}

function startAutoSlide() {
  stopAutoSlide();

  if (window.innerWidth <= 600) return;

  autoSlide = setInterval(() => {
    goNext();
  }, 4000);
}

/* BUTTONS */
if (nextBtn) {
  nextBtn.addEventListener("click", goNext);
}

if (prevBtn) {
  prevBtn.addEventListener("click", goPrev);
}

/* DESKTOP HOVER PAUSE */
if (slider) {
  slider.addEventListener("mouseenter", () => {
    if (window.innerWidth > 600) {
      stopAutoSlide();
    }
  });

  slider.addEventListener("mouseleave", () => {
    if (window.innerWidth > 600) {
      startAutoSlide();
    }
  });
}

/* MOBILE SWIPE */
if (slider) {
  slider.addEventListener(
    "touchstart",
    (e) => {
      if (window.innerWidth > 600) return;

      startX = e.touches[0].clientX;
      endX = startX;
      isTouching = true;
      stopAutoSlide();
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchmove",
    (e) => {
      if (!isTouching || window.innerWidth > 600) return;
      endX = e.touches[0].clientX;
    },
    { passive: true }
  );

  slider.addEventListener(
    "touchend",
    () => {
      if (!isTouching || window.innerWidth > 600) return;

      const diffX = startX - endX;

      if (Math.abs(diffX) > 50) {
        if (diffX > 0) {
          goNext();
        } else {
          goPrev();
        }
      }

      isTouching = false;
      startX = 0;
      endX = 0;
    },
    { passive: true }
  );
}

/* IMPORTANT FIX: do NOT reset to first slide on resize */
window.addEventListener("resize", () => {
  const maxIndex = getMaxIndex();

  if (currentIndex > maxIndex) {
    currentIndex = maxIndex;
  }

  updateSlider(false);
  startAutoSlide();

  /* CLOSE MENUS ON RESIZE */
  closeDesktopMegaMenu();
  closeMobileMenu();
});

/* START */
updateSlider(false);
startAutoSlide();

/* ANNOUNCEMENT BAR */
const announceSlider = document.getElementById("announcementSlider");
const announceItems = document.querySelectorAll(".announcement-item");
const announceNext = document.getElementById("announceNext");
const announcePrev = document.getElementById("announcePrev");

let announceIndex = 0;
let announceAuto = null;

function updateAnnouncement() {
  if (!announceSlider || !announceItems.length) return;
  announceSlider.style.transform = `translateX(-${announceIndex * 100}%)`;
}

function stopAnnouncementAuto() {
  clearInterval(announceAuto);
  announceAuto = null;
}

function startAnnouncementAuto() {
  stopAnnouncementAuto();

  announceAuto = setInterval(() => {
    announceIndex++;

    if (announceIndex >= announceItems.length) {
      announceIndex = 0;
    }

    updateAnnouncement();
  }, 4000);
}

if (announceNext) {
  announceNext.addEventListener("click", () => {
    announceIndex++;

    if (announceIndex >= announceItems.length) {
      announceIndex = 0;
    }

    updateAnnouncement();
  });
}

if (announcePrev) {
  announcePrev.addEventListener("click", () => {
    announceIndex--;

    if (announceIndex < 0) {
      announceIndex = announceItems.length - 1;
    }

    updateAnnouncement();
  });
}

const announcementBar = document.querySelector(".announcement-bar");

if (announcementBar) {
  announcementBar.addEventListener("mouseenter", stopAnnouncementAuto);
  announcementBar.addEventListener("mouseleave", startAnnouncementAuto);
}

startAnnouncementAuto();

/* MENUS */
const hamburger = document.querySelector(".menu-icon");
const megaMenu = document.querySelector(".mega-menu");

const mobileMenu = document.querySelector(".mobile-menu");
const mobileOverlay = document.querySelector(".mobile-overlay");
const closeMenuBtn = document.getElementById("closeMenuBtn");

/* DESKTOP MENU HELPERS */
function closeDesktopMegaMenu() {
  if (megaMenu) megaMenu.classList.remove("active");

  if (hamburger && window.innerWidth > 768) {
    hamburger.classList.remove("active");
  }
}

/* MOBILE MENU HELPERS */
function openMobileMenu() {
  if (!mobileMenu || !mobileOverlay) return;

  mobileMenu.classList.add("active");
  mobileOverlay.classList.add("active");

  if (hamburger) {
    hamburger.classList.add("active");
  }

  document.body.classList.add("menu-open");
}

function closeMobileMenu() {
  if (mobileMenu) {
    mobileMenu.classList.remove("active");
  }

  if (mobileOverlay) {
    mobileOverlay.classList.remove("active");
  }

  if (hamburger && window.innerWidth <= 768) {
    hamburger.classList.remove("active");
  }

  document.body.classList.remove("menu-open");
}

/* DESKTOP MEGA MENU */
if (hamburger && megaMenu) {
  hamburger.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) return;

    e.stopPropagation();

    megaMenu.classList.toggle("active");
    hamburger.classList.toggle("active");
  });

  megaMenu.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) return;
    e.stopPropagation();
  });

  document.addEventListener("click", () => {
    if (window.innerWidth <= 768) return;
    closeDesktopMegaMenu();
  });
}

/* MOBILE MENU OPEN */
if (hamburger && mobileMenu) {
  hamburger.addEventListener("click", (e) => {
    if (window.innerWidth > 768) return;

    e.stopPropagation();

    if (mobileMenu.classList.contains("active")) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  mobileMenu.addEventListener("click", (e) => {
    e.stopPropagation();
  });
}

/* MOBILE OVERLAY CLOSE */
if (mobileOverlay) {
  mobileOverlay.addEventListener("click", closeMobileMenu);
}

/* MOBILE CLOSE BUTTON */
if (closeMenuBtn) {
  closeMenuBtn.addEventListener("click", closeMobileMenu);
}
/* BRANDS COMBO BOX */

const comboToggle = document.querySelector(".combo-toggle");

if (comboToggle) {
comboToggle.addEventListener("click", function () {

const parent = this.closest(".mobile-menu-group");

parent.classList.toggle("active");

});
}
const findusToggle = document.querySelector(".findus-toggle");
const findusMenu = document.querySelector(".findus-submenu");

if(findusToggle){
findusToggle.addEventListener("click",function(e){

e.preventDefault();
findusMenu.classList.toggle("active");

});
}
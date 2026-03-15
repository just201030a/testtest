const slider = document.getElementById("categoriesSlider");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const cards = document.querySelectorAll(".category-card");

let currentIndex = 0;

function getCardsPerView() {

  if (window.innerWidth <= 600) {
    return 1;
  }

  if (window.innerWidth <= 900) {
    return 2;
  }

  return 3;
}
/* ANNOUNCEMENT BAR SLIDER */

const announceSlider = document.getElementById("announcementSlider");
const announceItems = document.querySelectorAll(".announcement-item");
const announceNext = document.getElementById("announceNext");
const announcePrev = document.getElementById("announcePrev");

let announceIndex = 0;
let announceAuto;

function updateAnnouncement(){
announceSlider.style.transform =
`translateX(-${announceIndex * 100}%)`;
}

announceNext.addEventListener("click",()=>{
announceIndex++;

if(announceIndex >= announceItems.length){
announceIndex = 0;
}

updateAnnouncement();
});

announcePrev.addEventListener("click",()=>{
announceIndex--;

if(announceIndex < 0){
announceIndex = announceItems.length - 1;
}

updateAnnouncement();
});

function startAnnouncementAuto(){

announceAuto = setInterval(()=>{

announceIndex++;

if(announceIndex >= announceItems.length){
announceIndex = 0;
}

updateAnnouncement();

},4000);

}

document.querySelector(".announcement-bar").addEventListener("mouseenter",()=>{
clearInterval(announceAuto);
});

document.querySelector(".announcement-bar").addEventListener("mouseleave",()=>{
startAnnouncementAuto();
});

startAnnouncementAuto();
function updateSlider() {

  const cardWidth = cards[0].offsetWidth;
  const gap = 18;
  const maxIndex = cards.length - getCardsPerView();

  if (currentIndex < 0) {
    currentIndex = 0;
  }

  if (currentIndex > maxIndex) {
    currentIndex = maxIndex;
  }

  slider.style.transform =
    `translateX(-${currentIndex * (cardWidth + gap)}px)`;
}

nextBtn.addEventListener("click", () => {
  currentIndex++;
  updateSlider();
});

prevBtn.addEventListener("click", () => {
  currentIndex--;
  updateSlider();
});

window.addEventListener("resize", updateSlider);

updateSlider();


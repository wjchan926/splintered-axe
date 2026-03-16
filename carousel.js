const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

let slideWidth = 0;
let index = slides.length; // start at first original slide after prep
let autoplay;

// Clone slides for infinite effect
function cloneSlides() {
  slides.forEach(slide => {
    const cloneFirst = slide.cloneNode(true);
    cloneFirst.classList.add("clone");
    track.appendChild(cloneFirst);
    
    const cloneLast = slide.cloneNode(true);
    cloneLast.classList.add("clone");
    track.insertBefore(cloneLast, track.firstChild);
  });
}

// Update slide width
function updateSlideWidth() {
  slideWidth = slides[0].offsetWidth + 20; // 20 = gap
  track.style.transform = `translateX(${-index * slideWidth}px)`;
}

// Move slides
function moveToSlide(newIndex) {
  index = newIndex;
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(${-index * slideWidth}px)`;
}

// Next / Prev functions
function nextSlide() {
  moveToSlide(index + 1);
}
function prevSlide() {
  moveToSlide(index - 1);
}

// Buttons
nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Autoplay
function startAutoplay() {
  autoplay = setInterval(nextSlide, 3000);
}
function stopAutoplay() {
  clearInterval(autoplay);
}

// Pause on hover
track.addEventListener("mouseenter", stopAutoplay);
track.addEventListener("mouseleave", startAutoplay);

// Touch swipe
let startX = 0;
track.addEventListener("touchstart", e => startX = e.touches[0].clientX);
track.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) nextSlide();
  if (endX - startX > 50) prevSlide();
});

// Infinite loop fix after transition ends
track.addEventListener("transitionend", () => {
  const slidesAll = Array.from(track.children);
  if (slidesAll[index].classList.contains("clone")) {
    if (index >= slidesAll.length / 2) {
      index = slides.length; // jump to first original
    } else if (index < slides.length) {
      index = slides.length * 2 - 1; // jump to last original
    }
    track.style.transition = "none";
    track.style.transform = `translateX(${-index * slideWidth}px)`;
  }
});

// Initialize
window.addEventListener("load", () => {
  cloneSlides();
  updateSlideWidth();
  startAutoplay();
});

// Recalculate on resize
window.addEventListener("resize", updateSlideWidth);
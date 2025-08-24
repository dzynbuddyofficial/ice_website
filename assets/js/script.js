// Mobile menu toggle
const menuBtn = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("menu-open");      // animate hamburger → X
  mobileMenu.classList.toggle("hidden");      // toggle full screen menu
});

// --- Simple One-Slide Testimonial Slider ---
(function initTestimonialsSlider() {
  const slider = document.querySelector(".ts-slider");
  if (!slider) return;

  const track = slider.querySelector(".ts-track");
  const slides = Array.from(slider.querySelectorAll(".ts-slide"));
  const prevBtn = slider.querySelector(".ts-prev");
  const nextBtn = slider.querySelector(".ts-next");
  const dotsWrap = slider.querySelector(".ts-dots");

  let index = 0;
  const total = slides.length;

  // Build dots
  function buildDots() {
    dotsWrap.innerHTML = "";
    for (let i = 0; i < total; i++) {
      const d = document.createElement("button");
      d.className = "ts-dot";
      d.addEventListener("click", () => goTo(i));
      dotsWrap.appendChild(d);
    }
  }

  function goTo(i) {
    index = (i + total) % total;
    const shift = index * 100; // move full width
    track.style.transform = `translateX(-${shift}%)`;
    updateDots();
  }

  function updateDots() {
    const dots = dotsWrap.querySelectorAll(".ts-dot");
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }

  prevBtn.addEventListener("click", () => goTo(index - 1));
  nextBtn.addEventListener("click", () => goTo(index + 1));

  // Autoplay
  let autoplayId = null;
  function startAutoplay() {
    stopAutoplay();
    autoplayId = setInterval(() => goTo(index + 1), 4000);
  }
  function stopAutoplay() { if (autoplayId) clearInterval(autoplayId); }
  slider.addEventListener("mouseenter", stopAutoplay);
  slider.addEventListener("mouseleave", startAutoplay);

  // Init
  buildDots();
  goTo(0);
  startAutoplay();
})();






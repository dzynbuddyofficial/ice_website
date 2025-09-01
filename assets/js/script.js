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



// Swiper
function initSwiper(selector, prevBtn, nextBtn) {
  return new Swiper(selector, {
    effect: 'coverflow',
    centeredSlides: true,
    slidesPerView: 'auto',
    spaceBetween: -35,
    loop: false,
    grabCursor: true,
    speed: 420,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 120,
      modifier: 1.1,
      slideShadows: false,
    },
    navigation: {
      nextEl: nextBtn,
      prevEl: prevBtn,
    },
  });
}

window.addEventListener('load', () => {
  initSwiper('.burger-swiper', '.burger-prev', '.burger-next');
  initSwiper('.pizza-swiper', '.pizza-prev', '.pizza-next');
  initSwiper('.crispy-swiper', '.crispy-prev', '.crispy-next');
  initSwiper('.veg-swiper', '.veg-prev', '.veg-next');
  initSwiper('.meals-swiper', '.meals-prev', '.meals-next');
  initSwiper('.drinks-swiper', '.drinks-prev', '.drinks-next');
  initSwiper('.shakes-swiper', '.shakes-prev', '.shakes-next');
  initSwiper('.dips-swiper', '.dips-prev', '.dips-next');
});


// QUIZ QUESTIONS & RESULT GENERATOR
const quizData = [
  {
    question: "What’s your vibe today?",
    options: ["🎉 Party Mode", "😎 Chill", "🤩 Hungry Beast", "👨‍👩‍👧 Family Time"],
    mapping: ["burger", "burger", "chicken", "pizza"]
  },
  {
    question: "Pick your flavor style:",
    options: ["🌶 Spicy & Bold", "🍯 Sweet & Cheesy", "🍗 Crispy & Classic", "🍔 Loaded & Juicy"],
    mapping: ["chicken", "pizza", "chicken", "burger"]
  },
  {
    question: "Who are you eating with?",
    options: ["👫 Friends", "👨‍👩‍👧 Family", "🚶 Solo snack attack", "🎊 Big celebration"],
    mapping: ["burger", "pizza", "chicken", "burger"]
  },
  {
    question: "What’s your ideal speed of food?",
    options: ["⚡ Fast & filling", "🍹 Slow & chill", "🍽 Big meal, no rush", "🎶 Snacky & casual"],
    mapping: ["chicken", "pizza", "burger", "snacks"]
  },
  {
    question: "What type of foodie are you?",
    options: ["🤠 Adventurer", "🛠 Classic Lover", "🧑‍🎨 Creative", "👑 Comfort Food Royalty"],
    mapping: ["snacks", "chicken", "burger", "pizza"]
  }
];

// Results
const results = {
  burger: {
    title: "🍔 Burger Buddy",
    img: "assets/images/menu/burgerExp.png",
    desc: "You’re all about fun and flavor! Loaded, juicy, and perfect for every chill vibe.",
    menu: "Crispy Burger, ICE Special Jumbo Burger, Peri Peri Fries, Blue Caracao"
  },
  pizza: {
    title: "🍕 Pizza Soul",
    img: "assets/images/menu/pizzaExp.png",
    desc: "Warm, cheesy, and perfect for sharing. You’re the heart of every family table.",
    menu: "Chicken Maharaja Pizza, Paneer Masti Pizza, French Fries, Mint Lime"
  },
  chicken: {
    title: "🍗 Crispy Chicken Hero",
    img: "assets/images/menu/crispyExp.png",
    desc: "Bold and energetic, you bring the crunch wherever you go!",
    menu: "Chicken Hot Wings, Hot & Crispy Chicken, French Fries, Green Apple"
  },
  snacks: {
    title: "🍟 Snack Explorer",
    img: "assets/images/menu/snacksExp.png",
    desc: "Always trying new combos, you’re adventurous and love mixing it up.",
    menu: "Chicken Popcorn Pizza, Peri Peri Fries, Chicken Popcorn, Spicy Mango"
  }
};

// State
let currentQuestion = 0;
let answers = [];

// Elements
const startBtn = document.getElementById("startQuiz");
const quizSection = document.getElementById("quizSection");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const resultSection = document.getElementById("resultSection");
const resultTitle = document.getElementById("resultTitle");
const resultImage = document.getElementById("resultImage");
const resultDescription = document.getElementById("resultDescription");
const menuItems = document.getElementById("menuItems");

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  document.querySelector("section").classList.add("hidden"); // hide hero
  quizSection.classList.remove("hidden");
  currentQuestion = 0;
  answers = [];
  loadQuestion();
}

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "bg-[var(--ice-yellow)] hover:bg-[var(--ice-red)] hover:text-white transition px-4 py-3 rounded-lg font-semibold";
    btn.onclick = () => selectAnswer(q.mapping[i]);
    optionsEl.appendChild(btn);
  });
}

function selectAnswer(value) {
  answers.push(value);
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizSection.classList.add("hidden");
  resultSection.classList.remove("hidden");

  // Count answers → pick most frequent
  const freq = {};
  answers.forEach(ans => freq[ans] = (freq[ans] || 0) + 1);
  const resultKey = Object.keys(freq).reduce((a, b) => freq[a] > freq[b] ? a : b);

  const res = results[resultKey];
  resultTitle.textContent = res.title;
  resultImage.src = res.img;
  resultDescription.textContent = res.desc;
  menuItems.textContent = res.menu;
}




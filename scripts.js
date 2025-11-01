async function loadPart(id, file) {
  const response = await fetch(file);
  const text = await response.text();
  document.getElementById(id).innerHTML = text;
}

// ✅ New: function to load styles into the <head>
async function loadFonts(file) {
  const response = await fetch(file);
  const text = await response.text();
  document.head.insertAdjacentHTML('beforeend', text);
}

window.addEventListener('DOMContentLoaded', () => {
  loadPart('site-header', 'header.html');
  loadPart('site-footer', 'footer.html');
  loadFonts('fonts.html'); // ✅ Load your font styles
});

// -----------------------------
// Carousel functionality
// -----------------------------
let currentSlide = 0;

function showSlide(index) {
  const slides = document.querySelectorAll("#carousel .slide");
  if (!slides.length) return; // do nothing if no carousel on page
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? "block" : "none";
  });
}

function nextSlide() {
  const slides = document.querySelectorAll("#carousel .slide");
  if (!slides.length) return;
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  const slides = document.querySelectorAll("#carousel .slide");
  if (!slides.length) return;
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

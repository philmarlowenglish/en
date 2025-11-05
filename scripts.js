// -----------------------------
// Load header, footer, and fonts
// -----------------------------
async function loadPart(id, file) {
  const response = await fetch(file);
  const text = await response.text();
  document.getElementById(id).innerHTML = text;
}

// ✅ Load styles (fonts.html)
async function loadFonts(file) {
  const response = await fetch(file);
  const text = await response.text();
  document.head.insertAdjacentHTML('beforeend', text);
}

// ✅ New: Global site-wide styles
function loadGlobalStyles() {
  const styles = `
    body {
      font-family: 'Open Sans', sans-serif;
      margin: 0;
      background-color: #ffffff;
      color: #000000;
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    main {
      width: 100%;
      max-width: 100%;
      margin: auto;
      padding: 1em;
    }

    /* Desktop and tablet view */
    @media (min-width: 768px) {
      main {
        width: 60%;
        max-width: 800px;
      }
    }

    h1, h2, h3 {
      font-family: 'Open Sans ExtraBold', sans-serif;
      margin-top: 1.5em;
    }

    p {
      line-height: 1.6;
      margin-bottom: 1em;
    }

    a {
      color: #0000aa;
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }
  `;

  const styleTag = document.createElement('style');
  styleTag.textContent = styles;
  document.head.appendChild(styleTag);
}

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

// -----------------------------
// Initialize everything on load
// -----------------------------
window.addEventListener('DOMContentLoaded', () => {
  loadPart('site-header', 'header.html');
  loadPart('site-footer', 'footer.html');
  loadFonts('fonts.html');   // ✅ Load font definitions
  loadGlobalStyles();        // ✅ Inject global styles
});

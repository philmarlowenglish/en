// -----------------------------
// Load header, footer, fonts, and reusable parts
// -----------------------------
async function loadPart(id, file) {
  const element = document.getElementById(id);
  if (!element) return; // ✅ If the target doesn't exist, skip (no errors)

  const response = await fetch(file);
  const text = await response.text();
  element.innerHTML = text;
}

// Load styles (fonts.html)
async function loadFonts(file) {
  const response = await fetch(file);
  const text = await response.text();
  document.head.insertAdjacentHTML('beforeend', text);
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".accordion-header").forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      
      // Toggle height
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
      }

      header.classList.toggle("open");
    });
  });
});

// -----------------------------
// Global site-wide styles
// -----------------------------
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
      padding: 1em;
      margin: 0 auto;
      box-sizing: border-box;
    }

    /* Desktop and tablet view */
    @media (min-width: 768px) {
      main {
        width: 85%;
        max-width: 800px;
      }
    }

    h1, h2, h3 {
      font-family: 'Open Sans ExtraBold', sans-serif;
      margin-top: 1em;
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

.accordion {
    margin-bottom: 1em;
    border-radius: 8px;
    border: 1px solid #ddd;
  }

  .accordion-header {
    width: 100%;
    text-align: left;
    padding: 1em;
    font-size: 1.1em;
    background: #f7f7f7;
    border: none;
    cursor: pointer;
  }

  .accordion-header.open {
    background: #eaeaea;
  }

  .accordion-content {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.25s ease-out;
    padding: 0 1em;
  }

  .accordion-content p {
    margin: 1em 0;
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
  if (!slides.length) return;
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
  loadPart('blog-bottom', 'blog-bottom.html');  // ✅ NEW reusable blog footer
  loadFonts('fonts.html');
  loadGlobalStyles();
});

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

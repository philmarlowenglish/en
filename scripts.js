async function loadPart(id, file) {
  const response = await fetch(file);
  const text = await response.text();
  document.getElementById(id).innerHTML = text;
}

window.addEventListener('DOMContentLoaded', () => {
  loadPart('site-header', 'header.html');
  loadPart('site-footer', 'footer.html');
});

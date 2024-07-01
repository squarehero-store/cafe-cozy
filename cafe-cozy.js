function loadCSS(url) {
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  document.head.appendChild(link);
}

function loadJS(url) {
  var script = document.createElement('script');
  script.src = url;
  document.body.appendChild(script);
}

// Load CSS file
loadCSS('https://cdn.jsdelivr.net/gh/squarehero-store/cafe-cozy@latest/cafe-cozy-010724-v1.css');

// Load additional JavaScript files if any
// loadJS('https://cdn.jsdelivr.net/gh/squarehero-store/cafe-cozy@latest/another-file.js');

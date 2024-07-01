function loadCSS(url) {
  console.log('Loading CSS:', url); // Logging
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.onload = function() {
    console.log('Loaded CSS:', url); // Logging
  };
  link.onerror = function() {
    console.error('Error loading CSS:', url); // Logging
  };
  document.head.appendChild(link);
}

function loadJS(url) {
  console.log('Loading JS:', url); // Logging
  var script = document.createElement('script');
  script.src = url;
  script.onload = function() {
    console.log('Loaded JS:', url); // Logging
  };
  script.onerror = function() {
    console.error('Error loading JS:', url); // Logging
  };
  document.body.appendChild(script);
}

// Load CSS file
loadCSS('https://cdn.jsdelivr.net/gh/squarehero-store/cafe-cozy/cafe-cozy-010724-v1.css');

// Load additional JavaScript files if any
loadJS('https://cdn.jsdelivr.net/gh/squarehero-store/cafe-cozy/cafe-cozy-commonscripts.min.js');

console.log('cafe-cozy.js script executed'); // Logging

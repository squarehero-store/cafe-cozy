function loadCSS(url) {
  console.log('Loading CSS:', url);
  var link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = url;
  link.onload = function() {
    console.log('Loaded CSS:', url);
    var applied = Array.from(document.styleSheets).some(sheet => sheet.href === url);
    console.log('CSS applied:', applied);
  };
  link.onerror = function() {
    console.error('Error loading CSS:', url);
  };
  document.head.appendChild(link);
}

function loadJS(url, callback) {
  console.log('Loading JS:', url);
  var script = document.createElement('script');
  script.src = url;
  script.async = true;
  script.onload = function() {
    console.log('Loaded JS:', url);
    if (callback) callback();
  };
  script.onerror = function() {
    console.error('Error loading JS:', url);
  };
  document.body.appendChild(script);
}

function initialize() {
  loadCSS('https://cdn.jsdelivr.net/gh/squarehero-store/cafe-cozy/cafe-cozy-010724-v1.css');
  loadJS('https://cdn.jsdelivr.net/gh/squarehero-store/cafe-cozy/cafe-cozy-commonscripts.min.js', function() {
    console.log('Callback executed after JS load');
  });
  console.log('cafe-cozy.js script executed');
}

if (document.readyState === 'loading' || document.readyState === 'interactive') {
  document.addEventListener('DOMContentLoaded', initialize);
} else {
  initialize();
}

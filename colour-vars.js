const fs = require('fs');
const path = require('path');

// Function to get the latest versioned CSS file
function getLatestVersionedCSSFile(directory) {
  const files = fs.readdirSync(directory);
  const cssFiles = files.filter(file => file.startsWith('customcss-') && file.endsWith('.css'));

  if (cssFiles.length === 0) {
    throw new Error('No versioned CSS files found.');
  }

  // Sort files by version number or timestamp
  cssFiles.sort((a, b) => {
    const versionA = a.match(/customcss-(\d+).css/)[1];
    const versionB = b.match(/customcss-(\d+).css/)[1];
    return versionB - versionA;
  });

  return cssFiles[0];
}

const directoryPath = path.join(__dirname);
const latestCSSFile = getLatestVersionedCSSFile(directoryPath);
const filePath = path.join(directoryPath, latestCSSFile);

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let result = data.replace(/#FCF4EB/gi, 'hsla(var(--white-hsl), 1)');
  result = result.replace(/#FCF5EB/gi, 'hsla(var(--lightAccent-hsl), 1)');
  result = result.replace(/#DD9833/gi, 'hsla(var(--accent-hsl), 1)');
  result = result.replace(/#616E30/gi, 'hsla(var(--darkAccent-hsl), 1)');
  result = result.replace(/#353C2E/gi, 'hsla(var(--black-hsl), 1)');

  fs.writeFile(filePath, result, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`CSS variables have been replaced successfully in ${latestCSSFile}!`);
  });
});

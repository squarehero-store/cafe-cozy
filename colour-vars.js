const fs = require('fs');
const path = require('path');

// Use the current directory since the script and CSS files are in the same folder
const directoryPath = __dirname;

// Template name
const templateName = 'cafe-cozy';

// Function to get the latest versioned CSS file
function getLatestVersionedCSSFile(directory, template) {
  const files = fs.readdirSync(directory);
  const cssFiles = files.filter(file => file.match(new RegExp(`^${template}-\\d{6}-v\\d+\\.css$`)));

  if (cssFiles.length === 0) {
    throw new Error('No versioned CSS files found.');
  }

  // Sort files by date and version number
  cssFiles.sort((a, b) => {
    const [dateA, versionA] = a.match(/(\d{6})-v(\d+)/).slice(1, 3).map(Number);
    const [dateB, versionB] = b.match(/(\d{6})-v(\d+)/).slice(1, 3).map(Number);

    if (dateA !== dateB) {
      return dateB - dateA; // Sort by date first
    }
    return versionB - versionA; // Then sort by version
  });

  return cssFiles[0];
}

const latestCSSFile = getLatestVersionedCSSFile(directoryPath, templateName);
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

const fs = require('fs');
const path = require('path');

// Use the current directory since the script and CSS files are in the same folder
const directoryPath = __dirname;

// Template name
const templateName = 'cafe-cozy';

// Function to get the CSS file with the template name
function getCSSFile(directory, template) {
  const files = fs.readdirSync(directory);
  const cssFile = files.find(file => file === `${template}.css`);

  if (!cssFile) {
    throw new Error('CSS file not found.');
  }

  return cssFile;
}

const cssFile = getCSSFile(directoryPath, templateName);
const filePath = path.join(directoryPath, cssFile);

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
    console.log(`CSS variables have been replaced successfully in ${cssFile}!`);
  });
});

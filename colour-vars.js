const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'customcss.css'); // Path to your compiled CSS file

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Replace color codes with CSS variables, using case-insensitive regex
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
    console.log('CSS variables have been replaced successfully!');
  });
});

# Squarehero Squarespace Colour Palette Script

This script is designed for Squarehero templates. It reads the latest versioned CSS file for a specific template, replaces certain hex color values with HSL-based CSS variables that link to the Squarespace color palette, and writes the modified content back to the file. This allows the colors in your CSS to dynamically change based on the Squarespace color settings.

## Setup

1. Ensure you have Node.js installed. If not, download and install it from [nodejs.org](https://nodejs.org/).

2. Place the script and the CSS files in the same directory.

## Usage

1. Open the directory containing your script and CSS files in VS Code.

2. Open a terminal in VS Code by selecting `Terminal > New Terminal` from the top menu.

5. In the terminal, navigate to the directory containing the `sqs-colour-palette.js` script (if not already there):

    ```bash
    cd path/to/your/directory
    ```

6. Run the script using Node.js:

    ```bash
    node sqs-colour-palette.js
    ```

## Notes

- The script looks for CSS files named in the format `templateName-YYMMDD-vX.css` where `YYMMDD` is the date and `vX` is the version number.
- The script replaces specific hex color values with HSL-based CSS variables linked to the Squarespace color palette. For example:
  - `#FCF4EB` -> `hsla(var(--white-hsl), 1)`
  - `#FCF5EB` -> `hsla(var(--lightAccent-hsl), 1)`
  - `#DD9833` -> `hsla(var(--accent-hsl), 1)`
  - `#616E30` -> `hsla(var(--darkAccent-hsl), 1)`
  - `#353C2E` -> `hsla(var(--black-hsl), 1)`

These are just examples. The specific colors and their replacements will vary from template to template.

By linking these colors to the Squarespace color palette, any changes made to the color settings in Squarespace will automatically update the corresponding colors in your CSS, ensuring consistency across your website.

## Troubleshooting

- Ensure your CSS files follow the naming convention `templateName-YYMMDD-vX.css`.
- Ensure Node.js is installed and properly configured on your machine.
- Check for any typos or errors in the script.

## License

This project is licensed under the MIT License.

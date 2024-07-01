console.log('cafe-cozy-commonscripts.min.js loaded');

document.addEventListener("DOMContentLoaded", () => {
  console.log('DOM fully loaded and parsed');

  // Setting the current year
  console.log('Setting the current year');
  const currentYearElement = document.querySelector(".current-year");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
    console.log('Current year set to:', currentYearElement.textContent);
  } else {
    console.log('Element with class .current-year not found');
  }

  // Fetching the website title
  console.log('Fetching site title');
  const siteJsonUrl = `${window.location.origin}/?format=json-pretty`;
  fetch(siteJsonUrl)
    .then(response => response.json())
    .then(data => {
      const siteTitle = data.website.siteTitle;
      const siteTitleElement = document.querySelector(".site-title");
      if (siteTitleElement) {
        siteTitleElement.textContent = siteTitle;
        console.log('Site title set to:', siteTitle);
      } else {
        console.log('Element with class .site-title not found');
      }
    })
    .catch(error => console.error("Error fetching site title:", error));

  // Adding section names
  console.log('Adding section names');
  var sections = document.querySelectorAll(".page-section");
  sections.forEach(function(section) {
    var sectionNameDiv = section.querySelector('div[data-squarehero="section-name"]');
    if (sectionNameDiv) {
      var sectionName = sectionNameDiv.getAttribute("sh-section");
      section.classList.add(sectionName);
      console.log('Section name added:', sectionName);
    } else {
      console.log('Element with data-squarehero="section-name" not found in section');
    }
  });
});

console.log('cafe-cozy-commonscripts.min.js script executed');

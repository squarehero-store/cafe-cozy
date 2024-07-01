/////// FOOTER COPYRIGHT ///////
document.addEventListener('DOMContentLoaded', () => {
    // Set the current year
    document.querySelector('.current-year').textContent = new Date().getFullYear();

    // Fetch the website title
    const siteJsonUrl = `${window.location.origin}/?format=json-pretty`;

    fetch(siteJsonUrl)
        .then(response => response.json())
        .then(data => {
            const siteTitle = data.website.siteTitle;
            document.querySelector('.site-title').textContent = siteTitle;
        })
        .catch(error => console.error('Error fetching site title:', error));
});

/////// SECTION CLASSES ///////
document.addEventListener("DOMContentLoaded", function() {
    // Get all sections on the page
    var sections = document.querySelectorAll(".page-section");

    // Loop through each section
    sections.forEach(function(section) {
        // Check if the section contains a div with data-squarehero="section-name"
        var savedDiv = section.querySelector('div[data-squarehero="section-name"]');
        
        // If a saved div is found, get the sh-section value and add it as a class to the section
        if (savedDiv) {
            var shSectionValue = savedDiv.getAttribute('sh-section');
            section.classList.add(shSectionValue);
        }
    });
});
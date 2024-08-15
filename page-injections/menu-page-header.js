// ===================================================
//   SquareHero Cafe Cozy: Menu -  Header Script
// ===================================================

document.addEventListener('DOMContentLoaded', function() {
    // Construct the JSON URL based on the current page URL
    const currentPageUrl = window.location.pathname;
    const jsonUrl = `${currentPageUrl}?format=json`;

    // Fetch the JSON data
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            // Extract the page title from collection.title
            const pageTitle = data.collection.title;

            // Create the h1 element
            const titleElem = document.createElement('h1');
            titleElem.textContent = pageTitle;
            titleElem.classList.add('gallery-title');

            // Append the h1 element to the gallery container
            const galleryContainer = document.querySelector('.gallery');
            if (galleryContainer) {
                galleryContainer.insertBefore(titleElem, galleryContainer.firstChild);
            }
        })
        .catch(error => console.error('Error fetching JSON:', error));
});

// Function to initialize the script
function initializeMenuPage() {
    // The main logic is already executed when the script loads
    console.log('Menu page script initialized');
}

// Export the initialization function
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    module.exports = { initializeMenuPage };
} else {
    window.initializeMenuPage = initializeMenuPage;
}
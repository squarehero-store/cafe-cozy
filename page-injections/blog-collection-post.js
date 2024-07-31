// ===================================================
//   SquareHero Cafe Cozy: Blog -  Post Script
// ===================================================
function initializeBlogPost() {
  // Get the current URL and append ?format=json
  const url = window.location.href + "?format=json";
  // Fetch the JSON data from the current URL
  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Extract the assetUrl from the JSON data
      const item = data.item;
      if (item && item.assetUrl) {
        const assetUrl = item.assetUrl;
        // Find the .blog-item-title div
        const blogItemTitleDiv = document.querySelector('.blog-item-title');
        if (blogItemTitleDiv && blogItemTitleDiv instanceof HTMLElement) {
          // Set the assetUrl as the background image
          blogItemTitleDiv.style.backgroundImage = `url(${assetUrl})`;
          blogItemTitleDiv.style.backgroundSize = 'cover';
          blogItemTitleDiv.style.backgroundPosition = 'center';
        }
      }
    })
    .catch(error => {
      console.error('Error fetching blog item data:', error);
    });

  // Add 'articles-page' class to body
  document.body.classList.add('articles-page');

  // Create a style element and append it to the head
  const style = document.createElement('style');
  style.textContent = `
    .collection-content-wrapper, .content-wrapper {
      padding-top: 0 !important;
    }
  `;
  document.head.appendChild(style);
}

// Make the function available globally
window.initializeBlogPost = initializeBlogPost;
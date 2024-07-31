// ===================================================
//   SquareHero Cafe Cozy: Find Us -  Post Script
// ===================================================
function addImageAndMapLink(location, imageUrl) {
  const wrapper = document.createElement('div');
  wrapper.className = 'location-wrapper';
  if (imageUrl) {
    const thumbnailImg = document.createElement('img');
    thumbnailImg.src = imageUrl;
    thumbnailImg.alt = 'Location thumbnail';
    thumbnailImg.className = 'location-thumbnail';
    wrapper.appendChild(thumbnailImg);
  }
  const mapButton = document.createElement('a');
  mapButton.className = 'sh-button map-link';
  mapButton.textContent = 'View on Google Maps';
  const address = encodeURIComponent(location.addressLine2);
  const mapUrl = `https://www.google.com/maps/place/${address}/@${location.mapLat},${location.mapLng},${location.mapZoom}z`;
  mapButton.href = mapUrl;
  mapButton.target = '_blank';
  mapButton.rel = 'noopener noreferrer';
  wrapper.appendChild(mapButton);
  return wrapper;
}

function displayLocationContent() {
  const randomParam = Math.random().toString(36).substring(7);
  const jsonUrl = `${window.location.href}?format=json&_=${randomParam}`;
  fetch(jsonUrl)
    .then(response => response.json())
    .then(data => {
      console.log('Fetched JSON data:', data);
      const item = data.item;
      if (item) {
        const location = item.location;
        const imageUrl = item.assetUrl;
        
        const blogItemWrapper = document.querySelector('article.entry');
        if (blogItemWrapper) {
          const locationWrapper = addImageAndMapLink(location, imageUrl);
          blogItemWrapper.appendChild(locationWrapper);
          console.log('Location content added to article.entry');
        } else {
          console.error('Element .blog-item-inner-wrapper not found.');
        }
      }
    })
    .catch(error => {
      console.error('Error fetching JSON data:', error);
    });
}

// Execute the function when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', displayLocationContent);
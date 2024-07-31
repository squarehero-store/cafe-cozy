// ===================================================
//   SquareHero Cafe Cozy: Find Us -  Header Script
// ===================================================
(function() {
  // Add the style to hide the page initially
  function addStyle() {
    const style = document.createElement('style');
    style.textContent = `
      #page {
        visibility: hidden;
      }
    `;
    document.head.appendChild(style);
  }

  function addEditModeMessage() {
    if (document.body.classList.contains('sqs-edit-mode')) {
      const firstSection = document.querySelector('#page .sections .page-section .content-wrapper');
      if (firstSection) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'edit-mode-message';
        
        const messageHeading = document.createElement('h3');
        messageHeading.textContent = "Hero Alert";
        
        const messageParagraph = document.createElement('p');
        messageParagraph.textContent = "This page will be hidden from visitors when there's only one location. Add multiple locations to make it visible.";
        
        messageDiv.appendChild(messageHeading);
        messageDiv.appendChild(messageParagraph);
        firstSection.insertBefore(messageDiv, firstSection.firstChild);
      }
    }
  }

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
    const mapLink = document.createElement('a');
    mapLink.className = 'map-link sh-button';
    mapLink.textContent = 'View on Google Maps';
    const address = encodeURIComponent(location.addressLine2);
    const mapUrl = `https://www.google.com/maps/place/${address}/@${location.mapLat},${location.mapLng},${location.mapZoom}z`;
    mapLink.href = mapUrl;
    mapLink.target = '_blank';
    mapLink.rel = 'noopener noreferrer';
    wrapper.appendChild(mapLink);
    return wrapper;
  }

  function checkItemCountAndDisplayContent() {
    const randomParam = Math.random().toString(36).substring(7);
    const jsonUrl = `${window.location.href}?format=json&_=${randomParam}`;
    fetch(jsonUrl)
      .then(response => response.json())
      .then(data => {
        console.log('Fetched JSON data:', data);
        const items = data.items;
        console.log('Items:', items);
        if (items.length === 1) {
          const bodyContent = items[0].body;
          const location = items[0].location;
          const imageUrl = items[0].assetUrl;
          console.log('Body content:', bodyContent);
          
          if (!document.body.classList.contains('sqs-edit-mode')) {
            displayBodyContent(bodyContent, location, imageUrl);
          } else {
            addEditModeMessage();
            showPage();
          }
        } else {
          showPage();
        }
      })
      .catch(error => {
        console.error('Error fetching JSON data:', error);
        showPage();
      });
  }

  function displayBodyContent(content, location, imageUrl) {
    const sectionsElement = document.querySelector('#page .sections');
    
    if (sectionsElement) {
      const newSection = document.createElement('section');
      newSection.className = 'page-section custom-content';
      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'content-wrapper';
      contentWrapper.innerHTML = content;
      const locationWrapper = addImageAndMapLink(location, imageUrl);
      contentWrapper.appendChild(locationWrapper);
      newSection.appendChild(contentWrapper);
      
      sectionsElement.querySelectorAll('.page-section:not(.custom-content)').forEach(section => {
        section.remove();
      });
      
      sectionsElement.appendChild(newSection);
      
      console.log('New custom page-section added and other sections removed.');
      showPage();
    } else {
      console.error('Element #page .sections not found.');
      showPage();
    }
  }

  function showPage() {
    document.getElementById('page').style.visibility = 'visible';
  }

  function init() {
    addStyle();
    document.body.classList.add('locations-collection');
    checkItemCountAndDisplayContent();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
// blog-list.js

(function() {
  document.addEventListener('DOMContentLoaded', function() {
    // Find the container div
    var container = document.querySelector('[data-squarehero="blog-list"]');
    
    if (!container) {
      console.error('Container div not found. Please add a div with data-squarehero="blog-list" to your page.');
      return;
    }
    // Check for the meta tag
    var metaTag = document.querySelector('meta[squarehero-feature="blog-page"]');
    
    if (!metaTag || metaTag.getAttribute('enabled') !== 'true') {
      // If meta tag is not present or not enabled, hide the entire container
      container.style.display = 'none';
      return;
    }
    // If we reach here, the meta tag is enabled
    var target = metaTag.getAttribute('target');
    var jsonUrl = '/' + target + '?format=json';
    // Fetch the JSON data
    fetch(jsonUrl)
      .then(response => response.json())
      .then(data => {
        // Get the first 3 items from the array
        var latestEntries = data.items.slice(0, 3);
        
        // Create a wrapper for the blog entries
        var entriesWrapper = document.createElement('div');
        entriesWrapper.className = 'blog-entries-wrapper';
        
        // Create and append blog entry elements
        latestEntries.forEach(entry => {
          var link = document.createElement('a');
          link.href = entry.fullUrl;
          link.textContent = entry.title;
          link.className = 'blog-entry';
          
          entriesWrapper.appendChild(link);
        });
        
        // Append the wrapper after the h4
        container.appendChild(entriesWrapper);
        
        // Create and append "View all articles" link
        var viewAllLink = document.createElement('a');
        viewAllLink.href = '/' + target;
        viewAllLink.textContent = 'View all articles';
        viewAllLink.className = 'view-all-articles';
        container.appendChild(viewAllLink);
      })
      .catch(error => console.error('Error fetching blog data:', error));
  });
})();
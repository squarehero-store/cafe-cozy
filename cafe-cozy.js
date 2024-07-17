
// ============================================
//   SquareHero Cafe Cozy Template Files v0.1.0   
// ============================================

/////// LOCATIONS DROPDOWN LIST ///////
/* This script automatically lists all portfolio items within a main navigation dropdown folder 
   when a portfolio collection is located inside that folder. */

   window.addEventListener('load', function () {
    setTimeout(function () {
      function createFolderItems(container, items, isMobile = false) {
        items.forEach(item => {
          const folderItemDiv = document.createElement('div');
          if (isMobile) {
            folderItemDiv.classList.add('container', 'header-menu-nav-item', 'header-menu-nav-item--external');
          } else {
            folderItemDiv.classList.add('header-nav-folder-item', 'header-nav-folder-item--external');
          }
  
          const linkElement = document.createElement('a');
          linkElement.href = item.fullUrl;
          linkElement.textContent = item.title;
  
          if (isMobile) {
            linkElement.setAttribute('tabindex', '0');
          }
  
          folderItemDiv.appendChild(linkElement);
          container.appendChild(folderItemDiv);
        });
      }
  
      function processDesktopDropdownFolders(collections) {
        const dropdownFolders = document.querySelectorAll('.header-nav-folder-content');
        dropdownFolders.forEach(folder => {
          const folderItems = folder.querySelectorAll('.header-nav-folder-item');
  
          folderItems.forEach(folderItem => {
            const linkElement = folderItem.querySelector('a');
            if (linkElement) {
              const collectionPath = linkElement.getAttribute('href');
              const collectionName = collectionPath.split('/').pop();
  
              if (collections.includes(collectionName)) {
                const cacheBuster = `cb=${new Date().getTime()}`;
                fetch(`${collectionPath}?format=json&${cacheBuster}`)
                  .then(response => {
                    if (!response.ok) {
                      throw new Error('Not a collection');
                    }
                    return response.json();
                  })
                  .then(data => {
                    const items = data.items;
                    if (items && items.length > 0) {
                      folder.innerHTML = ''; // Clear existing content
                      createFolderItems(folder, items);
                    }
                  })
                  .catch(error => {
                    console.log(`${collectionPath} is not a collection. Error: ${error}`);
                  });
              }
            }
          });
        });
      }
  
      function processMobileDropdownFolders(collections) {
        const navList = document.querySelector('.header-menu-nav-list');
        if (navList) {
          collections.forEach(collection => {
            const navItems = navList.querySelectorAll(`a[href="/${collection}"]`);
            navItems.forEach(navItem => {
              const parentItem = navItem.closest('.header-menu-nav-item');
              const collectionPath = navItem.getAttribute('href');
              const cacheBuster = `cb=${new Date().getTime()}`;
              fetch(`${collectionPath}?format=json&${cacheBuster}`)
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Not a collection');
                  }
                  return response.json();
                })
                .then(data => {
                  const items = data.items;
                  if (items && items.length > 0) {
                    const folderContent = parentItem.closest('.header-menu-nav-folder-content');
                    if (folderContent) {
                      const controls = folderContent.querySelector('.header-menu-controls');
                      folderContent.innerHTML = ''; // Clear existing content
                      if (controls) {
                        folderContent.appendChild(controls); // Re-add the controls
                      }
                      createFolderItems(folderContent, items, true);
                    }
                  }
                })
                .catch(error => {
                  console.log(`Mobile ${collectionPath} is not a collection. Error: ${error}`);
                });
            });
          });
        }
      }
  
      const metaTag = document.querySelector('meta[squarehero-plugin="collection-folder"]');
      if (metaTag) {
        const enabled = metaTag.getAttribute('enabled');
        if (enabled === "true") {
          const collections = metaTag.getAttribute('target').split(',').map(item => item.trim());
          processDesktopDropdownFolders(collections);
          processMobileDropdownFolders(collections);
        }
      }
    }, 1000); // 1-second delay to ensure all dynamic elements are fully rendered
  });
  



// ==================================
//   Common SquareHero Template Files   
// ==================================


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

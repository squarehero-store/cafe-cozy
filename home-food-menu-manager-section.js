// Ensure the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Check if the food-menu meta tag is enabled
    const foodMenuMeta = document.querySelector('meta[name="food-menu"]');
    const isEnabled = foodMenuMeta ? foodMenuMeta.getAttribute('enabled') === 'true' : false;

    if (isEnabled) {
        const foodMenuContainer = document.querySelector('#foodMenuContainer[data-squarehero="section-name"][sh-section="sh-menu-home"]');

        // Check if the foodMenuContainer exists
        if (foodMenuContainer) {
            // Clear the container to avoid conflicts with existing content
            foodMenuContainer.innerHTML = '';

            // Create the HTML structure
            const restaurantMenuDiv = document.createElement('div');
            restaurantMenuDiv.setAttribute('data-squarehero', 'restaurant-menu');

            const menuTabsDiv = document.createElement('div');
            menuTabsDiv.classList.add('menu-tabs');
            menuTabsDiv.id = 'menuTabs';

            const viewMenuButtonDiv = document.createElement('div');
            viewMenuButtonDiv.classList.add('view-menu-button');

            const viewMenuButton = document.createElement('button');
            viewMenuButton.innerText = 'View Our Menu';
            viewMenuButton.onclick = function() {
                window.location.href = '/menu';
            };

            viewMenuButtonDiv.appendChild(viewMenuButton);
            restaurantMenuDiv.appendChild(menuTabsDiv);
            restaurantMenuDiv.appendChild(viewMenuButtonDiv);
            foodMenuContainer.appendChild(restaurantMenuDiv);

            // Get the Google Sheets URL from the meta tag
            const metaTag = document.querySelector('meta[name="food-menu-sheet"]');
            if (!metaTag) {
                console.error('Meta tag for Google Sheets URL not found');
                return;
            }
            const sheetUrl = metaTag.getAttribute('content');

            // Check if PapaParse is available
            if (typeof Papa === 'undefined') {
                console.error('PapaParse library not loaded');
                return;
            }

            Papa.parse(sheetUrl, {
                download: true,
                header: true,
                complete: function(results) {
                    if (results.errors.length > 0) {
                        console.error('Error parsing CSV:', results.errors);
                        return;
                    }

                    const rows = results.data;
                    const menuTabs = document.getElementById('menuTabs');
                    const uniqueMenus = [...new Set(rows.map(row => row.Menu))]; // Get unique menu types

                    // Create tabs for each unique menu type
                    uniqueMenus.forEach(menuType => {
                        const tabButton = document.createElement('button');
                        tabButton.textContent = menuType;
                        tabButton.onclick = function() {
                            window.location.href = '/menu';
                        };
                        menuTabs.appendChild(tabButton);
                    });
                },
                error: function(error, file) {
                    console.error('Error parsing CSV:', error, file);
                }
            });
        } else {
            console.error('foodMenuContainer not found');
        }
    } else {
        console.log("Food menu is not enabled");
    }
});

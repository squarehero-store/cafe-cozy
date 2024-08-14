
// =========================================
//   SquareHero Cafe Cozy Template Files 
// =========================================
(function() {
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
                                console.error('Collection fetch error:', error);
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
                            console.error('Mobile collection fetch error:', error);
                        });
                });
            });
        }
    }

    // Collection folder functionality
    try {
        const metaTag = document.querySelector('meta[squarehero-plugin="collection-folder"]');
        if (metaTag) {
            const enabled = metaTag.getAttribute('enabled');
            if (enabled === "true") {
                const collections = metaTag.getAttribute('target').split(',').map(item => item.trim());
                processDesktopDropdownFolders(collections);
                processMobileDropdownFolders(collections);
                console.log("Collection folder script executed successfully");
            }
        }
    } catch (error) {
        console.error("Error in collection folder functionality:", error);
    }

    (function() {
        function addSvgToFolderTitles() {
            const folderTitles = document.querySelectorAll('.header-nav-folder-title');
            const svgString = `
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 8" class="folder-title-arrow">
                    <path fill="#000000" d="M5.581 7.432a.644.644 0 0 0 .902 0l5.332-5.305c.247-.273.247-.684 0-.93l-.628-.629c-.247-.246-.657-.246-.93 0L6.046 4.78 1.808.57c-.274-.247-.684-.247-.93 0l-.629.628c-.246.246-.246.657 0 .93l5.332 5.305Z"/>
                </svg>
            `;
    
            folderTitles.forEach(title => {
                const svgContainer = document.createElement('span');
                svgContainer.classList.add('folder-title-arrow-container');
                svgContainer.innerHTML = svgString;
                title.appendChild(svgContainer);
            });
        }
    
        // Run the function when the DOM is fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', addSvgToFolderTitles);
        } else {
            addSvgToFolderTitles();
        }
    })();

    // Footer copyright functionality
    try {
        const siteJsonUrl = `${window.location.origin}/?format=json-pretty`;
        fetch(siteJsonUrl)
            .then(response => response.json())
            .then(data => {
                const siteTitle = data.website.siteTitle;
                const siteTitleElement = document.querySelector('.site-title');
                if (siteTitleElement) {
                    siteTitleElement.textContent = siteTitle;
                }
            })
            .catch(error => console.error('Error fetching site title:', error));
    } catch (error) {
        console.error("Error in footer copyright functionality:", error);
    }

    // Section classes functionality
    try {
        const sections = document.querySelectorAll(".page-section");
        sections.forEach(function(section) {
            const savedDiv = section.querySelector('div[data-squarehero="section-name"]');
            if (savedDiv) {
                const shSectionValue = savedDiv.getAttribute('sh-section');
                if (shSectionValue) {
                    section.classList.add(shSectionValue);
                }
            }
        });
    } catch (error) {
        console.error("Error in section classes functionality:", error);
    }

    // Automatic mobile hamburger script
    try {
        function debounce(func, wait) {
            let timeout;
            return function(...args) {
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(this, args), wait);
            };
        }

        function checkHeaderNavWrap() {
            const headerNavWrapper = document.querySelector('.header-nav-wrapper');
            const headerNavList = document.querySelector('.header-nav-list');
            const body = document.body;

            if (headerNavWrapper && headerNavList) {
                // Temporarily remove the class to get accurate measurements
                const hadClass = body.classList.contains('release-the-burger');
                body.classList.remove('release-the-burger');

                // Delay measurement to allow layout to update
                setTimeout(() => {
                    const wrapperWidth = headerNavWrapper.offsetWidth;
                    const navItems = headerNavList.children;
                    let totalChildrenWidth = 0;

                    for (let item of navItems) {
                        const style = window.getComputedStyle(item);
                        const marginLeft = parseFloat(style.marginLeft);
                        const marginRight = parseFloat(style.marginRight);
                        totalChildrenWidth += item.offsetWidth + marginLeft + marginRight;
                    }

                    if (totalChildrenWidth > wrapperWidth) {
                        body.classList.add('release-the-burger');
                    } else if (hadClass) {
                        // Double-check if we still need the class
                        if (totalChildrenWidth <= wrapperWidth) {
                            body.classList.remove('release-the-burger');
                        } else {
                            body.classList.add('release-the-burger');
                        }
                    }
                }, 0);
            }
        }

        const debouncedCheck = debounce(checkHeaderNavWrap, 250);

        // Check on load
        window.addEventListener('load', checkHeaderNavWrap);

        // Check on resize, using the debounced function
        window.addEventListener('resize', debouncedCheck);

        // Initial check
        checkHeaderNavWrap();
    } catch (error) {
        console.error("Error in mobile hamburger script:", error);
    }
    // License checking functionality
    function checkLicense() {
        const currentUrl = window.location.href;
        const jsonUrl = currentUrl + (currentUrl.includes('?') ? '&' : '?') + 'format=json';
        fetch(jsonUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const websiteId = data.website.id;
                
                if (!websiteId) {
                    throw new Error("No website ID found");
                }
                const cacheBuster = new Date().getTime();
                const csvUrl = `https://docs.google.com/spreadsheets/d/e/2PACX-1vTABxXoUTzl1KE_-WuvseavQ0W18hmEB7ZxWjslopNgxGbQBfFT6Pq4FEZG5bFCH6ODowjwOrd12TgE/pub?output=csv&cacheBuster=${cacheBuster}`;
                
                return fetch(csvUrl)
                    .then(response => response.text())
                    .then(csv => {
                        const rows = csv.split('\n');
                        const ids = rows.slice(1).map(row => row.split(',')[0].trim());
                        
                        if (!ids.includes(websiteId)) {
                            logUnlicensedTemplate(websiteId, currentUrl);
                        }
                    });
            })
            .catch(error => {
                // Handle errors silently
            });
    }

    function logUnlicensedTemplate(websiteId, pageUrl) {
        const appsScriptUrl = 'https://script.google.com/macros/s/AKfycby7PQo4fqQM3QeOexCENdwv-Fm65As4vuWMozigAVh3q9ceL-h7CzdKY9dM11AHD3jKRg/exec';
        
        const params = new URLSearchParams({
            websiteId: websiteId,
            pageUrl: pageUrl
        });
        fetch(`${appsScriptUrl}?${params.toString()}`)
            .then(response => response.text())
            .catch(error => {
                // Handle errors silently
            });
    }

    // Run license check when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', checkLicense);
})();
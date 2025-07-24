document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const hasDropdownItems = document.querySelectorAll('.has-dropdown');

    // Function to toggle the mobile menu open/close state
    const toggleMobileMenu = () => {
        mobileMenuOverlay.classList.toggle('open');
        // Prevent scrolling on the body when the mobile menu is open
        document.body.classList.toggle('no-scroll');
    };

    // Event listener for opening the mobile menu
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // Event listener for closing the mobile menu
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', toggleMobileMenu);
    }

    // Event listener for clicking outside the mobile menu to close it
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', (event) => {
            // Close only if the click is directly on the overlay, not its children
            if (event.target === mobileMenuOverlay) {
                toggleMobileMenu();
            }
        });
    }

    // Handle dropdown menus for both desktop and mobile
    hasDropdownItems.forEach(item => {
        const link = item.querySelector('a.nav-link, a.mobile-nav-link');

        if (link) {
            link.addEventListener('click', (event) => {
                // Prevent default link behavior
                event.preventDefault();

                // Toggle the 'active' class on the parent list item
                // This class controls the visibility and arrow rotation
                item.classList.toggle('active');

                // For desktop, close other open dropdowns when a new one is clicked
                // This prevents multiple dropdowns from being open simultaneously on desktop.
                // This block does NOT run on mobile, so it doesn't cause the issue there.
                if (window.innerWidth >= 768) {
                    hasDropdownItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                }
            });
        }
    });

    // Modified: Close dropdowns only when clicking truly outside of ALL dropdowns.
    // This allows multiple dropdowns to stay open in the mobile menu.
    document.addEventListener('click', (event) => {
        // Check if the clicked element is inside any dropdown menu or dropdown link
        const isClickInsideAnyDropdown = event.target.closest('.has-dropdown');

        hasDropdownItems.forEach(item => {
            // If the current dropdown item is active
            // AND the click was outside of any dropdown item (meaning it's a general click outside the menu system)
            // THEN close this dropdown item.
            // This ensures that clicking on one dropdown link does not close another active dropdown.
            if (item.classList.contains('active') && !isClickInsideAnyDropdown) {
                item.classList.remove('active');
            }
        });
    });

    // Add a class to the body to prevent scrolling when the mobile menu is open
    // This CSS will be defined in style.css
    // document.body.classList.add('no-scroll') will be added/removed by toggleMobileMenu
});


// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Additional initialization code can go here if needed
});
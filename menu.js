// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary elements
    const navbar = document.getElementById('navbars');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;
    let scrollPosition = 0;

    // Toggle menu function
    function toggleMenu() {
        const isMenuOpen = navbar.classList.contains('active');
        
        if (!isMenuOpen) {
            // Store current scroll position and prevent scrolling
            scrollPosition = window.pageYOffset;
            body.style.overflow = 'hidden';
            body.style.position = 'fixed';
            body.style.top = `-${scrollPosition}px`;
            body.style.width = '100%';
            
            // Open menu
            navbar.classList.add('active');
            menuOverlay.classList.add('active');
        } else {
            // Close menu and restore scroll position
            closeMenu();
        }
    }

    // Close menu function
    function closeMenu() {
        navbar.classList.remove('active');
        menuOverlay.classList.remove('active');
        
        // Restore scrolling and position
        body.style.removeProperty('overflow');
        body.style.removeProperty('position');
        body.style.removeProperty('top');
        body.style.removeProperty('width');
        window.scrollTo(0, scrollPosition);
    }

    // Event Listeners
    menuToggle.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking links
    document.querySelectorAll('.navbar ul li a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navbar.classList.contains('active')) {
            closeMenu();
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 700 && navbar.classList.contains('active')) {
            closeMenu();
        }
    });
}); 
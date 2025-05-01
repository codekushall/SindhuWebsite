document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    const navbar = document.querySelector('.navbar');
    const menuToggle = document.querySelector('.menu-toggle');
    const menuOverlay = document.querySelector('.menu-overlay');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    let scrollPosition = 0;

    // Toggle mobile menu
    function toggleMenu() {
        const isMenuOpen = navLinks.classList.contains('active');
        
        if (!isMenuOpen) {
            // Store scroll position and prevent scrolling
            scrollPosition = window.pageYOffset;
            body.classList.add('no-scroll');
            body.style.top = `-${scrollPosition}px`;
            
            // Open menu
            navLinks.classList.add('active');
            menuOverlay.classList.add('active');
        } else {
            closeMenu();
        }
    }

    // Close mobile menu
    function closeMenu() {
        navLinks.classList.remove('active');
        menuOverlay.classList.remove('active');
        body.classList.remove('no-scroll');
        window.scrollTo(0, scrollPosition);
        body.style.top = '';
    }

    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);
    menuOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu on window resize if it becomes desktop view
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add shadow to navbar on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    });
});
// Create header.js
document.addEventListener('DOMContentLoaded', function() {
    const headerContainer = document.getElementById('header-container');
    
    fetch('/Header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Header file not found');
            }
            return response.text();
        })
        .then(data => {
            headerContainer.innerHTML = data;
            
            // Initialize header scripts after content is loaded
            const hamburger = document.getElementById('hamburger');
            const navWrapper = document.getElementById('nav-wrapper');
            const body = document.body;

            // Toggle menu function
            function toggleMenu() {
                hamburger.classList.toggle('active');
                navWrapper.classList.toggle('active');
                body.style.overflow = navWrapper.classList.contains('active') ? 'hidden' : '';
            }

            // Hamburger click event
            hamburger.addEventListener('click', function(e) {
                e.stopPropagation();
                toggleMenu();
            });

            // Close menu when clicking links
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.addEventListener('click', function() {
                    toggleMenu();
                });
            });

            // Close menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!navWrapper.contains(e.target) && 
                    !hamburger.contains(e.target) && 
                    navWrapper.classList.contains('active')) {
                    toggleMenu();
                }
            });

            // Close menu on ESC key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape' && navWrapper.classList.contains('active')) {
                    toggleMenu();
                }
            });
        })
        .catch(error => {
            console.error('Error loading header:', error);
            headerContainer.innerHTML = '<p>Error loading header</p>';
        });
});
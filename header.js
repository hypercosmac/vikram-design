// Add font preconnect links
const preconnectLinks = [
    { href: 'https://fonts.googleapis.com/', rel: 'preconnect' },
    { href: 'https://fonts.gstatic.com/', rel: 'preconnect', crossOrigin: 'anonymous' }
];

preconnectLinks.forEach(link => {
    const linkElement = document.createElement('link');
    linkElement.href = link.href;
    linkElement.rel = link.rel;
    if (link.crossOrigin) linkElement.crossOrigin = link.crossOrigin;
    document.head.appendChild(linkElement);
});

// Add Google Fonts
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// Add header styles
const headerStyles = `
/* Base mobile-first styles */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
    line-height: 1.6;
    color: #333;
    -webkit-font-smoothing: antialiased;
    margin-top: 80px; /* Adjust this value based on header height */
}

/* Header and Navigation */
#header {
    background: white;
    padding: 20px 40px;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    position: fixed; /* Keep it fixed at the top */
    top: 0; /* Align to the top */
    left: 0; /* Align to the left */
    right: 0; /* Align to the right */    z-index: 1000; /* Ensure it stays above other content */
}

.Header-logo {
    font-size: 1.5rem;
    font-weight: 700;
    color: #333;
    text-decoration: none;
    font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
}

#header .Header-logo a {
    color: #333 !important;
    text-decoration: none;
}

#header #nav ul {
    list-style: none;
    display: flex;
    gap: 2rem; /* Adjust gap as needed */
}

#header #nav ul li a {
    color: #333 !important; /* Use !important if necessary */
    text-decoration: none;
    font-size: 1rem;
    font-weight: 400;
}

.menu_trigger {
    display: none; /* Show only on mobile */
}

/* Mobile Navigation */
@media (max-width: 767px) {
    #header {
        padding: 15px 20px; /* Adjust padding for mobile */
    }

    .menu_trigger {
        display: block; /* Show menu trigger on mobile */
    }

    #nav {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        border-bottom: 1px solid #eee;
    }

    #nav.active {
        display: block;
    }

    #nav ul {
        flex-direction: column;
        gap: 0;
    }

    #nav ul li a {
        display: block;
        padding: 1rem;
    }
}`;

// Create and append style element
const styleSheet = document.createElement("style");
styleSheet.innerText = headerStyles;
document.head.appendChild(styleSheet);

// Load header content
const headerPlaceholder = document.querySelector('#header-placeholder');
if (headerPlaceholder) {
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            headerPlaceholder.innerHTML = data;
            
            // Setup mobile menu functionality
            const menuTrigger = document.querySelector('.menu_trigger');
            const nav = document.getElementById('nav');
            const header = document.getElementById('header');

            if (menuTrigger && nav) {
                menuTrigger.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    nav.classList.toggle('active');
                    this.textContent = nav.classList.contains('active') ? '×' : '☰';
                });

                // Close menu when clicking outside
                document.addEventListener('click', function(e) {
                    if (!header.contains(e.target)) {
                        nav.classList.remove('active');
                        menuTrigger.textContent = '☰';
                    }
                });

                // Close menu after clicking a link
                nav.querySelectorAll('a').forEach(link => {
                    link.addEventListener('click', function() {
                        nav.classList.remove('active');
                        menuTrigger.textContent = '☰';
                    });
                });
            }
        })
        .catch(error => {
            console.error('Error loading header:', error);
            // Fallback header if fetch fails
            headerPlaceholder.innerHTML = `
                <header id="header">
                    <span class="Header-logo"><a href="index.html">Vikram Mishra</a></span>
                    <a href="#" class="menu_trigger">☰</a>
                    <nav id="nav">
                        <ul>
                            <li><a href="index.html">Home</a></li>
                            <li><a href="about.html">About</a></li>
                            <li><a href="resume.html">Resume</a></li>
                            <li><a href="blog/index.html">Blog</a></li>
                        </ul>
                    </nav>
                </header>
            `;
        });
} 
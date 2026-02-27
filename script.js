// script.js
// Features:
// 1. Mobile navigation toggle with aria attributes and auto-close
// 2. Dark/light theme toggle with persistent preference and icon swap
// 3. Smooth scrolling on internal links and header scroll effect

// Wrap everything in DOMContentLoaded to ensure DOM nodes exist

document.addEventListener('DOMContentLoaded', () => {
    /* ---------------- Mobile Navigation ---------------- */
    const navMenu = document.getElementById('nav-menu');
    // hamburger button has class "nav__hamburger" in HTML
    const hamburger = document.querySelector('.nav__hamburger');
    const navLinks = document.querySelectorAll('.nav__link');

    const toggleMenu = () => {
        const isOpen = navMenu.classList.toggle('open');
        // Update aria-expanded for accessibility
        if (hamburger) {
            hamburger.setAttribute('aria-expanded', isOpen);
        }
    };

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    // Close menu when a link is clicked (use capture to ensure this always runs)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
                if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    });

    /* ---------------- Theme Toggle (Dark/Light) ---------------- */
    const themeBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeBtn ? themeBtn.querySelector('i') : null;

    const setTheme = (light) => {
        body.classList.toggle('light-theme', light);
        if (icon) {
            icon.classList.toggle('fa-sun', light);
            icon.classList.toggle('fa-moon', !light);
        }
        localStorage.setItem('preferred-theme', light ? 'light' : 'dark');
    };

    // initialize theme based on localStorage or system preference
    const saved = localStorage.getItem('preferred-theme');
    if (saved) {
        setTheme(saved === 'light');
    } else {
        // fallback: match prefers-color-scheme
        const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
        setTheme(prefersLight);
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const light = !body.classList.contains('light-theme');
            setTheme(light);
        });
    }

    /* ---------------- Smooth Scrolling & Header Effects ---------------- */
    const header = document.querySelector('.header');

    // smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId.length > 1) {
                e.preventDefault();
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({ behavior: 'smooth' });
                    // update focus for accessibility
                    targetEl.focus({ preventScroll: true });
                }
            }
        });
    });

    const onScroll = () => {
        if (!header) return;
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', onScroll);
    // call once on load in case the page is already scrolled
    onScroll();

});

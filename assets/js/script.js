
AOS.init({ once: true, duration: 800 });

// Mobile nav toggle
const nav = document.querySelector('nav');
const navToggle = document.querySelector('.mobile-nav-toggle');
const navMenu = document.querySelector('nav ul');

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
	anchor.addEventListener('click', function (e) {
		const href = this.getAttribute('href');
		navToggle.innerHTML = '&#9776;';
		if (href.length > 1 && document.querySelector(href)) {
			e.preventDefault();
			const target = document.querySelector(href);
			const yOffset = isMobileScreen() ? -(document.querySelector('header').clientHeight) : 0;
			const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
			// Custom slow scroll
			const startY = window.pageYOffset;
			const distance = y - startY;
			const duration = 900; // ms
			let start;
			function step(timestamp) {
				if (!start) start = timestamp;
				const progress = Math.min((timestamp - start) / duration, 1);
				window.scrollTo(0, startY + distance * progress);
				if (progress < 1) {
					window.requestAnimationFrame(step);
				}
			}
			window.requestAnimationFrame(step);
			// Close mobile nav after click
			document.querySelector('nav ul').classList.remove('open');
		}
	});
});

navToggle.addEventListener('click', () => {
	navMenu.classList.toggle('open');
	navToggle.innerHTML = navMenu.classList.contains('open') ? '&#10006;' : '&#9776;';
});
// Optional: close nav when clicking outside
document.addEventListener('click', (e) => {
	if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
		navMenu.classList.remove('open');
	}
});

function isMobileScreen() {
	return Math.min(window.screen.width) <= 768;
}
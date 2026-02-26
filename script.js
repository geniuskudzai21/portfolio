
// Initialize Lucide Icons
lucide.createIcons();

// Set current year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact Form Submission
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    submitBtn.classList.add('opacity-50');

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        } else {
            alert('Something went wrong. Please try again.');
        }
    } catch (error) {
        alert('Error sending message. Please try again.');
    }

    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    submitBtn.classList.remove('opacity-50');
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('px-8', 'pt-2');
        const navContent = navbar.querySelector('div');
        navContent.classList.remove('mt-4', 'mx-4');
        navContent.classList.add('rounded-none', 'border-none', 'bg-dark-bg/80');
    } else {
        navbar.classList.remove('px-8', 'pt-2');
        const navContent = navbar.querySelector('div');
        navContent.classList.add('mt-4', 'mx-4');
        navContent.classList.remove('rounded-none', 'border-none', 'bg-dark-bg/80');
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinksContainer = navbar.querySelector('.hidden.md\\:flex');

mobileMenuBtn.addEventListener('click', () => {
    const isExpanded = navLinksContainer.classList.contains('flex');

    if (isExpanded) {
        navLinksContainer.classList.replace('flex', 'hidden');
        navLinksContainer.classList.remove('flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'p-6', 'glassmorphism', 'mt-2', 'space-y-4', 'space-x-0');
    } else {
        navLinksContainer.classList.replace('hidden', 'flex');
        navLinksContainer.classList.add('flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'p-6', 'glassmorphism', 'mt-2', 'space-y-4', 'space-x-0');
    }
});

// Close mobile menu on link click
navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
            navLinksContainer.classList.replace('flex', 'hidden');
            navLinksContainer.classList.remove('flex-col', 'absolute', 'top-full', 'left-0', 'w-full', 'p-6', 'glassmorphism', 'mt-2', 'space-y-4', 'space-x-0');
        }
    });
});

// Neural Network Background Points
const container = document.getElementById('neural-container');
const dots = [];
const dotCount = window.innerWidth < 768 ? 20 : 50;

for (let i = 0; i < dotCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'neural-dot opacity-20';
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    dot.style.left = `${x}%`;
    dot.style.top = `${y}%`;
    container.appendChild(dot);
    dots.push({ el: dot, x, y, vx: (Math.random() - 0.5) * 0.05, vy: (Math.random() - 0.5) * 0.05 });
}

function animateDots() {
    dots.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        if (dot.x < 0 || dot.x > 100) dot.vx *= -1;
        if (dot.y < 0 || dot.y > 100) dot.vy *= -1;

        dot.el.style.left = `${dot.x}%`;
        dot.el.style.top = `${dot.y}%`;
    });
    requestAnimationFrame(animateDots);
}
animateDots();

// Reveal Animations on Scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-reveal');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('section, .group').forEach(el => {
    el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-1000');
    observer.observe(el);
});

// Section Navigation Active State
const sectionNavButtons = document.querySelectorAll('.section-nav-btn');
const mobileNavButtons = document.querySelectorAll('.mobile-nav-btn');
const allNavButtons = [...sectionNavButtons, ...mobileNavButtons];
const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'certificates', 'contact'];

function updateActiveSection() {
    let current = '';
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150 && rect.bottom >= 150) {
                current = sectionId;
            }
        }
    });

    allNavButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.section === current) {
            btn.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveSection);
updateActiveSection();

// Persistent Floating Tech Stack Logic
const techStack = [
    { icon: 'code-2', label: 'Tailwind' },
    { icon: 'layers', label: 'React' },
    { icon: 'database', label: 'Node.js' },
    { icon: 'cpu', label: 'Python' },
    { icon: 'terminal', label: 'TypeScript' },
    { icon: 'git-branch', label: 'Git' }
];

const floatContainer = document.getElementById('tech-float-container');

techStack.forEach((tech, index) => {
    const el = document.createElement('div');
    el.className = 'absolute flex flex-col items-center text-ai-cyan/50 transition-opacity duration-1000';
    el.innerHTML = `
        <i data-lucide="${tech.icon}" class="w-8 h-8 md:w-10 md:h-10"></i>
        <span class="text-[10px] uppercase font-bold mt-1 tracking-widest">${tech.label}</span>
    `;
    floatContainer.appendChild(el);

    // Initial random position - spread across the bottom area
    let x = Math.random() * 90 + 5;
    let y = Math.random() * 70 + 10;
    let angle = Math.random() * Math.PI * 2;
    let speed = 0.008 + Math.random() * 0.015;

    function move() {
        angle += speed;
        const finalX = x + Math.cos(angle) * 8;
        const finalY = y + Math.sin(angle) * 8;

        // Keep within bounds
        if (finalX < 0 || finalX > 95) {
            x = Math.random() * 90 + 5;
        }
        if (finalY < 0 || finalY > 90) {
            y = Math.random() * 70 + 10;
        }

        el.style.left = `${Math.max(2, Math.min(93, x + Math.cos(angle) * 8))}%`;
        el.style.top = `${Math.max(5, Math.min(85, y + Math.sin(angle) * 8))}%`;

        // Subtle opacity
        el.style.opacity = 0.25 + (Math.sin(angle) * 0.1);

        requestAnimationFrame(move);
    }
    move();
});
lucide.createIcons(); // Re-init for injected icons

// Certificate Modal Functions
function openCertModal(imgSrc) {
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('cert-modal-img');
    modalImg.src = imgSrc;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeCertModal() {
    const modal = document.getElementById('cert-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeCertModal();
});
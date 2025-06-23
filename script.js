// script.js - Rebuilt portfolio script with clean layout integration

// Scroll reveal effect
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animationPlayState = 'running';
    }
  });
}, { threshold: 0.1 });
sections.forEach(section => observer.observe(section));

// Logo click to scroll to top
const logo = document.querySelector('.logo');
if (logo) {
  logo.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
} else {
  console.warn("Logo element not found: '.logo'");
}

// Click sound and animation on action buttons
const buttons = document.querySelectorAll('.buttons a');
const clickSound = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_6bfa6b63f6.mp3');
buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.add('clicked');
    clickSound.play();
    setTimeout(() => btn.classList.remove('clicked'), 200);
  });
});

// Create theme toggle and insert it in nav-right
const toggle = document.createElement('button');
toggle.textContent = '🌓';
toggle.className = 'theme-toggle';

window.addEventListener('DOMContentLoaded', () => {
  const navRight = document.querySelector('.nav-right');
  if (navRight) {
    navRight.appendChild(toggle);
  } else {
    document.body.appendChild(toggle);
  }

  // Set initial theme
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') document.body.classList.add('light');
});

// Toggle light/dark mode
toggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
});

// Toast welcome once per session
if (!sessionStorage.getItem('welcomed')) {
  showToast("Welcome to Aoubaid Harbi's portfolio!");
  sessionStorage.setItem('welcomed', 'true');
}

// Scroll progress bar
const progressBar = document.createElement('div');
Object.assign(progressBar.style, {
  position: 'fixed',
  top: 0,
  left: 0,
  height: '4px',
  background: '#00bcd4',
  zIndex: '1000',
  transition: 'width 0.2s'
});
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  progressBar.style.width = `${(scrollTop / docHeight) * 100}%`;
});

// Toast system
function showToast(message) {
  const toast = document.createElement('div');
  toast.textContent = message;
  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    background: '#00bcd4',
    color: '#000',
    padding: '12px 20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    zIndex: '1001',
    opacity: '0',
    transition: 'opacity 0.4s ease'
  });
  document.body.appendChild(toast);
  setTimeout(() => toast.style.opacity = '1', 100);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 500);
  }, 4000);
}

// Handle contact form
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = contactForm.querySelector('input[type="text"]').value.trim();
    const email = contactForm.querySelector('input[type="email"]').value.trim();
    const message = contactForm.querySelector('textarea').value.trim();

    if (name && email && message) {
      showToast("Thank you, " + name + ". Your message has been received!");
      contactForm.reset();
    } else {
      showToast("Please fill in all fields.");
    }
  });
}

// Add theme toggle style
const styleTag = document.createElement('style');
styleTag.textContent = `
  .theme-toggle {
    padding: 8px 12px;
    font-size: 1.2rem;
    border-radius: 50%;
    border: none;
    background: #00bcd4;
    color: #000;
    cursor: pointer;
    margin-left: 10px;
  }
`;
document.head.appendChild(styleTag);

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-item");
const mobileMenu = document.getElementById('mobileMenu');
const menuIcon = document.getElementById('menuIcon');
const hamburger = document.querySelector('.hamburger');

window.addEventListener("scroll", () => {

  sections.forEach(section => {
    const sectionTop = section.offsetTop;

    if (window.scrollY >= sectionTop - 100) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

function toggleMenu() {
    const isOpen = mobileMenu.classList.toggle('open');
    menuIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

function closeMenu() {
    mobileMenu.classList.remove('open');
    menuIcon.className = 'fa-solid fa-bars';
}

document.addEventListener('click', function (e) {
    if (mobileMenu.classList.contains('open') && !mobileMenu.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
    }
});

window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
        closeMenu();
    }
});
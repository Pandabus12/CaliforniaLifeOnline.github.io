// script.js
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');
  
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault(); // Verhindert das normale Scrollen
        const targetId = link.getAttribute('href').substring(1); // Ziel-Section-ID
        const targetSection = document.getElementById(targetId);
  
        // Entferne "active" von allen Sections
        sections.forEach(section => section.classList.remove('active'));
  
        // Füge "active" zur Ziel-Section hinzu
        targetSection.classList.add('active');
  
        // Optional: Scrolle den Bereich, nachdem die Animation vorbei ist
        setTimeout(() => {
          targetSection.scrollIntoView({ behavior: 'smooth' });
        }, 500); // Warte auf den Übergang
      });
    });
  });
  
document.addEventListener("DOMContentLoaded", () => {
  const navHTML = `
    <nav aria-label="Primary navigation">
      <div class="nav-inner">
        <div class="brand">
          <span class="slashslash" aria-hidden="true">//</span>
          <span class="nav-header">Costope</span>
        </div>
        <div class="nav-links">
          <a href="index.html" id="nav-home">home</a>
          <a href="projects.html" id="nav-projects">projects</a>
          <a href="blog.html" id="nav-blog">blog</a>
          <a href="contact.html" id="nav-contact">contact</a>
          <a href="#" id="nav-about">about</a>
        </div>
      </div>
    </nav>
  `;
  
  // Fügt die Navigation ganz oben im body ein
  document.body.insertAdjacentHTML('afterbegin', navHTML);

  // Automatischer "Active"-Unterstrich je nachdem, auf welcher Seite man ist
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  if (currentPage === "index.html") document.getElementById("nav-home")?.classList.add("active");
  if (currentPage === "projects.html") document.getElementById("nav-projects")?.classList.add("active");
  if (currentPage === "blog.html") document.getElementById("nav-blog")?.classList.add("active");
  if (currentPage === "contact.html") document.getElementById("nav-contact")?.classList.add("active");
  if (currentPage === "about.html") document.getElementById("nav-about")?.classList.add("active");

  // Seiten die noch in Arbeit sind bekommen nen Alert
  const unfinishedPages = ["nav-about"]; // Liste ist effizienter :)

  unfinishedPages.forEach(id => {
    const link = document.getElementById(id);
    if (link) {
      link.addEventListener("click", (event) => {
        // Verhindert, dass der Browser dem Link folgt oder die Seite neu lädt
        event.preventDefault(); 
        
        // Zeigt den simplen JavaScript-Alert mit dem geschwungenen Apostroph an
        alert("🛠️ Coming Soon! I'm currently working on this page 🛠️ :)");
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelector('.nav-links');

  function updateScrollMask() {
    if (!navLinks) return;

    const scrollLeft = navLinks.scrollLeft;
    const maxScroll = navLinks.scrollWidth - navLinks.clientWidth;

    // Maximale Breite des Fades in Pixeln
    const maxFade = 25;

    // Berechne die Pixel stufenlos passend zur Finger-Bewegung (0px bis 25px)
    const fadeLeft = Math.max(0, Math.min(scrollLeft, maxFade));
    const fadeRight = Math.max(0, Math.min(maxScroll - scrollLeft, maxFade));

    navLinks.style.setProperty('--fade-left', `${fadeLeft}px`);
    navLinks.style.setProperty('--fade-right', `${fadeRight}px`);
  }

  if (navLinks) {
    navLinks.addEventListener('scroll', updateScrollMask);
    window.addEventListener('resize', updateScrollMask);
    updateScrollMask();
  }
});
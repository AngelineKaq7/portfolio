const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");
const menuIcon = document.getElementById("menuIcon");
const navButtons = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".section");
const siteHeader = document.querySelector(".site-header");

function setActiveSection(sectionId) {
    navButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.section === sectionId);
    });
}

function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth" });
    setActiveSection(sectionId);
    navLinks.classList.remove("active");
    mobileMenuBtn.setAttribute("aria-expanded", "false");
    menuIcon.textContent = "Menu";
}

mobileMenuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("active");
    mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
    menuIcon.textContent = isOpen ? "Close" : "Menu";
});

navButtons.forEach((button) => {
    button.addEventListener("click", () => scrollToSection(button.dataset.section));
});

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("nameInput").value.trim();
    const email = document.getElementById("emailInput").value.trim();
    const message = document.getElementById("messageInput").value.trim();
    const subject = encodeURIComponent(`Portfolio opportunity for ${name || "Angeline"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);

    window.location.href = `mailto:akaquilala@mcm.edu.ph?subject=${subject}&body=${body}`;
});

const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
        });
    },
    {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: 0
    }
);

sections.forEach((section) => sectionObserver.observe(section));

const revealTargets = document.querySelectorAll(
    ".split-layout, .section-heading, .capability-card, .work-card, .project-list a, .proof-item, .cert-card, .contact-grid"
);

revealTargets.forEach((target, index) => {
    target.classList.add("reveal");
    target.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
});

const revealObserver = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    },
    {
        root: null,
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12
    }
);

revealTargets.forEach((target) => revealObserver.observe(target));

function updateHeaderState() {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 24);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

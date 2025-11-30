// NAV MOBILE
const navToggle = document.getElementById("navToggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
        nav.classList.toggle("nav--open");
    });

    // Cierra menú al hacer click en un link
    nav.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("nav--open");
        });
    });
}

// BOTÓN IR ARRIBA
const btnTop = document.getElementById("btnTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 320) {
        btnTop.classList.add("btn-top--visible");
    } else {
        btnTop.classList.remove("btn-top--visible");
    }
});

btnTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

// AÑO FOOTER
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// ANIMACIÓN REVEAL AL SCROLLEAR
const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal--visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.17
    }
);

revealElements.forEach(el => observer.observe(el));

// BOTONES WHATSAPP (CAMBIÁ EL NÚMERO POR EL TUYO)
const whatsappButtons = document.querySelectorAll(".btn-whatsapp");
const whatsappNumber = "5491141999497"; // ejemplo Argentina, editá este número

whatsappButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const producto = btn.getAttribute("data-producto") || "Consulta";
        const mensaje = encodeURIComponent(
            `Hola, me interesa: ${producto}. ¿Me pasás más info?`
        );
        const url = `https://wa.me/${whatsappNumber}?text=${mensaje}`;
        window.open(url, "_blank");
    });
});

// FORMULARIO (SIMULACIÓN SIMPLE)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", e => {
        e.preventDefault();
        if (formStatus) {
            formStatus.textContent = "¡Gracias! Recibimos tu mensaje. Nos pondremos en contacto pronto.";
        }
        contactForm.reset();
        setTimeout(() => {
            if (formStatus) formStatus.textContent = "";
        }, 4000);
    });
}

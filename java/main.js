document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript cargado correctamente");

    // MODAL DE COOKIES
    const cookiePopup = document.getElementById("cookieModal");
    const acceptButton = document.querySelector(".cookie-buttons .button:nth-child(2)");
    const declineButton = document.querySelector(".cookie-buttons .button:nth-child(1)");

    const cookiesDecision = localStorage.getItem("cookiesDecision");
    console.log("Decisión de cookies guardada:", cookiesDecision);

    if (!cookiesDecision && cookiePopup && acceptButton && declineButton) {
        // Mostrar el modal solo si no se ha tomado decisión
        cookiePopup.style.display = "flex";

        acceptButton.addEventListener("click", function () {
            localStorage.setItem("cookiesDecision", "accepted");
            cookiePopup.style.display = "none";
            console.log("Cookies aceptadas");
        });

        declineButton.addEventListener("click", function () {
            localStorage.setItem("cookiesDecision", "declined");
            cookiePopup.style.display = "none";
            console.log("Cookies rechazadas");
        });
    } else {
        // Ya hay decisión, no mostramos el modal
        if (cookiePopup) cookiePopup.style.display = "none";
    }

    // EXPANSIÓN DE TARJETAS
    const cookieCards = document.querySelectorAll('.cookie-card');

    cookieCards.forEach(card => {
        card.addEventListener('click', function () {
            cookieCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('expanded');
                }
            });
            this.classList.toggle('expanded');
        });
    });

    // SCROLL SUAVE
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // EXPANDIR TODAS LAS TARJETAS
    const expandAllButton = document.getElementById("expandAll");

    if (expandAllButton) {
        expandAllButton.addEventListener("click", function () {
            cookieCards.forEach(card => {
                card.classList.add('expanded');
            });
        });
    }

    // INTERSECTION OBSERVER
    const revealElements = document.querySelectorAll('.reveal');

    if (window.innerWidth > 896) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const el = entry.target;
    
          if (entry.isIntersecting) {
            el.classList.add('show');
          } else {
            el.classList.remove('show');
          }
        });
      }, {
        threshold: 0.7
      });
    
      revealElements.forEach(el => observer.observe(el));
    } else {
      // En móvil, mostrar directamente sin animación
      revealElements.forEach(el => el.classList.add('show'));
    }

// CAMBIAR BOTÓN SI HAY USUARIO
const usuarioLogeado = localStorage.getItem('usuarioLogeado');

if (usuarioLogeado) {
    const usuario = JSON.parse(usuarioLogeado); // Decodificamos el objeto guardado
    const loginButton = document.querySelector('.header .button');

    if (loginButton) {
        loginButton.textContent = 'Ir a mi perfil';
        loginButton.onclick = function () {
            window.location.href = '../Galletas-Sunkissed/Perfil.html';
        };
    }
}

});

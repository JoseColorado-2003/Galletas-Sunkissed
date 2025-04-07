document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript cargado correctamente");

    // Modal de cookies
    const cookiePopup = document.getElementById("cookieModal");
    const acceptButton = document.querySelector(".cookie-buttons .button:nth-child(2)");
    const declineButton = document.querySelector(".cookie-buttons .button:nth-child(1)");
    const cookieCards = document.querySelectorAll('.cookie-card');

    console.log("cookiePopup:", cookiePopup);
    console.log("acceptButton:", acceptButton);
    console.log("declineButton:", declineButton);

    if (cookiePopup && acceptButton && declineButton) {
        acceptButton.addEventListener("click", function () {
            cookiePopup.style.display = "none";
        });

        declineButton.addEventListener("click", function () {
            cookiePopup.style.display = "none";
        });

        // Mostrar el modal al cargar la página
        cookiePopup.style.display = "flex";
    } else {
        console.error("❌ Uno o más elementos no se encontraron en el DOM.");
    }

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

    const expandAllButton = document.getElementById("expandAll");

    if (expandAllButton) {
        expandAllButton.addEventListener("click", function () {
            cookieCards.forEach(card => {
                card.classList.add('expanded');
            });
        });
    }

    // IntersectionObserver para elementos que deben mostrarse al hacer scroll
    const revealElements = document.querySelectorAll('.reveal');

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
        threshold: 0.7 // porcentaje visible antes de activar
    });

    revealElements.forEach(el => observer.observe(el));

    // Verificación de usuario logeado y cambio de botón
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioLogeado = localStorage.getItem('usuarioLogeado'); // Obtener el correo del usuario logeado

    // Si el usuario está logeado, cambiamos el botón
    if (usuarioLogeado) {
        // Verificamos si el usuario está en el array de usuarios
        const usuarioEncontrado = usuarios.find(usuario => usuario.correo === usuarioLogeado);

        // Si el usuario existe en el array de usuarios
        if (usuarioEncontrado) {
            // Encontramos el botón que lleva al login
            const loginButton = document.querySelector('.header .button');

            // Si existe el botón
            if (loginButton) {
                // Cambiar texto del botón
                loginButton.textContent = 'Ir a mi perfil';

                // Cambiar la URL del botón para redirigir al perfil del usuario
                loginButton.onclick = function () {
                    window.location.href = 'Perfil.html'; // Cambia esto con la ruta del perfil de usuario
                };
            }
        }
    }
});
window.addEventListener('beforeunload', function () {
    // Elimina el usuario logueado cuando el navegador o la pestaña se cierra
    localStorage.removeItem('usuarioLogeado');
});
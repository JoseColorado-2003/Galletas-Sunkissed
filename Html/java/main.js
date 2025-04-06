document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript cargado correctamente");

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

});

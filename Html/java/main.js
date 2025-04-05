document.addEventListener("DOMContentLoaded", function () {
    console.log("JavaScript cargado correctamente");

    const cookiePopup = document.getElementById("cookieModal"); 
    const acceptButton = document.querySelector(".cookie-buttons .button:nth-child(2)");
    const declineButton = document.querySelector(".cookie-buttons .button:nth-child(1)");

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
});

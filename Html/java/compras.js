
  document.addEventListener('DOMContentLoaded', function () {
    // Selecciona todos los contenedores de control de cantidad
    const quantityControls = document.querySelectorAll('.quantity-controls');

    quantityControls.forEach(control => {
      const btnAdd = control.querySelector('.qty-btn-positive');
      const btnSubtract = control.querySelector('.qty-btn-negative');
      const qtyDisplay = control.querySelector('.qty-number');

      btnAdd.addEventListener('click', () => {
        let currentQty = parseInt(qtyDisplay.textContent);
        qtyDisplay.textContent = currentQty + 1;
      });

      btnSubtract.addEventListener('click', () => {
        let currentQty = parseInt(qtyDisplay.textContent);
        if (currentQty > 0) {
          qtyDisplay.textContent = currentQty - 1;
        }
      });
    });

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
        threshold: 0.4 // porcentaje visible antes de activar
    });

    revealElements.forEach(el => observer.observe(el));

      let promoCount = 0; // Contador de promociones seleccionadas
      let maxCookies = 0; // Máximo de galletas permitidas
    
      // Elementos DOM
      const promoQuantityDisplay = document.querySelector("#popupOverlay .qty-number"); // Cantidad de promociones
      const cookieQuantityDisplays = document.querySelectorAll(".cookie-quantity .qty-number"); // Cantidad de galletas por producto
      const openPopupButton = document.getElementById("openPopup");
      const popupOverlay = document.getElementById("popupOverlay");
      const popupCloseButton = document.querySelector(".close-popup"); // Botón de cerrar popup
    
      // Mostrar el popup al hacer clic en el botón "Comprar"
      openPopupButton.addEventListener('click', function () {
        popupOverlay.style.display = 'flex'; // Mostrar popup
      });
    
      // Cerrar el popup
      popupCloseButton.addEventListener('click', function () {
        popupOverlay.style.display = 'none'; // Ocultar popup
      });
    
      // Función para actualizar la cantidad máxima de galletas basadas en promociones
      function updateMaxCookies() {
        maxCookies = promoCount * 3; // Cada promoción permite 3 galletas
        promoQuantityDisplay.textContent = promoCount; // Actualizar la visualización de promociones
    
        // Actualizar las cantidades máximas para cada producto en el popup
        cookieQuantityDisplays.forEach((display) => {
          const currentQty = parseInt(display.textContent);
          const newQty = currentQty > maxCookies ? maxCookies : currentQty; // No permitir más de la cantidad máxima
          display.textContent = newQty; // Actualizar la cantidad en la interfaz
        });
      }
    
      // Lógica para aumentar o disminuir la cantidad de promociones
      document.querySelector("#popupOverlay .qty-btn-positive").addEventListener('click', function () {
        if (promoCount < 3) { // Limitamos a 3 promociones máximo
          promoCount++;
          updateMaxCookies(); // Actualizar el límite de galletas
        }
      });
    
      document.querySelector("#popupOverlay .qty-btn-negative").addEventListener('click', function () {
        if (promoCount > 0) {
          promoCount--;
          updateMaxCookies(); // Actualizar el límite de galletas
        }
      });
    
      // Lógica para aumentar o disminuir la cantidad de galletas
      document.querySelectorAll(".cookie-quantity .qty-btn-positive").forEach(button => {
        button.addEventListener('click', function () {
          const qtyDisplay = button.closest('.cookie-quantity').querySelector('.qty-number');
          let currentQty = parseInt(qtyDisplay.textContent);
    
          if (currentQty < maxCookies) {
            qtyDisplay.textContent = currentQty + 1; // Aumentar la cantidad de galletas
          }
        });
      });
    
      document.querySelectorAll(".cookie-quantity .qty-btn-negative").forEach(button => {
        button.addEventListener('click', function () {
          const qtyDisplay = button.closest('.cookie-quantity').querySelector('.qty-number');
          let currentQty = parseInt(qtyDisplay.textContent);
    
          if (currentQty > 0) {
            qtyDisplay.textContent = currentQty - 1; // Disminuir la cantidad de galletas
          }
        });
      });
    
      // Inicialización
      updateMaxCookies(); // Inicializamos la cantidad máxima de galletas al cargar la página
    });

  
  
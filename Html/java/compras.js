let paginaCargada = false;

// Inventario editable global
const inventario = {
  "Chips": 10,
  "Cacao": 8,
  "Queso": 5
};
if (Notification.permission !== "granted") {
  Notification.requestPermission();
}

function mostrarMensaje(mensaje) {
  if (Notification.permission === "granted") {
    new Notification("Sunkissed Galletas", {
      body: mensaje,
      icon: "../Imagenes/galletaChips.svg" // Puedes cambiarlo o quitarlo
    });
  } else {
    alert(mensaje); // Por si no da permiso, usamos un alert como respaldo
  }
}

window.addEventListener('DOMContentLoaded', () => {
  for (const galleta in inventario) {
    const stockElement = document.getElementById(`stock-${galleta}`);
    if (stockElement) {
      stockElement.textContent = `Stock disponible: ${inventario[galleta]}`;
    }
  }

  // Controles de cantidad en tarjetas normales
  document.querySelectorAll('.cookie-card .quantity-controls').forEach(control => {
    const btnAdd = control.querySelector('.qty-btn-positive');
    const btnSubtract = control.querySelector('.qty-btn-negative');
    const qtyDisplay = control.querySelector('.qty-number');

    btnAdd?.addEventListener('click', () => {
      let currentQty = parseInt(qtyDisplay.textContent);
      const title = control.closest('.cookie-card')?.querySelector('.cookie-title')?.textContent.trim().replace('Galleta ', '');
      const maxStock = inventario[title] ?? Infinity;

      if (currentQty < maxStock) {
        qtyDisplay.textContent = currentQty + 1;
      } else {
        mostrarMensaje(`Has alcanzado el máximo de ${maxStock} en inventario para ${title}`);
      }
    });

    btnSubtract?.addEventListener('click', () => {
      let currentQty = parseInt(qtyDisplay.textContent);
      if (currentQty > 0) {
        qtyDisplay.textContent = currentQty - 1;
      }
    });
  });

  // Animaciones con Intersection Observer
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      el.classList.toggle('show', entry.isIntersecting);
    });
  }, { threshold: 0.4 });
  revealElements.forEach(el => observer.observe(el));

  // POPUP DE PROMOCIONES
  let promoCount = 0;
  let maxCookies = 0;

  const popupOverlay = document.getElementById("popupOverlay");
  const promoQuantityDisplay = popupOverlay?.querySelector(".cookie-quantity .qty-number");
  const cookieQuantityDisplays = popupOverlay?.querySelectorAll(".cookie-card .cookie-quantity .qty-number");

  const openPopupButton = document.getElementById("openPopup");
  openPopupButton?.addEventListener('click', () => {
    popupOverlay.style.display = 'flex';
  });

  const popupCloseButton = popupOverlay?.querySelector(".close-popup");
  popupCloseButton?.addEventListener('click', () => {
    popupOverlay.style.display = 'none';
  });

  function updateMaxCookies() {
    maxCookies = promoCount * 3;
    if (promoQuantityDisplay) promoQuantityDisplay.textContent = promoCount;

    cookieQuantityDisplays?.forEach((display) => {
      const currentQty = parseInt(display.textContent);
      const newQty = Math.min(currentQty, maxCookies);
      display.textContent = newQty;
    });
  }

  const promoControls = popupOverlay?.querySelector(".cookie-quantity .quantity-controls");
  const promoPlus = promoControls?.querySelector(".qty-btn-positive");
  const promoMinus = promoControls?.querySelector(".qty-btn-negative");

  promoPlus?.addEventListener('click', () => {
    if (promoCount < 3) {
      promoCount++;
      updateMaxCookies();
    }
  });

  promoMinus?.addEventListener('click', () => {
    if (promoCount > 0) {
      promoCount--;
      updateMaxCookies();
    }
  });

  // Controles de cantidad de galletas en el popup
  popupOverlay?.querySelectorAll(".cookie-card .cookie-quantity").forEach(control => {
    const btnAdd = control.querySelector('.qty-btn-positive');
    const btnSubtract = control.querySelector('.qty-btn-negative');
    const qtyDisplay = control.querySelector('.qty-number');

    btnAdd?.addEventListener('click', () => {
      const currentQty = parseInt(qtyDisplay.textContent);
      const title = control.closest('.cookie-card')?.querySelector('.cookie-title')?.textContent.trim().replace('Galleta ', '');
      const maxStock = Math.min(inventario[title] ?? Infinity, maxCookies);

      const totalQtyInPopup = Array.from(cookieQuantityDisplays).reduce((acc, span) => acc + parseInt(span.textContent), 0);

      if (totalQtyInPopup >= maxCookies) {
        mostrarMensaje(`Solo puedes agregar hasta ${maxCookies} galletas en total en esta promoción.`);
        return;
      }

      if (currentQty < maxStock) {
        qtyDisplay.textContent = currentQty + 1;
      } else {
        mostrarMensaje(`Has alcanzado el máximo permitido para ${title}`);
      }
    });

    btnSubtract?.addEventListener('click', () => {
      const currentQty = parseInt(qtyDisplay.textContent);
      if (currentQty > 0) {
        qtyDisplay.textContent = currentQty - 1;
      }
    });
  });

  // Botones de comprar en el popup
  document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', () => {
      const cards = document.querySelectorAll('#popupOverlay .cookie-card');
      let cantidades = {};

      cards.forEach(card => {
        const title = card.querySelector('.cookie-title')?.textContent.trim().replace('Galleta ', '');
        const qty = card.querySelector('.qty-number')?.textContent.trim();
        if (title && qty !== null) {
          cantidades[title] = parseInt(qty, 10);
        }
      });

      const params = new URLSearchParams();
      for (const [nombre, cantidad] of Object.entries(cantidades)) {
        params.append(nombre, cantidad);
      }

      window.location.href = "Check.html?" + params.toString();
    });
  });

  // Botones de comprar en tarjetas normales
  document.querySelectorAll('.cookie-card .button:not(.buy-btn)').forEach(button => {
    button.addEventListener('click', () => {
      const cards = document.querySelectorAll('section.cookies-container .cookie-card');
      let cantidades = {};

      cards.forEach(card => {
        const title = card.querySelector('.cookie-title')?.textContent.trim().replace('Galleta ', '');
        const qty = card.querySelector('.qty-number')?.textContent.trim();
        if (title && qty !== null) {
          cantidades[title] = parseInt(qty, 10);
        }
      });

      const params = new URLSearchParams();
      for (const [nombre, cantidad] of Object.entries(cantidades)) {
        params.append(nombre, cantidad);
      }

      window.location.href = "Check.html?" + params.toString();
    });
  });



  updateMaxCookies(); // Inicializar

  paginaCargada = true; // <- Agrega esta línea justo antes del cierre
});

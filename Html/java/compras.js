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

// Verificar si el usuario está logueado
function verificarLogin() {
  const usuarioLogeado = localStorage.getItem('usuarioLogeado');
  if (!usuarioLogeado) {
    alert("Debes iniciar sesión antes de continuar.");
    window.location.href = 'Login.html'; // Redirige al login si no está logueado
    return false; // Detener ejecución si no está logueado
  }
  return usuarioLogeado;
}

window.addEventListener('DOMContentLoaded', () => {
  // Verificar si el usuario está logueado
  const usuarioLogeado = verificarLogin();
  if (!usuarioLogeado) return;

  // Mostrar el inventario en las tarjetas de galletas normales
  for (const galleta in inventario) {
    const stockElement = document.getElementById(`stock-${galleta}`);
    if (stockElement) {
      stockElement.textContent = `Stock disponible: ${inventario[galleta]}`;
    }
  }

  // Cambiar el botón de "Iniciar sesión" por el botón de "Mi perfil" si está logueado
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuarioEncontrado = usuarios.find(usuario => usuario.correo === usuarioLogeado);

  if (usuarioLogeado && usuarioEncontrado) {
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

  // Función para actualizar el inventario y las cantidades
  function actualizarCantidad(galleta, cantidad) {
    // Limitar la cantidad según el inventario disponible
    if (cantidad > inventario[galleta]) {
      cantidad = inventario[galleta]; // Asegurarse de no exceder el inventario
    }
    return cantidad;
  }

  // Controles de cantidad en tarjetas normales
  document.querySelectorAll('.cookie-card .quantity-controls').forEach(control => {
    const btnAdd = control.querySelector('.qty-btn-positive');
    const btnSubtract = control.querySelector('.qty-btn-negative');
    const qtyDisplay = control.querySelector('.qty-number');

    // Depuración: Verificar los elementos de los controles
    console.log('btnAdd:', btnAdd);
    console.log('btnSubtract:', btnSubtract);
    console.log('qtyDisplay:', qtyDisplay);

 // Asegurarse de que los botones y la cantidad existan
 if (btnAdd && qtyDisplay) {
  btnAdd.addEventListener('click', () => {
    let currentQty = parseInt(qtyDisplay.textContent) || 0;  // Asegurarse de que currentQty sea un número

    const title = control.closest('.cookie-card')?.querySelector('.cookie-title')?.textContent.trim().replace('Galleta ', '');
    const maxStock = inventario[title] ?? Infinity;  // Obtenemos el stock máximo disponible

    console.log('Current Quantity:', currentQty); // Depuración
    console.log('Max Stock:', maxStock); // Depuración

    if (currentQty < maxStock) {
      currentQty++;  // Aumentamos la cantidad
      qtyDisplay.textContent = currentQty;  // Actualizamos la cantidad visualmente en el DOM
    } else {
      mostrarMensaje(`Has alcanzado el máximo de ${maxStock} en inventario para ${title}`);
    }
  });
}

if (btnSubtract && qtyDisplay) {
  btnSubtract.addEventListener('click', () => {
    let currentQty = parseInt(qtyDisplay.textContent) || 0;  // Asegurarse de que currentQty sea un número
    if (currentQty > 0) {
      currentQty--;  // Disminuimos la cantidad
      qtyDisplay.textContent = currentQty;  // Actualizamos la cantidad visualmente en el DOM
    }
  });
}
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
      const usuarioLogeado = verificarLogin();
      if (!usuarioLogeado) return;

      const cards = document.querySelectorAll('#popupOverlay .cookie-card');
      let cantidades = {};

      cards.forEach(card => {
        const title = card.querySelector('.cookie-title')?.textContent.trim().replace('Galleta ', '');
        const qtyDisplay = card.querySelector('.qty-number');
        const qty = qtyDisplay ? parseInt(qtyDisplay.textContent.trim()) : 0;  // Obtener cantidad

        // Verificar si la cantidad es mayor que 0 antes de agregarla
        if (title && qty > 0) {
          cantidades[title] = qty;
        }
      });

      // Comprobar si tenemos cantidades para pasar
      if (Object.keys(cantidades).length === 0) {
        mostrarMensaje("Debes seleccionar al menos una galleta para comprar.");
        return;
      }

      // Depuración: Mostrar las cantidades que se están pasando
      console.log("Cantidades seleccionadas para la compra:", cantidades);

      // Generar los parámetros de la URL correctamente
      const params = new URLSearchParams();
      for (const [nombre, cantidad] of Object.entries(cantidades)) {
        params.append(nombre, cantidad);
      }

      // Verificar si los parámetros se están agregando correctamente
      console.log("Parámetros generados para la URL:", params.toString());

      // Redirigir a Check.html con los parámetros generados
      window.location.href = "Check.html?" + params.toString();
    });
  });

  updateMaxCookies(); // Inicializar

  paginaCargada = true; // <- Agrega esta línea justo antes del cierre
});

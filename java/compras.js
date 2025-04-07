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
      icon: "../Galletas-Sunkissed/Imagenes/galletaChips.svg"
    });
  } else {
    alert(mensaje);
  }
}

// Verificar si el usuario está logueado
function verificarLogin() {
  const usuarioLogeado = localStorage.getItem('usuarioLogeado');
  if (!usuarioLogeado) {
    alert("Debes iniciar sesión antes de continuar.");
    window.location.href = '../Galletas-Sunkissed/Login.html';
    return false;
  }
  return usuarioLogeado;
}

window.addEventListener('DOMContentLoaded', () => {
  const usuarioLogeado = verificarLogin();
  if (!usuarioLogeado) return;

  for (const galleta in inventario) {
    const stockElement = document.getElementById(`stock-${galleta}`);
    if (stockElement) {
      stockElement.textContent = `Stock disponible: ${inventario[galleta]}`;
    }
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuarioEncontrado = usuarios.find(usuario => usuario.correo === usuarioLogeado);

  if (usuarioLogeado && usuarioEncontrado) {
    const loginButton = document.querySelector('.header .button');
    if (loginButton) {
      loginButton.textContent = 'Ir a mi perfil';
      loginButton.onclick = function () {
        window.location.href = '../Galletas-Sunkissed/Perfil.html';
      };
    }
  }

  function actualizarCantidad(galleta, cantidad) {
    if (cantidad > inventario[galleta]) {
      cantidad = inventario[galleta];
    }
    return cantidad;
  }

  document.querySelectorAll('.cookie-card .quantity-controls').forEach(control => {
    const btnAdd = control.querySelector('.qty-btn-positive');
    const btnSubtract = control.querySelector('.qty-btn-negative');
    const qtyDisplay = control.querySelector('.qty-number');

    if (btnAdd && qtyDisplay) {
      btnAdd.addEventListener('click', () => {
        let currentQty = parseInt(qtyDisplay.textContent) || 0;
        const title = control.closest('.cookie-card')?.querySelector('.cookie-title')?.textContent.trim().replace('Galleta ', '');
        const maxStock = inventario[title] ?? Infinity;

        if (currentQty < maxStock) {
          currentQty++;
          qtyDisplay.textContent = currentQty;
        } else {
          mostrarMensaje(`Has alcanzado el máximo de ${maxStock} en inventario para ${title}`);
        }
      });
    }

    if (btnSubtract && qtyDisplay) {
      btnSubtract.addEventListener('click', () => {
        let currentQty = parseInt(qtyDisplay.textContent) || 0;
        if (currentQty > 0) {
          currentQty--;
          qtyDisplay.textContent = currentQty;
        }
      });
    }
  });

  if (window.innerWidth > 768) {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        el.classList.toggle('show', entry.isIntersecting);
      });
    }, { threshold: 0.4 });
  
    revealElements.forEach(el => observer.observe(el));
  } else {
    // Si estás en móvil, puedes forzar que todos se muestren directamente
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('show'));
  }
  

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

  popupOverlay?.querySelectorAll(".cookie-card .cookie-quantity").forEach(control => {
    const btnAdd = control.querySelector('.qty-btn-positive');
    const btnSubtract = control.querySelector('.qty-btn-negative');
    const qtyDisplay = control.querySelector('.qty-number');

    btnAdd?.addEventListener('click', () => {
      const currentQty = parseInt(qtyDisplay.textContent);
      const title = control.closest('.cookie-card')?.querySelector('.cookie-title')?.textContent.trim().replace('Galleta ', '');
      const maxStock = inventario[title] ?? Infinity;

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

  document.querySelectorAll('.buy-btn').forEach(button => {
    button.addEventListener('click', () => {
      const usuarioLogeado = verificarLogin();
      if (!usuarioLogeado) return;

      const cards = document.querySelectorAll('#popupOverlay .cookie-card');
      let cantidades = {};

      cards.forEach(card => {
        const title = card.querySelector('.cookie-title')?.textContent.trim().replace('Galleta ', '');
        const qtyDisplay = card.querySelector('.qty-number');
        const qty = qtyDisplay ? parseInt(qtyDisplay.textContent.trim()) : 0;

        if (title && qty > 0) {
          cantidades[title] = qty;
        }
      });

      if (Object.keys(cantidades).length === 0) {

        return;
      }

      const params = new URLSearchParams();
      for (const [nombre, cantidad] of Object.entries(cantidades)) {
        params.append(nombre, cantidad);
      }

      window.location.href = "../Galletas-Sunkissed/Check.html?" + params.toString();
    });
  });

  updateMaxCookies();

  paginaCargada = true;
  updateMaxCookies(); // Inicializar
// Botones de comprar en las tarjetas normales (fuera del popup)
document.querySelectorAll('.cookie-card .buy-btn').forEach(button => {
  button.addEventListener('click', () => {
    const usuarioLogeado = verificarLogin();
    if (!usuarioLogeado) return;

    const cantidades = {};

    document.querySelectorAll('.cookie-card').forEach(card => {
      const title = card.querySelector('.cookie-title')?.textContent.trim().replace('Galleta ', '');
      const qtyDisplay = card.querySelector('.qty-number');
      const qty = qtyDisplay ? parseInt(qtyDisplay.textContent.trim()) || 0 : 0;

      if (title && qty > 0) {
        cantidades[title] = qty;
      }
    });

    // Validar si hay alguna galleta seleccionada
    if (Object.keys(cantidades).length === 0) {
     
      return;
    }

    // Redirigir con parámetros a Check.html
    const params = new URLSearchParams();
    for (const [nombre, cantidad] of Object.entries(cantidades)) {
      params.append(nombre, cantidad);
    }

    window.location.href = "../Galletas-Sunkissed/Check.html?" + params.toString();
  });
});


  const cancelPopupButton = document.getElementById("cancelPopup");
  cancelPopupButton?.addEventListener("click", () => {
  popupOverlay.style.display = "none";
});
});

let paginaCargada = false;

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

function actualizarCantidad(galleta, cantidad) {
  if (cantidad > inventario[galleta]) {
    cantidad = inventario[galleta];
  }
  return cantidad;
}

// Controladores para + / - en tarjetas normales
document.querySelectorAll('.cookie-card .quantity-controls').forEach(control => {
  const btnAdd = control.querySelector('.qty-btn-positive');
  const btnSubtract = control.querySelector('.qty-btn-negative');
  const qtyDisplay = control.querySelector('.qty-number');

  if (btnAdd && qtyDisplay) {
    btnAdd.addEventListener('click', (event) => {
      event.stopPropagation();
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
    btnSubtract.addEventListener('click', (event) => {
      event.stopPropagation();
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

const cancelPopupBtn = document.getElementById('cancelPopup');
cancelPopupBtn?.addEventListener('click', () => {
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

promoPlus?.addEventListener('click', (event) => {
  event.stopPropagation();
  if (promoCount < 3) {
    promoCount++;
    updateMaxCookies();
  }
});

promoMinus?.addEventListener('click', (event) => {
  event.stopPropagation();
  if (promoCount > 0) {
    promoCount--;
    updateMaxCookies();
  }
});

// Controladores + / - para cantidades dentro del popup, respetando maxCookies y stock
popupOverlay?.querySelectorAll(".cookie-card .cookie-quantity").forEach(control => {
  const btnAdd = control.querySelector('.qty-btn-positive');
  const btnSubtract = control.querySelector('.qty-btn-negative');
  const qtyDisplay = control.querySelector('.qty-number');

  btnAdd?.addEventListener('click', (event) => {
    event.stopPropagation();
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

  btnSubtract?.addEventListener('click', (event) => {
    event.stopPropagation();
    const currentQty = parseInt(qtyDisplay.textContent);
    if (currentQty > 0) {
      qtyDisplay.textContent = currentQty - 1;
    }
  });
});

// COMPRAR desde el popup con botón #confirmPurchase
const confirmPurchaseBtn = document.getElementById('confirmPurchase');
confirmPurchaseBtn?.addEventListener('click', () => {
  const cards = document.querySelectorAll('#popupOverlay .cookie-card');
  let cantidades = {};

  cards.forEach(card => {
    const title = card.querySelector('.cookie-title')?.textContent.trim().replace('Galleta ', '');
    const qtyDisplay = card.querySelector('.qty-number');
    const qty = qtyDisplay ? parseInt(qtyDisplay.textContent.trim()) : 0;

    if (title && qty > 0) {
      cantidades[title.toLowerCase()] = qty;
    }
  });

  if (Object.keys(cantidades).length === 0) {
    mostrarMensaje('Selecciona al menos una galleta para comprar.');
    return;
  }

  fetch('../Galletas-Sunkissed/guardar_pedido.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(cantidades)
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'ok') {
      window.location.href = '../Galletas-Sunkissed/Check.php';
    } else {
      mostrarMensaje('Error al guardar el pedido: ' + data.message);
      console.error('Error detalle:', data.message);
    }
  })
  .catch(error => {
    mostrarMensaje('Error en la solicitud: ' + error);
    console.error('Fetch error:', error);
  });
});

updateMaxCookies();
paginaCargada = true;

// COMPRAR desde tarjetas normales (fuera del popup)
document.querySelectorAll('.cookie-card .buy-btn').forEach(button => {
  button.addEventListener('click', () => {
    const cantidades = {};

    document.querySelectorAll('.cookie-card').forEach(card => {
      const title = card.querySelector('.cookie-title')?.textContent.trim().replace('Galleta ', '');
      const qtyDisplay = card.querySelector('.qty-number');
      const qty = qtyDisplay ? parseInt(qtyDisplay.textContent.trim()) || 0 : 0;

      if (title && qty > 0) {
        cantidades[title.toLowerCase()] = qty;
      }
    });

    if (Object.keys(cantidades).length === 0) return;

    fetch('../Galletas-Sunkissed/guardar_pedido.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(cantidades)
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        window.location.href = '../Galletas-Sunkissed/Check.php';
      } else {
        mostrarMensaje('Error al guardar el pedido.');
      }
    })
    .catch(() => mostrarMensaje('Error de conexión al guardar el pedido.'));
  });
});

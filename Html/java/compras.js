
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
  });

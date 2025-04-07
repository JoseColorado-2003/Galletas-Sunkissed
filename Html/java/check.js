document.addEventListener('DOMContentLoaded', () => {
  const usuarioLogeado = localStorage.getItem('usuarioLogeado');

  if (!usuarioLogeado) {
    alert("Por favor, inicie sesión para realizar el pedido.");
    window.location.href = 'Login.html';
    return;
  }

  const usuarios = JSON.parse(localStorage.getItem('usuarios'));
  const usuario = usuarios ? usuarios.find(u => u.correo === usuarioLogeado) : null;

  if (!usuario) {
    alert("No se encontró el usuario. Por favor, inicia sesión nuevamente.");
    window.location.href = 'Login.html';
    return;
  }

  if (!usuario.nombre || !usuario.correo) {
    alert("Faltan datos del usuario. Por favor, actualiza tu información.");
    window.location.href = 'Login.html';
    return;
  }

  const urlParams = new URLSearchParams(window.location.search);
  const cantidades = {};

  urlParams.forEach((value, key) => {
    cantidades[key] = parseInt(value, 10);
  });

  if (Object.keys(cantidades).length === 0) {
    alert("No has seleccionado ningún pedido.");
    window.location.href = 'index.html';
    return;
  }

  const tbody = document.querySelector('.pedido-table tbody');
  tbody.innerHTML = '';

  for (const tipoGalleta in cantidades) {
    const cantidad = cantidades[tipoGalleta];
    if (cantidad > 0) {
      const row = document.createElement('tr');
      row.classList.add('pedido-row');
      row.innerHTML = `
        <td>${usuario.nombre}</td>
        <td>${usuario.correo}</td>
        <td>${tipoGalleta}</td>
        <td>${cantidad}</td>
      `;
      tbody.appendChild(row);
    }
  }

  function confirmarPedido() {
    const filas = document.querySelectorAll('.pedido-row');
    let mensaje = 'Hola, quiero confirmar mi pedido:\n';

    filas.forEach((fila, index) => {
      const nombre = fila.querySelector('td:nth-child(1)').textContent.trim();
      const correo = fila.querySelector('td:nth-child(2)').textContent.trim();
      const tipoGalleta = fila.querySelector('td:nth-child(3)').textContent.trim();
      const cantidad = fila.querySelector('td:nth-child(4)').textContent.trim();

      if (index > 0) mensaje += '\n';

      mensaje += `${index + 1}. Nombre: ${nombre}\nCorreo: ${correo}\nTipo de Galleta: ${tipoGalleta}\nCantidad: ${cantidad} galletas`;
    });

    const mensajeCodificado = encodeURIComponent(mensaje);
    const telefonoWhatsApp = '573173599389'; // Asegúrate de que este número esté correcto

    const enlaceWhatsApp = `https://wa.me/${telefonoWhatsApp}?text=${mensajeCodificado}`;
    window.open(enlaceWhatsApp, '_blank');

    // Redirigir a Compras.html después de 1.5 segundos
    setTimeout(() => {
      window.location.href = 'Compras.html';
    }, 1500);
  }

  document.getElementById('confirmarPedido').addEventListener('click', confirmarPedido);
});

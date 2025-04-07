document.addEventListener('DOMContentLoaded', () => {
    // Verificamos si el usuario está registrado en el localStorage
    const usuarioLogeado = localStorage.getItem('usuarioLogeado');
    
    if (!usuarioLogeado) {
      // Si no está logueado, mostramos un mensaje o lo redirigimos al login
      alert("Por favor, inicie sesión para realizar el pedido.");
      window.location.href = 'Login.html';  // Redirige al login si no está logeado
      return;
    }
  
    // Extraemos los datos del usuario del localStorage
    const usuarios = JSON.parse(localStorage.getItem('usuarios'));
  
    // Verificamos que el usuario exista y tenga los datos necesarios
    const usuario = usuarios ? usuarios.find(u => u.correo === usuarioLogeado) : null;
  
    if (!usuario) {
      alert("No se encontró el usuario. Por favor, inicia sesión nuevamente.");
      window.location.href = 'Login.html';  // Redirige al login si no se encuentra el usuario
      return;
    }
  
    // Verificamos que el usuario tenga las propiedades necesarias
    if (!usuario.nombre || !usuario.correo) {
      alert("Faltan datos del usuario. Por favor, actualiza tu información.");
      window.location.href = 'Login.html';  // Redirige al login si faltan datos
      return;
    }
  
    // Extraemos las cantidades de galletas de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const cantidades = {};
  
    urlParams.forEach((value, key) => {
      cantidades[key] = parseInt(value, 10);
    });
  
    // Verificamos que haya al menos un tipo de galleta seleccionado
    if (Object.keys(cantidades).length === 0) {
      alert("No has seleccionado ningún pedido.");
      window.location.href = 'index.html';  // Redirige al inicio si no se seleccionaron galletas
      return;
    }
  
    // Rellenamos la tabla con los datos extraídos
    const tbody = document.querySelector('.pedido-table tbody');
    tbody.innerHTML = '';  // Limpiamos la tabla en caso de que haya filas anteriores
  
    for (const tipoGalleta in cantidades) {
      const cantidad = cantidades[tipoGalleta];
      if (cantidad > 0) {
        const row = document.createElement('tr');
        row.classList.add('pedido-row');
        
        // Rellenamos la fila con el nombre y correo del usuario
        row.innerHTML = `
          <td>${usuario.nombre}</td>
          <td>${usuario.correo}</td>
          <td>${tipoGalleta}</td>
          <td>${cantidad}</td>
        `;
        
        tbody.appendChild(row);
      }
    }
  
    // Función para confirmar el pedido
    function confirmarPedido() {
      const filas = document.querySelectorAll('.pedido-row');
      let mensaje = 'Hola, quiero confirmar mi pedido:\n';
  
      filas.forEach((fila, index) => {
        const nombre = fila.querySelector('td:nth-child(1)').textContent.trim();
        const correo = fila.querySelector('td:nth-child(2)').textContent.trim();
        const tipoGalleta = fila.querySelector('td:nth-child(3)').textContent.trim();
        const cantidad = fila.querySelector('td:nth-child(4)').textContent.trim();
  
        if (index > 0) {
          mensaje += '\n';  // Añadir salto de línea entre pedidos
        }
  
        // Construir el mensaje con los detalles del pedido
        mensaje += `${index + 1}. Nombre: ${nombre}\nCorreo: ${correo}\nTipo de Galleta: ${tipoGalleta}\nCantidad: ${cantidad} galletas`;
      });
  
      // Codificar el mensaje para URL, reemplazando los saltos de línea con %0A (WhatsApp lo entiende correctamente)
      const mensajeCodificado = encodeURIComponent(mensaje);
  
      // Número de WhatsApp al que se enviará el mensaje
      const telefonoWhatsApp = '549XXXXXXXXX'; // Reemplazar con el número de WhatsApp correcto
  
      // Crear el enlace de WhatsApp con el mensaje codificado
      const enlaceWhatsApp = `https://wa.me/${telefonoWhatsApp}?text=${mensajeCodificado}`;
  
      // Redirigir al usuario al enlace de WhatsApp
      window.open(enlaceWhatsApp, '_blank');
    }
  
    // Asignar la función de confirmarPedido al botón
    document.getElementById('confirmarPedido').addEventListener('click', confirmarPedido);
  });
  
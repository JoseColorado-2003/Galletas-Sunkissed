// Aquí puedes agregar interactividad, si lo deseas
// Ejemplo: Función para confirmar el pedido
function confirmarPedido() {
    alert("¡Tu pedido ha sido confirmado!");
  }
  document.getElementById("confirmarPedido").addEventListener("click", function() {
    // Obtener todas las filas de los pedidos
    const filas = document.querySelectorAll('.pedido-row');
    let mensaje = 'Hola, quiero confirmar mi pedido:\n';

    // Recorrer cada fila para agregar los detalles del pedido
    filas.forEach((fila, index) => {
        const nombre = fila.querySelector('td:nth-child(1)').textContent.trim();
        const correo = fila.querySelector('td:nth-child(2)').textContent.trim();
        const tipoGalleta = fila.querySelector('td:nth-child(3)').textContent.trim();
        const cantidad = fila.querySelector('td:nth-child(4)').textContent.trim();

        // Agregar los detalles del pedido
        if (index > 0) {
            mensaje += '\n';  // Añadir salto de línea entre pedidos
        }

        // Construir el mensaje con los detalles del pedido en un formato más legible
        mensaje += `${index + 1}. Nombre: ${nombre}\nCorreo: ${correo}\nTipo de Galleta: ${tipoGalleta}\nCantidad: ${cantidad} galletas`;
    });

    // Codificar el mensaje para URL, reemplazando los saltos de línea con %0A (WhatsApp lo entiende correctamente)
    const mensajeCodificado = encodeURIComponent(mensaje);

    // Número de WhatsApp al que se enviará el mensaje
    const telefonoWhatsApp = '549XXXXXXXXX'; // Reemplazar con el número de WhatsApp correcto

    // Crear el enlace de WhatsApp con el mensaje codificado
    const enlaceWhatsApp = `https://wa.me/${+573113812713}?text=${mensajeCodificado}`;

    // Redirigir al usuario al enlace de WhatsApp
    window.open(enlaceWhatsApp, '_blank');
});



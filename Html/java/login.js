document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Evita el envío tradicional del formulario

    const usuario = document.getElementById('usuario').value.trim(); // Eliminar espacios al inicio y al final
    const contrasena = document.getElementById('contrasena').value.trim(); // Eliminar espacios al inicio y al final

    // Recuperar el array de usuarios desde localStorage y parsear correctamente
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; // Si no existe, usar un array vacío

    // Verificar si el usuario es "admin"
    if (usuario === "admin" && contrasena === "admin") {
      alert("¡Bienvenido, Admin!");

      // Guardamos el usuario "admin" en localStorage
      localStorage.setItem('usuarioLogeado', 'admin');

      // Redirigir al panel de administración
      window.location.href = 'Admin.html'; // Redirige a la página Admin.html
      return; // Termina la ejecución aquí si es admin
    }

    // Buscar el usuario en el array por correo y contraseña
    const usuarioEncontrado = usuarios.find(u => u.correo === usuario && u.contrasena === contrasena);

    if (usuarioEncontrado) {
      alert("¡Inicio de sesión exitoso!");

      // Guardamos el correo del usuario logeado antes de redirigir
      localStorage.setItem('usuarioLogeado', usuario);

      // Redirigir a la página principal
      window.location.href = '../Html/Main.html'; // Cambia la ruta si es necesario
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });
});

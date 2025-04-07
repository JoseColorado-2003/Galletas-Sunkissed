document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

    if (usuario === "admin" && contrasena === "admin") {
      alert("¡Bienvenido, Admin!");
      localStorage.setItem('usuarioLogeado', 'admin');
      window.location.href = '../Galletas-Sunkissed/Admin.html';
      return;
    }

    const usuarioEncontrado = usuarios.find(u => u.correo === usuario && u.contrasena === contrasena);

    if (usuarioEncontrado) {
      alert("¡Inicio de sesión exitoso!");
      localStorage.setItem('usuarioLogeado', usuario); // Guarda el correo
      window.location.href = '../Galletas-Sunkissed/index.html';
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  });
});

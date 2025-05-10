document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const correo = document.getElementById('correo').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();
    const errorBox = document.getElementById('errorBox');

    // Verifica si es el admin
    if (correo === "admin@hotmail.com" && contrasena === "admin") {
      localStorage.setItem('usuarioLogeado', 'admin');
      window.location.href = '../Galletas-Sunkissed/Admin.html';
      return;
    }

    // Validar formato de correo
    if (!correo.includes('@')) {
      mostrarError("Por favor ingresa un correo válido.");
      return;
    }

    // Envía el formulario al PHP para validar usuarios normales
    this.submit();
  });

  function mostrarError(mensaje) {
    let errorBox = document.getElementById('errorBox');
    if (!errorBox) {
      errorBox = document.createElement('div');
      errorBox.id = 'errorBox';
      errorBox.style.color = 'red';
      errorBox.style.marginTop = '10px';
      document.querySelector('.login-box').appendChild(errorBox);
    }
    errorBox.textContent = mensaje;
  }
});

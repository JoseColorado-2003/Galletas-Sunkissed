document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('registerForm').addEventListener('submit', function (e) {
      e.preventDefault(); // Evita el envío tradicional del formulario
  
      // Obtener los valores del formulario de registro
      const nombre = document.getElementById('nombre').value;
      const correo = document.getElementById('correo').value;
      const contrasena = document.getElementById('contrasena').value;
      const confirmarContrasena = document.getElementById('confirmarContrasena').value;
  
      // Validar que las contraseñas coincidan
      if (contrasena !== confirmarContrasena) {
          alert("Las contraseñas no coinciden.");
          return;
      }
  
      // Crear un objeto con la información del usuario
      const usuario = {
          nombre: nombre,
          correo: correo,
          contrasena: contrasena
      };
  
      // Recuperar el array de usuarios almacenados en localStorage
      let usuarios = JSON.parse(localStorage.getItem('usuarios')) || []; // Si no existe, usar un array vacío
  
      // Verificar si el usuario ya existe en el array (por correo)
      const usuarioExistente = usuarios.find(u => u.correo === correo);
      if (usuarioExistente) {
          alert("Ya existe un usuario con ese correo.");
          return;
      }
  
      // Agregar el nuevo usuario al array
      usuarios.push(usuario);
  
      // Guardar el array actualizado en localStorage como string
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
  
      alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
      window.location.href = '../Galletas-Sunkissed/Login.html'; // Redirigir a la página de login después del registro
    });
  });
  
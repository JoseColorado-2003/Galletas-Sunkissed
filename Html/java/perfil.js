document.addEventListener("DOMContentLoaded", () => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const correoLogeado = localStorage.getItem("usuarioLogeado");
  
    if (!correoLogeado) {
      alert("No has iniciado sesión.");
      window.location.href = "main.html";
      return;
    }
  
    const usuario = usuarios.find(u => u.correo === correoLogeado);
  
    if (!usuario) {
      alert("Usuario no encontrado.");
      window.location.href = "main.html";
      return;
    }
  
    // Mostrar datos en el HTML
    document.getElementById("nombre-usuario").textContent = usuario.nombre;
    document.getElementById("correo-usuario").textContent = usuario.correo;
    document.getElementById("historial-usuario").textContent =
      usuario.historial?.join(", ") || "Sin compras";
  
    // Botón adicional para cerrar sesión completamente
    const btnCerrarCompleto = document.createElement("button");
    btnCerrarCompleto.textContent = "Cerrar sesión completamente";
    btnCerrarCompleto.className = "button logout";
    document.querySelector(".profile-buttons").appendChild(btnCerrarCompleto);
  
    // Botón original "Cerrar Sesión"
    const btnCerrarSesion = document.getElementById("cerrar-sesion-btn");
  
    // Cerrar sesión parcial (solo redirigir)
    btnCerrarSesion.addEventListener("click", () => {
      window.location.href = "main.html";
    });
  
    // Cerrar sesión completamente (borrar localStorage)
    btnCerrarCompleto.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogeado");
      alert("Sesión finalizada completamente.");
      window.location.href = "main.html";
    });
  });
  
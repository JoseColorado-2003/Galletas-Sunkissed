document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogeado"));

  if (!usuario) {
    alert("No has iniciado sesión.");
    window.location.href = "../Galletas-Sunkissed/index.html";
    return;
  }

  // Mostrar datos en el HTML
  document.getElementById("nombre-usuario").textContent = usuario.nombre;
  document.getElementById("correo-usuario").textContent = usuario.correo;

  // Botón para cerrar sesión
  const btnCerrarSesion = document.getElementById("cerrar-sesion-btn");

  // Cerrar sesión (redirigir)
  btnCerrarSesion.addEventListener("click", () => {
    window.location.href = "../Galletas-Sunkissed/index.html";
  });

  // Botón adicional para cerrar sesión completamente
  const btnCerrarCompleto = document.createElement("button");
  btnCerrarCompleto.textContent = "Cerrar sesión completamente";
  btnCerrarCompleto.className = "button logout";
  document.querySelector(".profile-buttons").appendChild(btnCerrarCompleto);

  btnCerrarCompleto.addEventListener("click", () => {
    localStorage.removeItem("usuarioLogeado");
    alert("Sesión finalizada completamente.");
    window.location.href = "../Galletas-Sunkissed/index.html";
  });
});

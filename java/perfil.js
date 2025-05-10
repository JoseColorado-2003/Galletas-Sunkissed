document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogeado"));
  console.log("Usuario cargado desde localStorage:", usuario); // <--- Ver en consola

  if (!usuario) {
    alert("No has iniciado sesión.");
    window.location.href = "../Galletas-Sunkissed/index.html";
    return;
  }

  // Mostrar datos en el HTML
  document.getElementById("nombre-usuario").textContent = usuario.nombre;
  document.getElementById("correo-usuario").textContent = usuario.correo;

  // Botón para cerrar sesión (volver)
  const btnCerrarSesion = document.getElementById("cerrar-sesion-btn");
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

  // === AGREGAR BOTÓN DE ADMIN ===
  if (usuario.nombre === "Admin" && usuario.correo === "admin") {
    console.log("Usuario admin detectado. Mostrando botón de administración."); // <---
    const btnAdmin = document.createElement("button");
    btnAdmin.textContent = "Panel de Administración";
    btnAdmin.className = "button";
    btnAdmin.addEventListener("click", () => {
      window.location.href = "../Galletas-Sunkissed/admin.html";
    });
    document.querySelector(".profile-buttons").appendChild(btnAdmin);
  } else {
    console.log("No es admin. No se muestra botón.");
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const usuarioLogeado = localStorage.getItem('usuarioLogeado');
 console.log("Usuario logeado:", usuarioLogeado);
  document.getElementById('confirmarPedido').addEventListener('click', confirmarPedido);
});

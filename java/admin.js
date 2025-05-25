console.log("El archivo admin.js se está cargando correctamente");

// Cargar los usuarios desde el servidor
function cargarUsuarios(filtros = {}) {
  // Validar los filtros antes de usarlos
  const params = new URLSearchParams(filtros);

  // Verificar si los filtros están vacíos antes de agregar el parámetro
  let url = 'obtenerUsuarios.php';
  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  console.log("Solicitud a:", url); // Verifica la URL que se está llamando
  
  fetch(url)
  .then(response => {
    if (!response.ok) {
      console.error("Error en la respuesta:", response.statusText);
      throw new Error("Error en la solicitud");
    }
    console.log("Respuesta recibida", response);  // Agrega esta línea para ver la respuesta
    return response.json();
  })
  .then(usuarios => {
    console.log(usuarios);  // Verifica los datos recibidos

    const tbody = document.querySelector('#adminTable tbody');
    tbody.innerHTML = '';  // Limpiar la tabla antes de agregar los usuarios

    // Si no hay usuarios, mostrar un mensaje
    if (usuarios.length === 0) {
      const tr = document.createElement('tr');
      tr.innerHTML = '<td colspan="3">No se encontraron usuarios</td>';
      tbody.appendChild(tr);
      return; // Salir para no continuar con el forEach
    }

    // Agregar los usuarios a la tabla
    usuarios.forEach(usuario => {
      const tr = document.createElement('tr');

      // Crear las celdas con los datos del usuario y botón "Compras"
      tr.innerHTML = `
        <td>${usuario.IDnombre}</td>
        <td>${usuario.IDcorreo}</td>
        <td>
          <button onclick="window.location.href='comprasUsuario.html?id=${usuario.IDusuario}'">Compras</button>
        </td>
      `;

      tbody.appendChild(tr);  // Agregar la fila a la tabla
    });
  })
  .catch(error => {
    console.error('Error al cargar usuarios:', error);
  });
}

console.log("La función cargarUsuarios está siendo llamada");

// Cargar los filtros de la base de datos
function cargarFiltros() {
  fetch('obtenerUsuarios.php')  // Obtener todos los usuarios para los filtros
    .then(response => response.json())
    .then(usuarios => {
      // Obtener los valores únicos de nombre y correo para los filtros
      const nombres = new Set();
      const correos = new Set();

      usuarios.forEach(usuario => {
        nombres.add(usuario.IDnombre);
        correos.add(usuario.IDcorreo);
      });

      // Llenar los filtros con las opciones
      fillSelect('filtroNombre', nombres);
      fillSelect('filtroCorreo', correos);
    })
    .catch(error => {
      console.error('Error al cargar los filtros:', error);
    });
}

// Llenar un select con opciones
function fillSelect(id, options) {
  const select = document.getElementById(id);
  if (!select) return;
  select.innerHTML = `<option value="">Filtrar por ${id === 'filtroNombre' ? 'nombre' : 'correo'}</option>`;  // Limpiar opciones previas
  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.textContent = option;
    select.appendChild(opt);
  });
}

// Aplicar los filtros al cargar la página
function aplicarFiltros() {
  const filtros = {
    nombre: document.getElementById('filtroNombre').value,
    correo: document.getElementById('filtroCorreo').value,
  };

  // Filtrar usuarios con base en los filtros seleccionados
  cargarUsuarios(filtros);
}

// Inicialización
window.addEventListener('load', function() {
  console.log("La página ha cargado correctamente.");
  cargarUsuarios();  // Cargar los usuarios sin filtros al inicio
  cargarFiltros();   // Cargar los filtros

  // Escuchar cambios en los filtros
  document.getElementById('filtroNombre').addEventListener('change', aplicarFiltros);
  document.getElementById('filtroCorreo').addEventListener('change', aplicarFiltros);
});

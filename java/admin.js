console.log("El archivo admin.js se está cargando correctamente");

// Cargar los usuarios desde el servidor
function cargarUsuarios(filtros = {}) {
  const params = new URLSearchParams(filtros);
  let url = 'obtenerUsuarios.php';
  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  console.log("Solicitud a:", url);

  fetch(url)
    .then(response => {
      if (!response.ok) {
        console.error("Error en la respuesta:", response.statusText);
        throw new Error("Error en la solicitud");
      }
      return response.json();
    })
    .then(usuarios => {
      console.log("Usuarios recibidos:", usuarios);

      const tbody = document.querySelector('#adminTable tbody');
      tbody.innerHTML = ''; // Limpiar tabla

      if (!usuarios || usuarios.length === 0) {
        const tr = document.createElement('tr');
        tr.innerHTML = '<td colspan="3">No se encontraron usuarios</td>';
        tbody.appendChild(tr);
        return;
      }

      usuarios.forEach(usuario => {
        const nombre = usuario.IDnombre ?? "Sin nombre";     // Evitar undefined con nullish coalescing
        const correo = usuario.IDcorreo ?? "Sin correo";
        const idUsuario = usuario.IDusuario ?? "";            // Id para el botón Compras

        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${nombre}</td>
          <td>${correo}</td>
          <td>
            <button onclick="window.location.href='comprasUsuario.html?id=${idUsuario}'">Compras</button>
          </td>
        `;
        tbody.appendChild(tr);
      });
    })
    .catch(error => {
      console.error('Error al cargar usuarios:', error);
    });
}

// Cargar los filtros de la base de datos
function cargarFiltros() {
  fetch('obtenerUsuarios.php')
    .then(response => response.json())
    .then(usuarios => {
      const nombres = new Set();
      const correos = new Set();

      usuarios.forEach(usuario => {
        if (usuario.IDnombre) nombres.add(usuario.IDnombre);
        if (usuario.IDcorreo) correos.add(usuario.IDcorreo);
      });

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
  if (!select) {
    console.warn(`No se encontró el elemento select con id '${id}'`);
    return;
  }
  select.innerHTML = `<option value="">Filtrar por ${id === 'filtroNombre' ? 'nombre' : 'correo'}</option>`;
  options.forEach(option => {
    const opt = document.createElement('option');
    opt.value = option;
    opt.textContent = option;
    select.appendChild(opt);
  });
}

// Aplicar los filtros al cambiar selects
function aplicarFiltros() {
  const nombre = document.getElementById('filtroNombre')?.value || "";
  const correo = document.getElementById('filtroCorreo')?.value || "";

  cargarUsuarios({ nombre, correo });
}

// Inicialización al cargar la página
window.addEventListener('load', () => {
  console.log("La página ha cargado correctamente.");
  cargarUsuarios();  // Usuarios sin filtros
  cargarFiltros();

  const filtroNombre = document.getElementById('filtroNombre');
  const filtroCorreo = document.getElementById('filtroCorreo');

  if (filtroNombre) filtroNombre.addEventListener('change', aplicarFiltros);
  else console.warn("No existe filtroNombre en el DOM");

  if (filtroCorreo) filtroCorreo.addEventListener('change', aplicarFiltros);
  else console.warn("No existe filtroCorreo en el DOM");
});

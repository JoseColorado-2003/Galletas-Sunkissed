function borrarFila(boton) {
    if (confirm("¿Estás seguro de que deseas borrar esta fila?")) {
      const fila = boton.closest("tr");
      const correo = fila.getAttribute("data-user");
  
      const filasUsuario = document.querySelectorAll(`tr[data-user="${correo}"]`);
      const filaBase = [...filasUsuario].find(f => f.querySelector("td[rowspan]"));
  
      if (fila === filaBase) {
        filasUsuario.forEach(f => f.remove());
  
        const addBtnRows = document.querySelectorAll("tr.add-btn-row");
        addBtnRows.forEach(f => {
          const boton = f.querySelector(".add-btn");
          if (boton && boton.outerHTML.includes(correo)) {
            f.remove();
          }
        });
      } else {
        fila.remove();
  
        if (filaBase) {
          const nombreCell = filaBase.querySelector("td[rowspan]");
          const correoCell = filaBase.querySelector("td[rowspan]:nth-of-type(2)");
  
          let rowspanActual = parseInt(nombreCell.getAttribute("rowspan")) || 1;
          if (rowspanActual > 1) {
            nombreCell.setAttribute("rowspan", rowspanActual - 1);
            correoCell.setAttribute("rowspan", rowspanActual - 1);
          }
        }
      }
  
      actualizarFiltros();
    }
  }
  
  function agregarGalleta(boton, nombre, correo) {
    const filaBoton = boton.closest("tr");
    const nuevaFila = document.createElement("tr");
    nuevaFila.setAttribute("data-user", correo);
    nuevaFila.classList.add("user-row");
  
    nuevaFila.innerHTML = `
      <td contenteditable="true"></td>
      <td contenteditable="true"></td>
      <td>
        <button class="edit-btn guardar">Guardar</button>
        <button class="edit-btn modificar">Modificar</button>
        <button class="edit-btn borrar">Borrar</button>
      </td>
      `;
  
    filaBoton.parentNode.insertBefore(nuevaFila, filaBoton);
  
    const filasUsuario = document.querySelectorAll(`tr[data-user="${correo}"]`);
    const filaBase = [...filasUsuario].find(f => f.querySelector("td[rowspan]"));
    if (filaBase) {
      const celdas = filaBase.querySelectorAll("td");
      const nombreCell = celdas[0];
      const correoCell = celdas[1];
  
      let rowspanActual = parseInt(nombreCell.getAttribute("rowspan")) || 1;
      rowspanActual++;
      nombreCell.setAttribute("rowspan", rowspanActual);
      correoCell.setAttribute("rowspan", rowspanActual);
    }
  
    activarEventosFila(nuevaFila);
    actualizarFiltros();
  }
  
  function activarEventosFila(fila) {
    const btnGuardar = fila.querySelector('.guardar');
    const btnModificar = fila.querySelector('.modificar');
    const btnBorrar = fila.querySelector('.borrar');
  
    if (btnGuardar) {
      btnGuardar.addEventListener('click', function () {
        const row = this.closest('tr');
        row.querySelectorAll('[contenteditable]').forEach(cell => {
          cell.setAttribute('contenteditable', 'false');
        });
        this.style.display = 'none';
      });
    }
  
    if (btnModificar) {
      btnModificar.addEventListener('click', function () {
        const row = this.closest('tr');
        row.querySelectorAll('td:nth-child(3), td:nth-child(4)').forEach(cell => {
          cell.setAttribute('contenteditable', 'true');
          cell.focus();
        });
        const guardarBtn = row.querySelector('.guardar');
        if (guardarBtn) {
          guardarBtn.style.display = 'inline-block';
        }
      });
    }
  
    if (btnBorrar) {
      btnBorrar.addEventListener('click', function () {
        borrarFila(this);
      });
    }
  }
  
  document.querySelectorAll('tr.user-row').forEach(activarEventosFila);
  
  function actualizarFiltros() {
    const tabla = document.getElementById("adminTable");
    const filas = tabla.querySelectorAll("tbody tr.user-row");
  
    const nombres = new Set();
    const correos = new Set();
    const galletas = new Set();
    const cantidades = new Set();
  
    filas.forEach(fila => {
      const celdas = fila.querySelectorAll("td");
      if (celdas.length >= 4) {
        nombres.add(celdas[0].textContent.trim());
        correos.add(celdas[1].textContent.trim());
        galletas.add(celdas[2].textContent.trim());
        cantidades.add(celdas[3].textContent.trim());
      }
    });
  
    poblarSelect("filtroNombre", nombres);
    poblarSelect("filtroCorreo", correos);
    poblarSelect("filtroGalleta", galletas);
    poblarSelect("filtroCantidad", cantidades);
  }
  
  function poblarSelect(id, valores) {
    const select = document.getElementById(id);
    const valorSeleccionado = select.value;
    select.innerHTML = `<option value="">${select.options[0].text}</option>`;
  
    [...valores].sort().forEach(valor => {
      const option = document.createElement("option");
      option.value = valor;
      option.textContent = valor;
      select.appendChild(option);
    });
  
    if ([...valores].includes(valorSeleccionado)) {
      select.value = valorSeleccionado;
    }
  }
  
  actualizarFiltros();
  
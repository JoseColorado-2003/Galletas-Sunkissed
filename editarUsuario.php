<?php
// Conexión a la base de datos
$conexion = new mysqli("localhost", "root", "", "galletassunkissed");

if (isset($_GET['id'])) {
    $idusuario = $_GET['id'];

    // Consulta para obtener la información del usuario
    $sql = "SELECT * FROM usuarios WHERE IDusuario = $idusuario";
    $resultado = $conexion->query($sql);
    
    if ($resultado->num_rows > 0) {
        $usuario = $resultado->fetch_assoc();  // Obtener datos del usuario
    } else {
        echo "Usuario no encontrado";
        exit;
    }
} else {
    echo "ID de usuario no proporcionado.";
    exit;
}

$conexion->close();  // Cerrar conexión a la base de datos
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Editar Usuario</title>
  <link rel="stylesheet" href="../Galletas-Sunkissed/stylesadmin.css" />
</head>
<body>

  <div class="container">
    <h2>Editar Usuario</h2>

    <form action="actualizarUsuario.php" method="POST">
      <!-- Campo oculto para el ID del usuario -->
      <input type="hidden" name="idusuario" value="<?php echo $usuario['IDusuario']; ?>">

      <!-- Campo para el nombre del usuario -->
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" value="<?php echo $usuario['IDnombre']; ?>" required>
      </div>

      <!-- Campo para el correo del usuario -->
      <div class="form-group">
        <label for="correo">Correo:</label>
        <input type="email" id="correo" name="correo" value="<?php echo $usuario['IDcorreo']; ?>" required>
      </div>

      <!-- Campo para el nombre de la galleta -->
      <div class="form-group">
        <label for="galleta">Galleta:</label>
        <input type="text" id="galleta" name="galleta" value="<?php echo $usuario['galleta']; ?>">
      </div>

      <!-- Campo para la cantidad -->
      <div class="form-group">
        <label for="cantidad">Cantidad:</label>
        <input type="number" id="cantidad" name="cantidad" value="<?php echo $usuario['cantidad']; ?>" min="0">
      </div>

      <button type="submit">Actualizar Usuario</button>
    </form>
  </div>

</body>
</html>

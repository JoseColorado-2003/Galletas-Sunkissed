<?php
// Obtener el ID del usuario
$idusuario = $_GET['id'];

// Conexión a la base de datos
$conexion = new mysqli("localhost", "root", "", "galletasunkissed");


$sql = "SELECT * FROM usuarios WHERE IDusuario = $idusuario";
$resultado = $conexion->query($sql);
$usuario = $resultado->fetch_assoc();

// Mostrar el formulario con los datos del usuario
?>
<form action="actualizarUsuario.php" method="POST">
  <input type="hidden" name="idusuario" value="<?php echo $usuario['IDusuario']; ?>">
  
  <label for="nombre">Nombre:</label>
  <input type="text" name="nombre" value="<?php echo $usuario['IDnombre']; ?>" required><br>
  
  <label for="correo">Correo:</label>
  <input type="email" name="correo" value="<?php echo $usuario['IDcorreo']; ?>" required><br>

  <label for="galleta">Tipo de Galleta:</label>
  <input type="text" name="galleta" value="<?php echo $usuario['galleta']; ?>" required><br>
  
  <label for="cantidad">Cantidad:</label>
  <input type="number" name="cantidad" value="<?php echo $usuario['cantidad']; ?>" required><br>

  <button type="submit">Actualizar Usuario</button>
</form>
<?php
$conexion->close();
?>

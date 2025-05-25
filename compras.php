<?php
session_start();
if (!isset($_SESSION['usuario'])) {
    header("Location: login.php");
    exit();
}
$usuario = $_SESSION['usuario']; // debe contener 'nombre' y 'correo'
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Comprar - Sunkissed Galletas</title>
</head>
<body>
  <h1>Bienvenido, <?= htmlspecialchars($usuario['nombre']) ?>!</h1>
  <p>Correo: <?= htmlspecialchars($usuario['correo']) ?></p>

  <form action="check.php" method="post" id="form-pedido">
    <input type="hidden" name="nombre" value="<?= htmlspecialchars($usuario['nombre']) ?>">
    <input type="hidden" name="correo" value="<?= htmlspecialchars($usuario['correo']) ?>">

    <h2>Selecciona tus galletas</h2>
    <div>
      <label>Chips:</label>
      <input type="number" name="chips" min="0" value="0">
    </div>
    <div>
      <label>Cacao:</label>
      <input type="number" name="cacao" min="0" value="0">
    </div>
    <div>
      <label>Queso:</label>
      <input type="number" name="queso" min="0" value="0">
    </div>

    <button type="submit">Comprar</button>
  </form>
</body>
</html>

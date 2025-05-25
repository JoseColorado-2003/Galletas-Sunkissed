<?php
session_start();

// Verificar que exista el pedido
if (!isset($_SESSION['pedido']) || !isset($_SESSION['usuario'])) {
    header("Location: compras.html"); // Redirigir si no hay datos
    exit();
}

$usuario = $_SESSION['usuario'];
$pedido = $_SESSION['pedido'];
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Revisión de Pedido</title>
  <link rel="stylesheet" href="../Galletas-Sunkissed/styles/stylescheck.css"> <!-- Mantén tu CSS -->
</head>
<body>
  <div class="contenedor-principal">
    <h1>Revisión de Pedido</h1>

    <div class="info-usuario">
      <h2>Datos del Usuario</h2>
      <p><strong>Nombre:</strong> <?php echo htmlspecialchars($usuario['nombre']); ?></p>
      <p><strong>Correo:</strong> <?php echo htmlspecialchars($usuario['correo']); ?></p>
    </div>

    <div class="info-pedido">
      <h2>Galletas Seleccionadas</h2>
      <ul>
        <li><strong>Chips:</strong> <?php echo $pedido['chips']; ?> unidades</li>
        <li><strong>Cacao:</strong> <?php echo $pedido['cacao']; ?> unidades</li>
        <li><strong>Queso:</strong> <?php echo $pedido['queso']; ?> unidades</li>
      </ul>
    </div>

    <form action="procesar_pago.php" method="POST">
      <button type="submit">Confirmar Pedido</button>
    </form>
  </div>
</body>
</html>

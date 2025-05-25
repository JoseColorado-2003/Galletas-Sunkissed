<?php
if (session_status() === PHP_SESSION_NONE) {
  session_start();
}

if (!isset($_SESSION['pedido']) || !isset($_SESSION['usuario'])) {
  header("Location: compras.html");
  exit();
}

$usuario = $_SESSION['usuario'];
$pedido = $_SESSION['pedido'];

// CAMBIA ESTE NÚMERO al número real de WhatsApp
$numero_whatsapp = "573173599389"; // ejemplo: 5215551234567

$mensaje = "Hola! Quiero confirmar mi pedido:\n"
         . "👤 *Nombre:* " . $usuario['nombre'] . "\n"
         . "📧 *Correo:* " . $usuario['correo'] . "\n\n"
         . "🍪 *Pedido:*\n"
         . "- Chips: " . $pedido['chips'] . " unidades\n"
         . "- Cacao: " . $pedido['cacao'] . " unidades\n"
         . "- Queso: " . $pedido['queso'] . " unidades\n\n"
         . "🎁 *Incluye promoción:* [Sí / No]";

$mensaje_url = urlencode($mensaje);
$whatsapp_url = "https://wa.me/{$numero_whatsapp}?text={$mensaje_url}";
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Confirmación de Pedido</title>
  <link rel="stylesheet" href="../Galletas-Sunkissed/styles/stylescheck.css" />
</head>
<body>

  <h1>🎉 Confirmación de Pedido</h1>

  <div class="pedido-container">
    <p>Gracias por tu compra. Revisa tu pedido antes de enviarlo por WhatsApp:</p>

    <table class="pedido-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Tipo de Galleta</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        <?php if ($pedido['chips'] > 0): ?>
        <tr>
          <td><?= htmlspecialchars($usuario['nombre']) ?></td>
          <td><?= htmlspecialchars($usuario['correo']) ?></td>
          <td>Chips</td>
          <td><?= $pedido['chips'] ?></td>
        </tr>
        <?php endif; ?>
        <?php if ($pedido['cacao'] > 0): ?>
        <tr>
          <td><?= htmlspecialchars($usuario['nombre']) ?></td>
          <td><?= htmlspecialchars($usuario['correo']) ?></td>
          <td>Cacao</td>
          <td><?= $pedido['cacao'] ?></td>
        </tr>
        <?php endif; ?>
        <?php if ($pedido['queso'] > 0): ?>
        <tr>
          <td><?= htmlspecialchars($usuario['nombre']) ?></td>
          <td><?= htmlspecialchars($usuario['correo']) ?></td>
          <td>Queso</td>
          <td><?= $pedido['queso'] ?></td>
        </tr>
        <?php endif; ?>
      </tbody>
    </table>

    <p>¿Todo correcto? Haz clic en el botón para enviar tu pedido por WhatsApp.</p>

    <div class="confirmar-pedido">
      <a href="<?= $whatsapp_url ?>" target="_blank">
        <button class="confirmar-btn">Enviar por WhatsApp</button>
      </a>
    </div>   

    <div class="volver-btn-container">
      <a href="compras.html">
        <button class="confirmar-btn">Volver a la tienda</button>
      </a>
    </div>
  </div>

  <div class="admin-logo" style="margin-top: 80px;">
    <img src="../Galletas-Sunkissed/Imagenes/Group (1).svg" alt="Logo Sunkissed">
  </div>

</body>
</html>

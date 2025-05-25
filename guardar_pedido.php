<?php
session_start();

// Datos de conexión
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "galletassunkissed";

$conexion = new mysqli($servername, $username, $password, $dbname);
if ($conexion->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión a la base de datos.']);
    exit;
}

if (!isset($_SESSION['IDusuario'])) {
    echo json_encode(['status' => 'error', 'message' => 'No hay sesión activa.']);
    exit;
}

// Recoger datos POST
$chips = isset($_POST['chips']) ? intval($_POST['chips']) : 0;
$cacao = isset($_POST['cacao']) ? intval($_POST['cacao']) : 0;
$queso = isset($_POST['queso']) ? intval($_POST['queso']) : 0;

$idUsuario = $_SESSION['IDusuario'];

$stmt = $conexion->prepare("INSERT INTO compras (IDusuario, fecha_compra, galleta, cantidad, realizo_compra) VALUES (?, NOW(), ?, ?, 1)");
if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Error en la preparación de la consulta.']);
    exit;
}

$tipos = ['Chips' => $chips, 'Cacao' => $cacao, 'Queso' => $queso];
foreach ($tipos as $galleta => $cantidad) {
    if ($cantidad > 0) {
        $stmt->bind_param("isi", $idUsuario, $galleta, $cantidad);
        if (!$stmt->execute()) {
            echo json_encode(['status' => 'error', 'message' => 'Error al guardar el pedido.']);
            exit;
        }
    }
}

$stmt->close();
$conexion->close();

// Guardar en sesión el pedido para check.php
$_SESSION['pedido'] = [
    'chips' => $chips,
    'cacao' => $cacao,
    'queso' => $queso
];

$_SESSION['usuario'] = [
    'nombre' => $_SESSION['nombre'],
    'correo' => $_SESSION['correo']
];

// IMPORTANTE: no hagas redirección desde PHP cuando usas fetch
// Solo responde con JSON para que JS maneje la redirección
echo json_encode(['status' => 'ok']);
exit;
?>

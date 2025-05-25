<?php
header('Content-Type: application/json');

$conexion = new mysqli("localhost", "root", "", "galletassunkissed");

if ($conexion->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión a la base de datos"]);
    exit;
}

$userId = isset($_GET['userId']) ? (int)$_GET['userId'] : 0;

if ($userId <= 0) {
    echo json_encode([]);
    exit;
}

// Consulta usando los nombres correctos de columnas y tabla
$sql = "SELECT IDcompra as id, galleta, cantidad, realizo_compra FROM compras WHERE IDusuario = $userId";

$resultado = $conexion->query($sql);

$compras = [];

if ($resultado) {
    while ($row = $resultado->fetch_assoc()) {
        $compras[] = $row;
    }
}

echo json_encode($compras);

$conexion->close();
?>

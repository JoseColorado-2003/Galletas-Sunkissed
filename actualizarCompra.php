<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = isset($_POST['id']) ? intval($_POST['id']) : 0;
    $realizo_compra = isset($_POST['realizo_compra']) ? intval($_POST['realizo_compra']) : 0;

    if ($id <= 0) {
        echo json_encode(['status' => 'error', 'message' => 'ID inválido']);
        exit;
    }

    $conexion = new mysqli("localhost", "root", "", "galletassunkissed");

    if ($conexion->connect_error) {
        echo json_encode(['status' => 'error', 'message' => 'Error de conexión']);
        exit;
    }

    // Actualizar campo 'realizo_compra' de la compra con el id dado
    $sql = "UPDATE compras SET realizo_compra = $realizo_compra WHERE IDcompra = $id";

    if ($conexion->query($sql) === TRUE) {
        echo json_encode(['status' => 'ok']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $conexion->error]);
    }

    $conexion->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
}
?>

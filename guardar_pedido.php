<?php
session_start();
header('Content-Type: application/json');

$host = "localhost";
$db = "galletassunkissed";
$user = "tu_usuario";     // <-- Ajusta aquí tu usuario
$pass = "tu_contraseña";  // <-- Ajusta aquí tu contraseña

$conn = new mysqli($host, $user, $pass, $db);

if ($conn->connect_error) {
    echo json_encode([
        "status" => "error",
        "message" => "Error conexión BD: " . $conn->connect_error
    ]);
    exit;
}

if (!isset($_SESSION['IDusuario'])) {
    echo json_encode([
        "status" => "error",
        "message" => "No estás autenticado."
    ]);
    exit;
}

$IDusuario = intval($_SESSION['IDusuario']);
$galletasPermitidas = ["Chips", "Cacao", "Queso"];
$datos = [];

foreach ($galletasPermitidas as $galleta) {
    if (isset($_POST[$galleta])) {
        $cantidad = intval($_POST[$galleta]);
        if ($cantidad > 0) {
            $datos[$galleta] = $cantidad;
        }
    }
}

if (empty($datos)) {
    echo json_encode([
        "status" => "error",
        "message" => "No hay productos para comprar."
    ]);
    exit;
}

$stmt = $conn->prepare("INSERT INTO compras (IDusuario, galleta, cantidad, realizo_compra) VALUES (?, ?, ?, TRUE)");

if (!$stmt) {
    echo json_encode([
        "status" => "error",
        "message" => "Error al preparar la consulta: " . $conn->error
    ]);
    exit;
}

foreach ($datos as $galleta => $cantidad) {
    $stmt->bind_param("isi", $IDusuario, $galleta, $cantidad);
    if (!$stmt->execute()) {
        echo json_encode([
            "status" => "error",
            "message" => "Error al ejecutar la consulta: " . $stmt->error
        ]);
        $stmt->close();
        $conn->close();
        exit;
    }
}

$stmt->close();
$conn->close();

echo json_encode([
    "status" => "ok"
]);

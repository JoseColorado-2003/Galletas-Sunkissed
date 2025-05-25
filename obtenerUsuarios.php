<?php
header('Content-Type: application/json');

// Conexión a la base de datos
$conexion = new mysqli("localhost", "root", "", "galletassunkissed");

// Verificar la conexión
if ($conexion->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión: " . $conexion->connect_error]);
    exit();
}

// Obtener filtros de la URL (solo nombre y correo, ya no galleta ni cantidad)
$nombre = isset($_GET['nombre']) ? $conexion->real_escape_string($_GET['nombre']) : '';
$correo = isset($_GET['correo']) ? $conexion->real_escape_string($_GET['correo']) : '';

// Consulta SQL base (sin galleta ni cantidad)
$sql = "SELECT IDusuario, IDnombre, IDcorreo FROM usuarios WHERE 1";

if ($nombre) {
    $sql .= " AND IDnombre LIKE '%$nombre%'";
}
if ($correo) {
    $sql .= " AND IDcorreo LIKE '%$correo%'";
}

// Ejecutar consulta
$resultado = $conexion->query($sql);

$usuarios = [];

if ($resultado) {
    if ($resultado->num_rows > 0) {
        while ($fila = $resultado->fetch_assoc()) {
            $usuarios[] = $fila;
        }
    }
    // Si no hay usuarios, devolvemos un array vacío (mejor que mensaje)
} else {
    // Error en la consulta SQL
    http_response_code(500);
    echo json_encode(["error" => "Error en la consulta SQL"]);
    $conexion->close();
    exit();
}

$conexion->close();

echo json_encode($usuarios);
?>

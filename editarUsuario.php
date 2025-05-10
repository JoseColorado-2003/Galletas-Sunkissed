<?php
// Usamos la misma base de datos 'galletassunkissed' que en el login.php
$conexion = new mysqli("localhost", "root", "", "galletassunkissed");

// Verificar la conexión
if ($conexion->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión: " . $conexion->connect_error]);
    exit();
}

// Obtener los filtros de la URL
$nombre = isset($_GET['nombre']) ? $_GET['nombre'] : '';
$correo = isset($_GET['correo']) ? $_GET['correo'] : '';
$galleta = isset($_GET['galleta']) ? $_GET['galleta'] : '';
$cantidad = isset($_GET['cantidad']) ? $_GET['cantidad'] : '';

// Crear la consulta con los filtros
$sql = "SELECT IDusuario, IDnombre, IDcorreo, galleta, cantidad FROM usuarios WHERE 1";

if ($nombre) {
    $sql .= " AND IDnombre LIKE '%$nombre%'";
}
if ($correo) {
    $sql .= " AND IDcorreo LIKE '%$correo%'";
}
if ($galleta) {
    $sql .= " AND galleta LIKE '%$galleta%'";
}
if ($cantidad) {
    $sql .= " AND cantidad = '$cantidad'";
}

// Ejecutar la consulta
$resultado = $conexion->query($sql);

$usuarios = [];

// Verificar si se encontraron usuarios
if ($resultado->num_rows > 0) {
    while ($fila = $resultado->fetch_assoc()) {
        $usuarios[] = $fila;
    }
} else {
    echo json_encode(["mensaje" => "No se encontraron usuarios"]);
}

$conexion->close();

// Devolver los datos en formato JSON
header('Content-Type: application/json');
echo json_encode($usuarios);
?>

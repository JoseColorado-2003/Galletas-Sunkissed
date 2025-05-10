<?php
// Usamos la misma base de datos 'galletassunkissed'
$conexion = new mysqli("localhost", "root", "", "galletassunkissed");

// Verificar la conexión
if ($conexion->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Error de conexión: " . $conexion->connect_error]);
    exit();
}

// Obtener el ID del usuario desde la URL
$idUsuario = isset($_GET['id']) ? $_GET['id'] : null;

if (!$idUsuario) {
    echo json_encode(["error" => "ID de usuario no proporcionado"]);
    exit();
}

// Eliminar el usuario de la base de datos
$sql = "DELETE FROM usuarios WHERE IDusuario = '$idUsuario'";

if ($conexion->query($sql) === TRUE) {
    echo json_encode(["mensaje" => "Usuario borrado con éxito"]);
} else {
    echo json_encode(["error" => "Error al borrar usuario: " . $conexion->error]);
}

$conexion->close();
?>

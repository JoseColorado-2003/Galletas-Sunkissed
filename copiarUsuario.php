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

// Obtener los datos del usuario
$sql = "SELECT IDnombre, IDcorreo, galleta, cantidad FROM usuarios WHERE IDusuario = '$idUsuario'";
$resultado = $conexion->query($sql);

if ($resultado->num_rows > 0) {
    $usuario = $resultado->fetch_assoc();
    
    // Insertar el nuevo usuario con los mismos datos
    $sqlInsert = "INSERT INTO usuarios (IDnombre, IDcorreo, galleta, cantidad) 
                  VALUES ('" . $usuario['IDnombre'] . "', '" . $usuario['IDcorreo'] . "', 
                          '" . $usuario['galleta'] . "', '" . $usuario['cantidad'] . "')";
    
    if ($conexion->query($sqlInsert) === TRUE) {
        echo json_encode(["mensaje" => "Usuario copiado con éxito"]);
    } else {
        echo json_encode(["error" => "Error al copiar usuario: " . $conexion->error]);
    }
} else {
    echo json_encode(["error" => "Usuario no encontrado"]);
}

$conexion->close();
?>

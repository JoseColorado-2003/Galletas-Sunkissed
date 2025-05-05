<?php
// Conectar a la base de datos
$conexion = new mysqli("localhost", "root", "", "galletassunkissed");

// Verificar conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Obtener todos los usuarios
$resultado = $conexion->query("SELECT IDusuario, IDcontraseña FROM usuarios");

while ($usuario = $resultado->fetch_assoc()) {
    // Encriptar la contraseña con password_hash
    $contraseñaEncriptada = password_hash($usuario['IDcontraseña'], PASSWORD_DEFAULT);

    // Actualizar la base de datos con la nueva contraseña encriptada
    $stmt = $conexion->prepare("UPDATE usuarios SET IDcontraseña = ? WHERE IDusuario = ?");
    $stmt->bind_param("si", $contraseñaEncriptada, $usuario['IDusuario']);
    $stmt->execute();
}

echo "Contraseñas actualizadas con éxito.";
$conexion->close();
?>

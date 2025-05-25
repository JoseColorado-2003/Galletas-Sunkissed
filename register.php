<?php
// Conectar a la base de datos
$conexion = new mysqli("localhost", "root", "", "galletassunkissed");

// Verificar conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Recoger datos del formulario
$nombre = $_POST['nombre'];
$correo = $_POST['correo'];
$contrasena = $_POST['contrasena'];
$confirmarContrasena = $_POST['confirmarContrasena'];

// Validar que las contraseñas coincidan
if ($contrasena !== $confirmarContrasena) {
    echo "Las contraseñas no coinciden.";
    exit;
}

// Validar que el correo no esté ya registrado
$verificar = $conexion->prepare("SELECT IDusuario FROM usuarios WHERE IDcorreo = ?");
$verificar->bind_param("s", $correo);
$verificar->execute();
$verificar->store_result();

if ($verificar->num_rows > 0) {
    echo "Este correo ya está registrado.";
    $verificar->close();
    $conexion->close();
    exit;
}
$verificar->close();

// Encriptar la contraseña
$contrasenaHash = password_hash($contrasena, PASSWORD_DEFAULT);

// Preparar la consulta segura
$stmt = $conexion->prepare("INSERT INTO usuarios (IDnombre, IDcorreo, IDcontraseña) VALUES (?, ?, ?)");
$stmt->bind_param("sss", $nombre, $correo, $contrasenaHash);

// Ejecutar y responder
if ($stmt->execute()) {
    echo "Usuario registrado exitosamente.";
    // Redirigir al login después del registro exitoso
    header("Location: Login.html");
    exit(); // Asegura que no se ejecute más código después de la redirección
} else {
    echo "Error al registrar: " . $stmt->error;
}

$stmt->close();
$conexion->close();
?>

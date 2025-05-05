<?php
// Iniciar sesión si deseas usar sesiones más adelante
session_start();

// Conexión a la base de datos
$conexion = new mysqli("localhost", "root", "", "galletassunkissed");

// Verificar conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Recoger datos del formulario
$correo = $_POST['correo'];
$contrasena = $_POST['contrasena'];

// Buscar usuario por correo
$stmt = $conexion->prepare("SELECT IDusuario, IDnombre, IDcontraseña FROM usuarios WHERE IDcorreo = ?");
$stmt->bind_param("s", $correo);
$stmt->execute();
$resultado = $stmt->get_result();

if ($resultado->num_rows === 1) {
    $usuario = $resultado->fetch_assoc();

    // Verificar contraseña
    if (password_verify($contrasena, $usuario['IDcontraseña'])) {
        // Guardar datos en sesión si lo deseas
        $_SESSION['usuario'] = $usuario['IDnombre'];
        // Redirigir a página protegida o dashboard
        header("Location: index.html"); // Cambia a la página que desees
        exit;
    } else {
        echo "Contraseña incorrecta.";
    }
} else {
    echo "Correo no encontrado.";
}

$stmt->close();
$conexion->close();
?>

<?php
session_start();
$conexion = new mysqli("localhost", "root", "", "galletassunkissed");

// Verificar conexión
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Recoger datos del formulario
$correo = $_POST['correo'];
$contrasena = $_POST['contrasena'];

// Verificar si es el admin
if ($correo === "admin@hotmail.com" && $contrasena === "admin") {

    echo "
    <script>
        localStorage.setItem('usuarioLogeado', JSON.stringify({
            nombre: 'Admin',
            correo: 'admin'
        }));
        window.location.href = '../Galletas-Sunkissed/Admin.html'; // Redirige al panel de admin
    </script>
    ";
    exit(); // No sigue ejecutando el resto del PHP
}

// Si no es admin, ahora sí verifica en base de datos
$stmt = $conexion->prepare("SELECT IDusuario, IDnombre, IDcorreo, IDcontraseña FROM usuarios WHERE IDcorreo = ?");
$stmt->bind_param("s", $correo);
$stmt->execute();
$stmt->store_result();

if ($stmt->num_rows > 0) {
    $stmt->bind_result($idusuario, $nombre, $correoDB, $contrasenaHash);
    $stmt->fetch();
    
    if (password_verify($contrasena, $contrasenaHash)) {
        // Guardar sesión PHP
        $_SESSION['IDusuario'] = $idusuario;
        $_SESSION['nombre'] = $nombre;
        $_SESSION['correo'] = $correoDB;

        echo "
        <script>
            localStorage.setItem('usuarioLogeado', JSON.stringify({
                nombre: '$nombre',
                correo: '$correoDB'
            }));
            window.location.href = '../Galletas-Sunkissed/index.html';  
        </script>
        ";
    } else {
        echo "
        <script>
            window.location.href = 'Login.html?error=2';
        </script>
        ";
    }
} else {
    echo "
    <script>
        window.location.href = 'Login.html?error=1';
    </script>
    ";
}

$stmt->close();
$conexion->close();
?>

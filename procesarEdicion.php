<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $idusuario = $_POST['idusuario'];
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $galleta = $_POST['galleta'];
    $cantidad = $_POST['cantidad'];

    // Conexión a la base de datos
    $conexion = new mysqli("localhost", "root", "", "galletassunkissed");

    // Verificar la conexión
    if ($conexion->connect_error) {
        die("Conexión fallida: " . $conexion->connect_error);
    }

    // Consulta para actualizar el usuario
    $sql = "UPDATE usuarios SET IDnombre='$nombre', IDcorreo='$correo', galleta='$galleta', cantidad='$cantidad' WHERE IDusuario=$idusuario";
    
    if ($conexion->query($sql) === TRUE) {
        echo "<div class='success-message'>Usuario actualizado correctamente.</div>";
        // Redirigir a admin.html después de 2 segundos
        echo "<script>setTimeout(function(){ window.location.href = 'admin.html'; }, 2000);</script>";
    } else {
        echo "<div class='error-message'>Error al actualizar el usuario: " . $conexion->error . "</div>";
    }

    $conexion->close();
}
?>

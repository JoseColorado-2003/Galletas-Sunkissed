<?php
if (isset($_GET['id'])) {
    $idusuario = $_GET['id'];

    // Conexión a la base de datos
    $conexion = new mysqli("localhost", "root", "", "galletassunkissed");

    // Verificamos si la conexión fue exitosa
    if ($conexion->connect_error) {
        die("Conexión fallida: " . $conexion->connect_error);
    }

    // Eliminar el usuario de la base de datos
    $sql = "DELETE FROM usuarios WHERE IDusuario = $idusuario";

    if ($conexion->query($sql) === TRUE) {
        echo "Usuario borrado correctamente.";

        // Redirigir automáticamente a admin.html después de 2 segundos
        echo "<script>setTimeout(function(){ window.location.href = 'admin.html'; }, 2000);</script>";
    } else {
        echo "Error al eliminar el usuario: " . $conexion->error;
    }

    $conexion->close();
}
?>

<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $idusuario = $_POST['idusuario'];
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];

    // Cambiar la base de datos 'sunkissed' por 'galletassunkissed'
    $conexion = new mysqli("localhost", "root", "", "galletassunkissed");

    $sql = "UPDATE usuarios SET IDnombre='$nombre', IDcorreo='$correo' WHERE IDusuario=$idusuario";
    if ($conexion->query($sql) === TRUE) {
        echo "Usuario actualizado correctamente.";
    } else {
        echo "Error al actualizar: " . $conexion->error;
    }

    $conexion->close();
}
?>

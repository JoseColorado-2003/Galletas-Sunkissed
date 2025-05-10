<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $idusuario = $_POST['idusuario'];
    $nombre = $_POST['nombre'];
    $correo = $_POST['correo'];
    $galleta = $_POST['galleta'];
    $cantidad = $_POST['cantidad'];

    $conexion = new mysqli("localhost", "root", "", "sunkissed");

    $sql = "UPDATE usuarios SET IDnombre='$nombre', IDcorreo='$correo', galleta='$galleta', cantidad='$cantidad' WHERE IDusuario=$idusuario";
    if ($conexion->query($sql) === TRUE) {
        echo "Usuario actualizado correctamente.";
    } else {
        echo "Error al actualizar: " . $conexion->error;
    }

    $conexion->close();
}
?>

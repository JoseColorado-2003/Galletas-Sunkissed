<?php
if (isset($_GET['id'])) {
    $idusuario = $_GET['id'];

    $conexion = new mysqli("localhost", "root", "", "sunkissed");

    $sql = "DELETE FROM usuarios WHERE IDusuario = $idusuario";
    if ($conexion->query($sql) === TRUE) {
        echo "Usuario eliminado correctamente.";
    } else {
        echo "Error al eliminar usuario: " . $conexion->error;
    }

    $conexion->close();
}
?>

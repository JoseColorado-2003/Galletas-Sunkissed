<?php
if (isset($_GET['id'])) {
    $idusuario = $_GET['id'];

    $conexion = new mysqli("localhost", "root", "", "sunkissed");

    $sql = "SELECT * FROM usuarios WHERE IDusuario = $idusuario";
    $resultado = $conexion->query($sql);
    $usuario = $resultado->fetch_assoc();

    // Copiar el usuario
    $nombre = $usuario['IDnombre'];
    $correo = $usuario['IDcorreo'];
    $galleta = $usuario['galleta'];
    $cantidad = $usuario['cantidad'];

    $sqlInsert = "INSERT INTO usuarios (IDnombre, IDcorreo, galleta, cantidad) VALUES ('$nombre', '$correo', '$galleta', $cantidad)";
    if ($conexion->query($sqlInsert) === TRUE) {
        echo "Usuario copiado correctamente.";
    } else {
        echo "Error al copiar usuario: " . $conexion->error;
    }

    $conexion->close();
}
?>

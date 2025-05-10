<?php
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $idusuario = $_GET['id'];

    // Conexión a la base de datos
    $conexion = new mysqli("localhost", "root", "", "galletassunkissed");

    // Comprobar si la conexión es exitosa
    if ($conexion->connect_error) {
        die("Conexión fallida: " . $conexion->connect_error);
    }

    // Obtener los datos del usuario original
    $sql = "SELECT * FROM usuarios WHERE IDusuario = $idusuario";
    $resultado = $conexion->query($sql);

    if ($resultado->num_rows > 0) {
        $usuario = $resultado->fetch_assoc();

        // Modificar el correo para hacerlo único (agregando un sufijo)
        $nuevoCorreo = $usuario['IDcorreo']; // Obtener el correo original
        $nuevoCorreo = substr($nuevoCorreo, 0, strpos($nuevoCorreo, '@')) . '_copy' . substr($nuevoCorreo, strpos($nuevoCorreo, '@'));

        // Insertar el nuevo usuario con los datos del original
        $sqlInsert = "INSERT INTO usuarios (IDnombre, IDcorreo, galleta, cantidad) 
                      VALUES ('" . $usuario['IDnombre'] . "', '$nuevoCorreo', '" . $usuario['galleta'] . "', '" . $usuario['cantidad'] . "')";

        if ($conexion->query($sqlInsert) === TRUE) {
            echo "Usuario copiado correctamente con correo: $nuevoCorreo";
        } else {
            echo "Error al copiar el usuario: " . $conexion->error;
        }
    } else {
        echo "Usuario no encontrado.";
    }

    $conexion->close();
}
?>

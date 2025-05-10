<?php
if (isset($_GET['id'])) {
    $idusuario = $_GET['id'];

    // Conexión a la base de datos
    $conexion = new mysqli("localhost", "root", "", "galletassunkissed");

    // Verificamos si la conexión fue exitosa
    if ($conexion->connect_error) {
        die("Conexión fallida: " . $conexion->connect_error);
    }

    // Obtener los datos del usuario original
    $sql = "SELECT * FROM usuarios WHERE IDusuario = $idusuario";
    $resultado = $conexion->query($sql);
    
    if ($resultado->num_rows > 0) {
        $usuario = $resultado->fetch_assoc();

        // Crear el correo electrónico con un sufijo "_copy"
        $nuevoCorreo = $usuario['IDcorreo'];
        $nuevoCorreo = preg_replace("/@/", "_copy@", $nuevoCorreo, 1);

        // Insertar el usuario copiado con el nuevo correo
        $sql_insert = "INSERT INTO usuarios (IDnombre, IDcorreo, galleta, cantidad) 
                       VALUES ('{$usuario['IDnombre']}', '$nuevoCorreo', '{$usuario['galleta']}', '{$usuario['cantidad']}')";
        
        if ($conexion->query($sql_insert) === TRUE) {
            echo "Usuario copiado correctamente.";

            // Redirigir automáticamente a admin.html después de 2 segundos
            echo "<script>setTimeout(function(){ window.location.href = 'admin.html'; }, 2000);</script>";
        } else {
            echo "Error al copiar el usuario: " . $conexion->error;
        }
    } else {
        echo "Usuario no encontrado";
    }

    $conexion->close();
}
?>

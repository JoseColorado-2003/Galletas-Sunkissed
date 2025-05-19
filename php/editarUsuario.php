<?php
// Obtener el ID del usuario a editar
if (isset($_GET['id'])) {
    $idusuario = $_GET['id'];
    
    // Conexión a la base de datos
    $conexion = new mysqli("localhost", "root", "", "galletassunkissed");

    // Verificar la conexión
    if ($conexion->connect_error) {
        die("Conexión fallida: " . $conexion->connect_error);
    }

    // Obtener los datos del usuario
    $sql = "SELECT * FROM usuarios WHERE IDusuario = $idusuario";
    $resultado = $conexion->query($sql);
    
    if ($resultado->num_rows > 0) {
        $usuario = $resultado->fetch_assoc();
    } else {
        echo "Usuario no encontrado";
        exit();
    }
    
    $conexion->close();
} else {
    echo "No se ha recibido el ID del usuario.";
    exit();
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Usuario</title>
    <link rel="stylesheet" href="../Galletas-Sunkissed/stylescompras.css" />
</head>
<body>
    <div class="popup-overlay" id="popupOverlay">
        <div class="popup-content">
            <h1>Editar Usuario</h1>
            <form action="procesarEdicion.php" method="POST">
                <input type="hidden" name="idusuario" value="<?php echo $usuario['IDusuario']; ?>">

                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value="<?php echo $usuario['IDnombre']; ?>" required><br><br>

                <label for="correo">Correo:</label>
                <input type="email" id="correo" name="correo" value="<?php echo $usuario['IDcorreo']; ?>" required><br><br>

                <label for="galleta">Galleta:</label>
                <input type="text" id="galleta" name="galleta" value="<?php echo $usuario['galleta']; ?>"><br><br>

                <label for="cantidad">Cantidad:</label>
                <input type="number" id="cantidad" name="cantidad" value="<?php echo $usuario['cantidad']; ?>"><br><br>

                <button type="submit" class="button2">Actualizar Usuario</button>
            </form>
            <span class="close-popup" onclick="closePopup()">×</span>
        </div>
    </div>

    <script>
        function closePopup() {
            document.getElementById('popupOverlay').style.display = 'none';
            window.location.href = 'admin.html'; // Redirigir a admin.html después de cerrar
        }

        // Mostrar el popup al cargar
        window.onload = function() {
            document.getElementById('popupOverlay').style.display = 'flex';
        }
    </script>
</body>
</html>

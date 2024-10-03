<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "talleresejemplo";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

$posdata = file_get_contents("php://input");

    if(isset($posdata) && !empty($posdata)) {

        $request = json_decode($posdata);

        $correo = mysqli_real_escape_string($conexionBD, trim($request->correo));
        $contrasena = mysqli_real_escape_string($conexionBD, trim($request->contrasena));

        $sql = "SELECT * FROM usuarios WHERE correo='$correo' AND contrasena='$contrasena'";
        $result = mysqli_query($conexionBD,$sql);

        $nums = mysqli_num_rows($result);

        if($nums>0)    {
            $data = array('message' => 'success', 'correo' => $correo);
            echo json_encode($data);
        }else   {
            $data = array('message' => 'failed');
            echo json_encode($data);
        }
        
    }

?>
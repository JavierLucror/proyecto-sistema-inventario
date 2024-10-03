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

        $descripcion = trim($request->descripcion);
        $categoria = trim($request->categoria);
        $precio = trim($request->precio);
        $cantidad = trim($request->cantidad);
        $total_producto = trim($request->total_producto);

        $sql = "INSERT INTO productos(descripcion, categoria, precio, cantidad, total_producto) VALUES ('$descripcion', '$categoria', '$precio', '$cantidad', '$total')";

        if($conexionBD->query($sql))    {
            $data = array('message' => 'success');
            echo json_encode($data);
        }else   {
            $data = array('message' => 'failed');
            echo json_encode($data);
        }

    }

?>
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

        $usuario = trim($request->usuario);
        $cliente = trim($request->cliente);
        $fecha = trim($request->fecha);
        $total = trim($request->total);
        $detalle_venta = trim($request->detalle_venta);
        
        $sql = "INSERT INTO ventas(usuario, cliente, fecha, total, detalle_venta) VALUES ('$usuario', '$cliente', '$fecha', '$total', '$detalle_venta')";

        if($conexionBD->query($sql))    {
            $data = array('message' => 'success');
            echo json_encode($data);
        }else   {
            $data = array('message' => 'failed');
            echo json_encode($data);
        }
    }
?>
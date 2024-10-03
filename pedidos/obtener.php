<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "talleresejemplo";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

// Consulta todos los registros de la tabla categorias
$sqlPedidos = mysqli_query($conexionBD,"SELECT * FROM pedidos");
if(mysqli_num_rows($sqlPedidos) > 0){
    $pedidos = mysqli_fetch_all($sqlPedidos,MYSQLI_ASSOC);
    echo json_encode($pedidos);
}
else{ echo json_encode([["success"=>0]]); }   

?>
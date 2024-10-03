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
$sqlInventarios = mysqli_query($conexionBD,"SELECT * FROM inventarios");
if(mysqli_num_rows($sqlInventarios) > 0){
    $inventarios = mysqli_fetch_all($sqlInventarios,MYSQLI_ASSOC);
    echo json_encode($inventarios);
}
else{ echo json_encode([["success"=>0]]); }   

?>
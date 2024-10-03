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
$sqlCategorias = mysqli_query($conexionBD,"SELECT * FROM categorias");
if(mysqli_num_rows($sqlCategorias) > 0){
    $categorias = mysqli_fetch_all($sqlCategorias,MYSQLI_ASSOC);
    echo json_encode($categorias);
}
else{ echo json_encode([["success"=>0]]); }   

?>
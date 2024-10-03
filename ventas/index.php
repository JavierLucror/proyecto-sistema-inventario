<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBaseDatos = "talleresejemplo";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBaseDatos);

// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["consultar"])){
    $sqlVentas = mysqli_query($conexionBD,"SELECT * FROM ventas WHERE id_venta=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlVentas) > 0){
        $ventas = mysqli_fetch_all($sqlVentas,MYSQLI_ASSOC);
        echo json_encode($ventas);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqlVentas = mysqli_query($conexionBD,"DELETE FROM ventas WHERE id_venta=".$_GET["borrar"]);
    if($sqlVentas){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

// Actualiza datos pero recepciona datos de nombre, marca, pais y una clave para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $id=(isset($data->id))?$data->id:$_GET["actualizar"];
    $usuario=$data->usuario;
    $cliente=$data->cliente;
    $fecha=$data->fecha;
    $total=$data->total;
    $detalle_venta=$data->detalle_venta;
    
    $sqlVentas = mysqli_query($conexionBD,"UPDATE ventas SET usuario='$usuario',cliente='$cliente',fecha='$fecha',total='$total',detalle_venta='$detalle_venta' WHERE id_venta=$id");
    echo json_encode(["success"=>1]);
    exit();
}

?>
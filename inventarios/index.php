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
    $sqlInventarios = mysqli_query($conexionBD,"SELECT * FROM inventarios WHERE id_producto=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlInventarios) > 0){
        $inventarios = mysqli_fetch_all($sqlInventarios,MYSQLI_ASSOC);
        echo json_encode($inventarios);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["buscar"])){
    $sqlInventarios = mysqli_query($conexionBD,"SELECT * FROM inventarios WHERE descripcion='".$_GET["buscar"]."'");
    if(mysqli_num_rows($sqlInventarios) > 0){
        $inventarios = mysqli_fetch_all($sqlInventarios,MYSQLI_ASSOC);
        echo json_encode($inventarios);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["productos"])){
    $sqlInventarios = mysqli_query($conexionBD,"SELECT * FROM productos");
    if(mysqli_num_rows($sqlInventarios) > 0){
        $inventarios = mysqli_fetch_all($sqlInventarios,MYSQLI_ASSOC);
        echo json_encode($inventarios);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

// Actualiza datos pero recepciona datos para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $id=(isset($data->id))?$data->id:$_GET["actualizar"];
    $entradas=$data->entradas;
    $salidas=$data->salidas;
    $stock_real=$data->stock_real;
    
    $sqlProductos = mysqli_query($conexionBD,"UPDATE inventarios SET entradas='$entradas',salidas='$salidas',stock_real='$stock_real' WHERE id_producto=$id");
    echo json_encode(["success"=>1]);
    exit();
}

?>
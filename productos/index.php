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
    $sqlProductos = mysqli_query($conexionBD,"SELECT * FROM productos WHERE id_producto=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlProductos) > 0){
        $productos = mysqli_fetch_all($sqlProductos,MYSQLI_ASSOC);
        echo json_encode($productos);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["validar"])){
    $sqlProductos = mysqli_query($conexionBD,"SELECT * FROM productos WHERE descripcion='".$_GET["validar"]."'");
    if(mysqli_num_rows($sqlProductos) > 0)  {
        echo json_encode(["success"=>1]);
    }
    else{  echo json_encode(["success"=>0]); }
}

// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["buscar"])){
    $sqlProductos = mysqli_query($conexionBD,"SELECT * FROM productos WHERE descripcion='".$_GET["buscar"]."'");
    if(mysqli_num_rows($sqlProductos) > 0){
        $productos = mysqli_fetch_all($sqlProductos,MYSQLI_ASSOC);
        echo json_encode($productos);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqlProductos = mysqli_query($conexionBD,"DELETE FROM productos WHERE id_producto=".$_GET["borrar"]);
    if($sqlProductos){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

// Actualiza datos pero recepciona datos de nombre, marca, pais y una clave para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $id=(isset($data->id))?$data->id:$_GET["actualizar"];
    $descripcion=$data->descripcion;
    $categoria=$data->categoria;
    $precio=$data->precio;
    
    $sqlProductos = mysqli_query($conexionBD,"UPDATE productos SET descripcion='$descripcion',categoria='$categoria',precio='$precio' WHERE id_producto=$id");
    echo json_encode(["success"=>1]);
    exit();
}

?>
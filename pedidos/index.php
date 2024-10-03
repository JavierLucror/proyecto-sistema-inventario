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
    $sqlPedidos = mysqli_query($conexionBD,"SELECT * FROM pedidos WHERE id_pedido=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlPedidos) > 0){
        $pedidos = mysqli_fetch_all($sqlPedidos,MYSQLI_ASSOC);
        echo json_encode($pedidos);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqlPedidos = mysqli_query($conexionBD,"DELETE FROM pedidos WHERE id_pedido=".$_GET["borrar"]);
    if($sqlPedidos){
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
    $proveedor=$data->proveedor;
    $fecha=$data->fecha;
    $total=$data->total;
    $detalle_pedido=$data->detalle_pedido;
    
    $sqlPedidos = mysqli_query($conexionBD,"UPDATE pedidos SET usuario='$usuario',proveedor='$proveedor',fecha='$fecha',total='$total',detalle_pedido='$detalle_pedido' WHERE id_pedido=$id");
    echo json_encode(["success"=>1]);
    exit();
}

?>
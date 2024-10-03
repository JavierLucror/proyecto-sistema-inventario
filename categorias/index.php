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
    $sqlCategorias = mysqli_query($conexionBD,"SELECT * FROM categorias WHERE id_categoria=".$_GET["consultar"]);
    if(mysqli_num_rows($sqlCategorias) > 0){
        $categorias = mysqli_fetch_all($sqlCategorias,MYSQLI_ASSOC);
        echo json_encode($categorias);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar"])){
    $sqlCategorias = mysqli_query($conexionBD,"DELETE FROM categorias WHERE id_categoria=".$_GET["borrar"]);
    if($sqlCategorias){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

// Actualiza datos pero recepciona datos de nombre, marca, pais y una clave para realizar la actualización
if(isset($_GET["actualizar"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $id=(isset($data->id))?$data->id:$_GET["actualizar"];
    $nombre=$data->nombre;
    $marca=$data->marca;
    $pais=$data->pais;
    
    $sqlCategorias = mysqli_query($conexionBD,"UPDATE categorias SET nombre='$nombre',marca='$marca',pais='$pais' WHERE id_categoria=$id");
    echo json_encode(["success"=>1]);
    exit();
}

?>
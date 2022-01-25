<?php header('Access-Control-Allow-Origin: *'); ?>

<?php
error_reporting(0);
require_once "ssq_bd.php";


switch ($_POST['type']) {
case 'post_data': 
################################################################################
################################################################################
$nombre = $_POST['nombre'];$apellido = $_POST['apellido'];
$nacionalidad = $_POST['nacionalidad'];$correo = $_POST['correo'];
$mensaje = $_POST['mensaje'];
    $query = "CALL sp_taller_data('$nombre','$apellido','$nacionalidad','$correo','$mensaje')";
    $res = mysqli_query($con,$query);   
    $array = mysqli_fetch_array($res,MYSQLI_ASSOC);
    echo json_encode($array);    
    mysqli_close($con);
################################################################################
################################################################################
        break;  
		
case 'get_data':
$query = "CALL sp_taller_view";
    $res = mysqli_query($con,$query);   
    while ($row = mysqli_fetch_array($res,MYSQLI_ASSOC)){
      echo '
      <div class="card mycard hvr-back-pulse">
            <div class="card-body">
              <h6 class="card-subtitle mb-2">Nombre: '.$row['NOMBRE'].' </h6>
              <strong>Apellido:</strong> <span> '.$row['APELLIDO'].' </span><br>
              <strong>Correo:</strong> <span> '.$row['CORREO'].'</span><br>
              <strong>Nacionalidad:</strong> <span> '.$row['NACIONALIDAD'].' </span>
            </div>
          </div>';
  }
    mysqli_close($con);
break;		

        default:
        $status = array("message"=>'No se encontraron parametros');
        echo json_encode($status);
          break;
  }



?>


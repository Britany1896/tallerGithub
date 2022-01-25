

get_data();
//Listener del boton de envio
document.getElementById("send_data").addEventListener("click", read_data);

//Funcion para el enmascarado de los inputs
function read_data(){
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const nacionalidad = document.getElementById('nacionalidad').value;
    const correo = document.getElementById('correo').value;
    const mensaje = document.getElementById('mensaje').value;
    console.log(nombre, apellido, nacionalidad, correo, mensaje);
    if(nombre == '' || apellido == '' || nacionalidad == '' || correo == '' || mensaje == ''){
        swal('Client response','Todos los campos son obligatorios', 'error');
        return false;
    }
    push_data(nombre, apellido, nacionalidad, correo, mensaje);
};

//Envio de los datos
function push_data(nombre, apellido, nacionalidad, correo, mensaje){
    const data = new FormData();
    data.append('nombre', nombre);
    data.append('apellido', apellido);
    data.append('nacionalidad', nacionalidad);
    data.append('correo', correo);
    data.append('mensaje', mensaje);
    data.append('type', 'post_data');
    fetch('http://ti-usr10-cp.cuc-carrera-ti.ac.cr/requests/api.php',{
       method: 'POST',
       body: data
    })
    .then(function(response) {
       if(response.ok) {
           return response.json()
       } else {
           throw "Error en la llamada Ajax";
       }
    })
    .then(function(data) {
        console.log(data);
      swal('Server response', data.message, 'success');
      get_data();
    })
    .catch(function(err) {
       console.log(err);
    });
};



//Vista de los ultimos datos cargados
function get_data(){
    const data = new FormData();
    data.append('type', 'get_data');
    fetch('http://ti-usr10-cp.cuc-carrera-ti.ac.cr/requests/api.php',{
       method: 'POST',
       body: data
    })
    .then(function(response) {
       if(response.ok) {
           return response.text()
       } else {
           throw "Error en la llamada Ajax";
       }
    })
    .then(function(data) {
      console.log(data);
      document.getElementById('data').innerHTML = data;
    })
    .catch(function(err) {
       console.log(err);
    });
};
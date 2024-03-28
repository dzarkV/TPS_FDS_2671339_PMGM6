function listarProveedor() {

  var url = "https://sistema-mgm-service-app-for-inventary.azurewebsites.net/api/proveedores/listado";


  // Consumir el endpoint o la url de java
  fetch(url)
    .then(response => response.json())
    .then(datos => mostrarData(datos))
    .catch(error => console.log(error))


  // Metodo que pinta los datos
  const mostrarData = (data) => {
    console.log(data)
    let body = ""
    for (var i = 0; i < data.length; i++) {
      body += `<tr><td>${data[i].idProveedor}</td><td>${data[i].nombreProveedor}</td><td>${data[i].direccionProveedor}</td><td>${data[i].telefonoProveedor}</td><td>${data[i].descripcionProveedor}</td><td>${data[i].empresa}</td><td>${data[i].emailProveedor}</td></tr>`
    }
    document.getElementById('data').innerHTML = body
    //console.log(body)
  }
}

function listarProveedorEliminar() {

  var url = "https://sistema-mgm-service-app-for-inventary.azurewebsites.net/api/proveedores/listado";

  // Consumir el endpoint o la url de java
  fetch(url)
    .then(response => response.json())
    .then(datos => mostrarData(datos))
    .catch(error => console.log(error))


  // Metodo que pinta los datos
  const mostrarData = (data) => {
    let body = ""
    for (var i = 0; i < data.length; i++) {
      body += `<tr>
                    <td>${data[i].idProveedor}</td>
                    <td>${data[i].nombreProveedor}</td>
                    <td>${data[i].direccionProveedor}</td>
                    <td>${data[i].telefonoProveedor}</td>
                    <td>${data[i].descripcionProveedor}</td>
                    <td>${data[i].empresa}</td>
                    <td>${data[i].emailProveedor}</td>
                    <td><button class="btn btn-danger" data-id="${data[i].idProveedor}" onclick="eliminarProveedor(${data[i].idProveedor})">Eliminar</button></td>
                </tr>`;
    }
    document.getElementById('data').innerHTML = body
    //console.log(body)
  }
}


function registrarProveedor() {
  // Capturar informacion
  var valorNombre = document.forms["crearProveedoresForm"]["nombreVendedor"].value;
  var valorDireccion = document.forms["crearProveedoresForm"]["dirección"].value;
  var valorTelefono = document.forms["crearProveedoresForm"]["telefono"].value;
  var valorDescripcion = document.forms["crearProveedoresForm"]["descripción"].value;
  var valorEmpresa = document.forms["crearProveedoresForm"]["empresa"].value;
  var valorEmail = document.forms["crearProveedoresForm"]["email"].value;

  var url = "https://sistema-mgm-service-app-for-inventary.azurewebsites.net/api/proveedores/registar";


  // Datos que enviarás en el cuerpo de la solicitud

  const dataProducto = {
    direccionProveedor: valorDireccion,
    nombreProveedor: valorNombre,
    telefonoProveedor: valorTelefono,
    descripcionProveedor: valorDescripcion,
    empresa: valorEmpresa,
    emailProveedor: valorEmail,
  };

  // Opciones para la solicitud POST
  const optionsConsumo = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Indicar que los datos se enviarán en formato JSON
    },
    body: JSON.stringify(dataProducto), // Convertir los datos a formato JSON y agregarlos al cuerpo de la solicitud
  };

  // Consumir el endpoint o la url de java
  // Realizar la solicitud POST utilizando fetch
  fetch(url, optionsConsumo)
    .then(response => response.json()) // Analizar la respuesta JSON
    .then(data => {
      alert('se ha creado el proveedor ');
      window.location.href = 'consultar_proveedores.html';
    }).catch(error => {
      alert('Hubo un error:', error);
    });

}


function buscarProveedor() {
  var id = document.forms["proveedor-form"]["busquedaproveedor"].value;

  var url = "https://sistema-mgm-service-app-for-inventary.azurewebsites.net/api/proveedores/listado";

  url = url + "/" + id;

  console.log(url);
  // Consumir el endpoint o la url de java
  fetch(url)
    .then(response => response.json())
    .then(datos => mostrarData(datos))
    .catch(error => console.log(error))
  console.log("holafech", data)


  // Metodo que pinta los datos
  const mostrarData = (data) => {
    let body = "";

    if (Array.isArray(data)) {
      // Caso en que se recibe un array de proveedores
      for (let i = 0; i < data.length; i++) {
        body += `<tr><td>${data[i].idProveedor}</td><td>${data[i].nombreProveedor}</td><td>${data[i].direccionProveedor}</td><td>${data[i].telefonoProveedor}</td><td>${data[i].descripcionProveedor}</td><td>${data[i].empresa}</td><td>${data[i].emailProveedor}</td></tr>`;
      }
    } else {
      // Caso en que se recibe un solo proveedor (objeto)
      body += `<tr><td>${data.idProveedor}</td><td>${data.nombreProveedor}</td><td>${data.direccionProveedor}</td><td>${data.telefonoProveedor}</td><td>${data.descripcionProveedor}</td><td>${data.empresa}</td><td>${data.emailProveedor}</td></tr>`;
    }

    document.getElementById('data').innerHTML = body;
  }

}

function eliminarProveedor(idProveedor) {

  var url = "https://sistema-mgm-service-app-for-inventary.azurewebsites.net/api/proveedores/listado";

  fetch(url + idProveedor, {
    method: "DELETE"
  })
    .then((response) => {
      if (response.ok) {
        alert("proveedor eliminado satisfactoriamente");
        location.reload();
        // window.location.href = 'proveedores.html';
      } else {
        alert("Error: el proveedor no ha podido ser eliminado")
      }
    })
    .catch((error) => {
      console.error('Error al eliminar el proveedor', error);
      alert("ha ocurrido un error")
    })

}

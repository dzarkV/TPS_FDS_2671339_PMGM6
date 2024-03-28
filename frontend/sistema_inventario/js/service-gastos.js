function listarGastos() {

  var url = "https://sistema-mgm-service-app-for-inventary.azurewebsites.net/api/gastos/listado";

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
      body += `<tr>
         <td>${data[i].idGasto}</td>
         <td>${data[i].tipoGasto}</td>
         <td>${data[i].valorGasto}</td>
         <td><button class="btn btn-info" data-id="${data[i].idGasto}" onclick="formularioActualizarGasto(${data[i].idGasto})">Actualizar</button></td>
         <td><button class="btn btn-danger" data-id="${data[i].idGasto}" onclick="eliminarGasto(${data[i].idGasto})">Eliminar</button></td>
         </tr>`
    }
    document.getElementById('data').innerHTML = body
    //console.log(body)
  }
};

function buscarGasto() {
  var id = document.forms["gastos-form"]["busquedaID"].value;

  var url = "https://sistema-mgm-service-app-for-inventary.azurewebsites.net/api/gastos/listado";

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
      // Caso en que se recibe un array de gastos
      for (let i = 0; i < data.length; i++) {
        body += `<tr><td>${data[i].idGasto}</td><td>${data[i].tipoGasto}</td><td>${data[i].valorGasto}</td></tr>`
      }
    } else {
      // Caso en que se recibe un solo proveedor (objeto)
      body += `<tr><td>${data.idGasto}</td><td>${data.tipoGasto}</td><td>${data.valorGasto}</td></tr>`
    }

    document.getElementById('data').innerHTML = body;
  }

}

function agregarGasto() {

  var valorTipoGasto = document.forms["crearGastoForm"]["tipoGasto"].value;
  var valorValorGasto = document.forms["crearGastoForm"]["valorGasto"].value;

  var url = "https://sistema-mgm-service-app-for-inventary.azurewebsites.net/api/gastos/guardar";

  // Datos que enviarás en el cuerpo de la solicitud
  const dataGasto = {
    tipoGasto: valorTipoGasto,
    valorGasto: valorValorGasto,
  }

  console.log("data a enviar", dataGasto)

  // Opciones para la solicitud POST
  const optionsConsumo = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', // Indicar que los datos se enviarán en formato JSON
    },
    body: JSON.stringify(dataGasto), // Convertir los datos a formato JSON y agregarlos al cuerpo de la solicitud
  };

  fetch(url, optionsConsumo)
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la solicitud: ' + response.statusText);
        console.log(response.status)
      }
      return response.json();
    })
    .then(data => {
      alert('Se ha guardado el gasto: ' + data.idGasto);
      window.location.href = "gastos.html";

    })
    .catch(error => {
      alert('Hubo un error: ' + error.message);
    });

}

function eliminarGasto(idGasto) {

  var url = "https://sistema-mgm-service-app-for-inventary.azurewebsites.net/api/gastos/listado";

  fetch(url + idGasto, {
    method: "DELETE"
  })
    .then((response) => {
      if (response.ok) {
        alert("Gasto eliminado satisfactoriamente");
        location.reload();
      } else {
        alert("Error: el gasto no ha podido ser eliminado")
      }
    })
    .catch((error) => {
      console.error('Error al eliminar el gasto', error);
      alert("ha ocurrido un error")
    })

}

function actualizarGasto() {

  var url = "https://sistema-mgm-service-app-for-inventary.azurewebsites.net/api/gastos/";

  const urlParams = new URLSearchParams(window.location.search);
  const idGasto = urlParams.get('id');

  var tipo_gasto = document.getElementById('detalle').value;
  var valor_gasto = document.getElementById('monto').value;

  const dataGasto = {
    tipoGasto: tipo_gasto,
    valorGasto: valor_gasto
  };

  fetch(url + idGasto, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataGasto)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al actualizar el gasto');
      }
      alert('Gasto actualizado con exito');

      window.location.href = 'gastos.html';
    })
    .catch(error => {
      alert('Error al actualizar el gasto: ' + error.message);
    });
}

function formularioActualizarGasto(idProducto) {
  window.open('actualizar_gasto_formulario.html?id=' + idProducto, '_blank');
}

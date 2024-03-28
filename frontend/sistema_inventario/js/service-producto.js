function listarProductos() {
  var url = "https://sistema-mgm-service-app-for-inventary.azurewebsites.net/api/productos/listado";

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
<<<<<<< HEAD
      body += `<tr>
      <td>${data[i].idProducto}</td>
      <td>${data[i].nombreProducto}</td>
      <td>${data[i].precioProducto}</td>
      <td>${data[i].descripcionProducto}</td>
      </tr>`
=======
      body += `<tr><td>${data[i].idProducto}</td><td>${data[i].nombreProducto}</td><td>${data[i].descripcionProducto}</td></tr>`
>>>>>>> 85c5be4850627127af0537cc7f8791563d894015
    }
    document.getElementById('data').innerHTML = body
    //console.log(body)
  }
}

function listarProductosEliminar() {
  var url = "https://sistema-mgm-service-app-for-inventary.azurewebsites.net/api/productos/listado";

  // Consumir el endpoint o la url de java
  fetch(url)
    .then(response => response.json())
    .then(datos => mostrarData(datos))
    .catch(error => console.log(error))

  // Metodo que pinta los datos
  const mostrarData = (data) => {
    let body = "";
    for (var i = 0; i < data.length; i++) {
      body += `<tr>
                      <td>${data[i].idProducto}</td>
                      <td>${data[i].nombreProducto}</td>
                      <td>${data[i].precioProducto}</td>
                      <td>${data[i].descripcionProducto}</td>
                      <td><button class="eliminar-btn btn btn-danger" data-id="${data[i].idProducto}" onclick="eliminarProducto(${data[i].idProducto})">Eliminar</button></td>
                  </tr>`;
    }
    document.getElementById('data').innerHTML = body;
  }
  console.log(mostrarData)

}

function listarProductosActualizar() {
  var url = "https://sistema-mgm-service-app-for-inventary.azurewebsites.net/api/productos/listado";

  // Consumir el endpoint o la url de java
  fetch(url)
    .then(response => response.json())
    .then(datos => mostrarData(datos))
    .catch(error => console.log(error))

  // Metodo que pinta los datos
  const mostrarData = (data) => {
    let body = "";
    for (var i = 0; i < data.length; i++) {
      body += `<tr>
                      <td>${data[i].idProducto}</td>
                      <td>${data[i].nombreProducto}</td>
                      <td>${data[i].precioProducto}</td>
                      <td>${data[i].descripcionProducto}</td>
                      <td><button class="btn btn-info" data-id="${data[i].idProducto}" onclick="abrirFormulario(${data[i].idProducto})">Actualizar</button></td>
                  </tr>`;
    }
    document.getElementById('data').innerHTML = body;
  }
}


function buscarProducto() {
  var nombre = document.forms["producto-form"]["busquedaProducto"].value;
  var id = document.forms["producto-form"]["busquedaID"].value;

  var url = "https://sistema-mgm-service-app-for-inventary.azurewebsites.net/api/productos/buscar";
  if (nombre !== '' && id !== '') {
    url = url + "?idProducto=" + id + "&nombreProducto=" + nombre;
  }
  if (nombre !== '' && id === '') {
    url = url + "?nombreProducto=" + nombre;
  }
  if (nombre === '' && id !== '') {
    url = url + "?idProducto=" + id;
  }

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
      body += `<tr><td>${data[i].idProducto}</td><td>${data[i].nombreProducto}</td><td>${data[i].descripcionProducto}</td></tr>`
    }
    document.getElementById('data').innerHTML = body
    //console.log(body)
  }
}

function crearProducto() {
  // Capturar informacion
  var valorNombre = document.forms["crearProductoForm"]["producto"].value;
  var valorCategoria = document.forms["crearProductoForm"]["categoria"].value;
  var valorDescripcion = document.forms["crearProductoForm"]["descripciónDelProducto"].value;

  if (valorCategoria === 'Seleccione una categoria' || valorNombre === '' || valorDescripcion === '') {
    alert('Por favor, llene todos los campos');
    return;
  };

  var url = "https://sistema-mgm-service-app-for-inventary.azurewebsites.net/api/productos/guardar";

  const dataProducto = {
    idCategoria: {
      idCategoria: valorCategoria
    },
    nombreProducto: valorNombre,
    descripcionProducto: valorDescripcion,
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
      alert('Se a guardado el producto ' + data.nombreProducto + ' con el ID: ' + data.idProducto);
      window.location.href = 'buscar_productos.html';
    }).catch(error => {
      alert('Hubo un error:', error);
    });

}

<<<<<<< HEAD
function eliminarProducto(idProducto) {
  var url = "https://sistema-mgm-service-app-for-inventary.azurewebsites.net/api/productos/listado/";

  fetch(url + idProducto, {
    method: "DELETE"
  })
    .then((response) => {
      if (response.ok) {
        alert('Producto eliminado exitosamente');
        location.reload();
      } else {
        alert('No se pudo eliminar el producto');
      }
    })
    .catch(function (error) {
      console.error('Error al eliminar el producto:', error);
      alert('Error al eliminar el producto');
    });
}

function actualizarProducto() {
  var url = "https://sistema-mgm-service-app-for-inventary.azurewebsites.net/api/productos/";

  const urlParams = new URLSearchParams(window.location.search);
  const idProducto = urlParams.get('id');
  console.log('hola este es el id', idProducto)
  console.log('hola esta es la url:', url + idProducto)

  var categoria = document.getElementById('categoria').value;
  var nombre = document.getElementById('nombre').value;
  var precio = document.getElementById('precio').value;
  var descripcion = document.getElementById('descripcion').value;

  const dataProducto = {
    idCategoria: {
      idCategoria: categoria
    },
    nombreProducto: nombre,
    precioProducto: precio,
    descripcionProducto: descripcion
  };

  fetch(url + idProducto, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataProducto)
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error al actualizar el producto');
      }
      alert('Producto actualizado con exito');

      window.location.href = 'actualizar_producto.html';
    })
    .catch(error => {
      alert('Error al actualizar el producto: ' + error.message);
    });
}

function abrirFormulario(idProducto) {
  window.open('actualizar_producto_formulario.html?id=' + idProducto, '_blank');
=======
function listarCategorias() {
  var url = "https://sistema-mgm-service-app-for-inventary.azurewebsites.net/api/categoria/listado";
  // Consumir el endpoint o la url de java
  fetch(url)
    .then(response => response.json())
    .then(datos => mostrarCategorias(datos))
    .catch(error => console.log(error))
  // Metodo que muestra las categorias en el select
  const mostrarCategorias = (data) => {
    let options = "<option selected>Seleccione una categoria</option>"
    for (var i = 0; i < data.length; i++) {
      options += `<option value="${data[i].idCategoria}">${data[i].nombreCategoria}</option>`
    }
    document.getElementById('categorias').innerHTML = options
  }
>>>>>>> 85c5be4850627127af0537cc7f8791563d894015
}

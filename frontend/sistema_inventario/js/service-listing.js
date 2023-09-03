function buscarUsuario() {
  var url =
    "https://sistema-mgm-service-users.azurewebsites.net/api/usuario/name?value=";

  const jwtToken = getTokenFromLocalStorage();
  // const jwtToken = localStorage.getItem('jwt');
  // Consumir el endpoint o la url de java
  fetch(url + document.forms["usuario-form"]["busquedaUsuario"].value, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
    .then((response) => response.json())
    .then((datos) => mostrarData(datos.data[0]))
    .catch((error) => console.log(error));

  // Metodo que pinta los datos
  const mostrarData = (data) => {
    let body = "";
    // for (var i = 0; i < data.length; i++) {
    body = `<tr><td>${data.nombre_usuario}</td><td>${data.apellido_usuario}</td><td>${data.fecha_registro}</td></tr>`;
    // }
    document.getElementById("data").innerHTML = body;
    //console.log(body)
  };
}

function listarUsuarios() {
  var url = "https://sistema-mgm-service-users.azurewebsites.net/api/usuarios";

  const jwtToken = getTokenFromLocalStorage();

  fetch(url, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
    .then((response) => response.json())
    .then((datos) => mostrarData(datos.data[0]))
    .catch((error) => console.log(error));

  // Metodo que pinta los datos
  const mostrarData = (data) => {
    let body = "";
    for (var i = 0; i < data.length; i++) {
      body += `<tr><td>${data[i].nombre_usuario}</td><td>${data[i].apellido_usuario}</td><td>${data[i].fecha_registro}</td></tr>`;
    }
    document.getElementById("data").innerHTML = body;
  };
}

function getTokenFromLocalStorage() {
  return localStorage.getItem("jwt");
}

function crearUsername() {
  var nombre = document.getElementsByName("nombre")[0].value.trim();
  var apellido = document.getElementsByName("apellido")[0].value.trim();

  document.getElementById("username").innerHTML =
    nombre.toLowerCase() + apellido.slice(0, 3).toLowerCase();
}

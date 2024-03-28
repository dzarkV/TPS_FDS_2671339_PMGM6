

function crearUsuario() {
  // Capturar los datos del formulario
  var valorNombre = document.forms["crearUsuarioForm"]["nombre"].value;
  var valorApellido = document.forms["crearUsuarioForm"]["apellido"].value;
  var valorPassword = document.forms["crearUsuarioForm"]["pass"].value;
  var checkPassword = document.forms["crearUsuarioForm"]["confirnpass"].value;
  var username = document.querySelector("#username").innerHTML;
  var valorRol = document.forms["crearUsuarioForm"]["rol"].value;

  // Validar campos de contraseña
  if (valorPassword !== checkPassword) {
    alert("Las contraseñas no coinciden");
  } else if (valorNombre === "" || valorApellido === "") {
    alert("Debe llenar todos los campos");
  } else if (valorPassword.length < 8) {
    alert("La contraseña debe tener al menos 8 caracteres");
  } else {
    // Si las contraseñas coinciden, se procede a verificar con el username en la API si el usuario ya existe
    url =
      "https://sistema-mgm-service-users.azurewebsites.net/api/usuario/username?value=";
    const jwtToken = getTokenFromLocalStorage();

    fetch(url + username, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((resSearchUsername) => {
        // Si la respuesta es 404 (no existe el usuario), se procede a crearlo
        if (resSearchUsername.status === 404) {
          url =
            "https://sistema-mgm-service-users.azurewebsites.net/api/usuario";
          // Se procede a crear el usuario
          fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${jwtToken}`,
            },
            body: JSON.stringify({
              nombre_usuario: valorNombre,
              apellido_usuario: valorApellido,
              rol_usuario: {
                id_rol: valorRol === "Administrador" ? 101 : 102,
                nombre_rol: valorRol
              },
              credenciales: {
                usuario: username,
                contrasena: valorPassword
              }
            }),
          })
            .then((responseCreateUser) => {
              // Si el usuario se crea exitosamente, se muestra el mensaje y se recarga la página
              if (responseCreateUser.status === 200) {
                alert(`Usuario ${username} creado exitosamente`);
                location.reload();
              } else {
                alert("Error al crear el usuario");
              }
            })
            .catch((error) => console.log(error));
        } else {
          // Si el usuario ya existe, se muestra un mensaje de alerta
          alert("El usuario ya existe");
        }
      })
      .catch((error) => console.log(error));
  }
}

function actualizarUsuario() {
    // Capturar los datos del formulario
    var valorNombreUpd = document.forms["actualizarUsuarioForm"]["nombre"].value;
    var valorApellidoUpd = document.forms["actualizarUsuarioForm"]["apellido"].value;
    var valorPasswordUpd = document.forms["actualizarUsuarioForm"]["pass"].value;
    var checkPasswordUpd = document.forms["actualizarUsuarioForm"]["confirnpass"].value;
    var usernameToUpdate = document.querySelector("#username").innerHTML;
    var valorRolToUpdate = document.forms["actualizarUsuarioForm"]["rol"].value;

    // Id de usuario a actualizar en atributo option select 
    var idUserToUpdate = document.getElementById("data-usuarios").options[document.getElementById("data-usuarios").selectedIndex].getAttribute("data-id");
  
    // Validar campos de contraseña
    if (valorPasswordUpd !== checkPasswordUpd) {
      alert("Las contraseñas no coinciden");
    } else if (valorNombreUpd === "" || valorApellidoUpd === "") {
      alert("Debe llenar todos los campos");
    } else if (valorPasswordUpd.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
    } else {
      // Si las contraseñas coinciden, se procede a verificar con el username en la API si el usuario ya existe
      url =
        "https://sistema-mgm-service-users.azurewebsites.net/api/usuario/id?value=";
      const jwtToken = localStorage.getItem("jwt");
      // const userinSession = JSON.parse(localStorage.getItem("userSession"));
  
      fetch(url + idUserToUpdate, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then(async (reSearchUsername) => {
          // Si la respuesta es 200 (porque existe el usuario), se procede a actualizar los datos según el id del usuario
          if (reSearchUsername.status === 200) {
            const busquedaUsername = await reSearchUsername.json();
            url =
              "https://sistema-mgm-service-users.azurewebsites.net/api/usuario/";
            // Se procede a crear el usuario
            fetch(url + busquedaUsername.data[0].id_usuario, {
              method: "PUT",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
              },
              body: JSON.stringify({
                nombre_usuario: valorNombreUpd,
                apellido_usuario: valorApellidoUpd,
                rol_usuario: {
                  id_rol: valorRolToUpdate === "Administrador" ? 101 : 102,
                  nombre_rol: valorRolToUpdate
                },
                credenciales: {
                  usuario: usernameToUpdate,
                  contrasena: valorPasswordUpd
                }
              })
            })
              .then((responseUpdateUser) => {
                // Si el usuario se actualiza exitosamente, se muestra el mensaje y se recarga la página
                if (responseUpdateUser.status === 200) {
                  alert(`Usuario ${usernameToUpdate} actualizado exitosamente.`);
                  location.reload();
                } else {
                  alert("Error al actualizar el usuario");
                }
              })
              .catch((error) => console.log(error));
          } else {
            // Si el usuario no existe (404), se muestra un mensaje de alerta
            alert("El usuario no existe en el sistema. \n Por favor, cree un usuario nuevo.");
          }
        })
        .catch((error) => console.log(error));
    }
  }


  function recuperarPassword() {
    //Capturar los datos del formulario
    var valorUsername = document.forms["recuperarPasswordForm"]["username"].value;
    var valorPassword = document.forms["recuperarPasswordForm"]["pass"].value;
    var checkPassword = document.forms["recuperarPasswordForm"]["confirmPass"].value;

    // Validar campos de contraseña
    if (valorPassword !== checkPassword) {
      alert("Las contraseñas no coinciden"); 
    } else if (valorPassword.length < 8) {
      alert("La contraseña debe tener al menos 8 caracteres");
    } else {
      // Si las contraseñas coinciden, se procede a verificar con el username en la API si el usuario ya existe
      url =
        "https://sistema-mgm-service-users.azurewebsites.net/api/usuario/username?value=";

      // token desde variable de entorno
      const jwtToken = process.env.JWT_RECOVERY_MGM;

      fetch(url + valorUsername, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then(async (resSearchUsername) => {
          // Si la respuesta es 200 (porque existe el usuario), se procede a actualizar los datos según el id del usuario
          if (resSearchUsername.status === 200) {
            const busquedaUsername = await reSearchUsername.json();
            url =
              "https://sistema-mgm-service-users.azurewebsites.net/api/usuario/";
            // Se procede a crear el usuario
            fetch(url + busquedaUsername.data[0].id_usuario, {
              method: "PUT",
              headers: {
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwtToken}`,
              },
              body: JSON.stringify({
                credenciales: {
                  usuario: valorUsername,
                  contrasena: valorPassword
                }
              })
            })
              .then((responseUpdateUser) => {
                // Si el usuario se crea exitosamente, se muestra el mensaje y se recarga la página
                if (responseUpdateUser.status === 200) {
                  alert(`Contraseña del usuario ${valorUsername} actualizada exitosamente.`);
                  logout();
                } else {
                  alert("Error al actualizar el usuario");
                }
              })
              .catch((error) => console.log(error));
          } else {
            // Si el usuario no existe (404), se muestra un mensaje de alerta
            alert("El usuario no existe en el sistema");
          }
        })
        .catch((error) => console.log(error));
    }

}

function obtenerFilaUsuario() {
  // Obtiene la fila del usuario en la tabla
  
  // Obtener todos los botones de estado
  const botonesEstado = document.querySelectorAll("#btn-state");

  // Agregar un evento a cada boton
  botonesEstado.forEach(function(boton) {
    boton.addEventListener("click", function(event) {
      // Obtener los datos de la fila del boton seleccionado
      const accion = boton.textContent || boton.innerText || boton.innerHTML;
      const fila = event.target.closest('tr');
      const idUsuario = fila.getAttribute('data-id');
      const nombreUsuario = fila.getAttribute('data-user');

      // Condicional según la acción del botón
      if (accion === "Habilitar" || accion === "Deshabilitar") {
        if (confirm(`¿Está seguro de ${accion.toLowerCase()} el usuario ${nombreUsuario}?`)) {
          // Llamar a la funcion para cambiar el estado del usuario
          actualizarEstadoUsuario(accion, idUsuario, nombreUsuario);
        }
      }
      else if(accion === "Eliminar"){
        if (confirm(`¿Está seguro de eliminar el usuario ${nombreUsuario}?`)) {
          // Llamar a la funcion para cambiar el estado del usuario
          eliminarUsuario(idUsuario, nombreUsuario);
        }
      }

    });
  });
}

function actualizarEstadoUsuario(accion, id, usuario) {
  // Actualizar el estado del usuario
  const status = accion === "Habilitar" ? true : false;
  // Consumir el endpoint usuario service para buscar un usuario por nombre y obtener id
  var urlBuscar = "https://sistema-mgm-service-users.azurewebsites.net/api/usuario/username?value=";
  const jwtToken = getTokenFromLocalStorage();

  // Consultar API pasando el nombre buscado
  fetch(urlBuscar + usuario, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
    .then(async (response) => {
      const user = await response.json();
      // Se procede a actualizar el estado del usuario
      url = "https://sistema-mgm-service-users.azurewebsites.net/api/usuario/";
      fetch(url + id, {
        method: "PUT",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify({
          nombre_usuario: user.data[0].nombre_usuario,
          apellido_usuario: user.data[0].apellido_usuario,
          credenciales: {
            estado: status,
          },
        }),
      })
        .then((responseUpdatedStatus) => {
          if (responseUpdatedStatus.status === 200) {
            alert(`Usuario ${user.data[0].nombre_usuario} ${user.data[0].apellido_usuario} ${status ? "habilitado" : "deshabilitado"} exitosamente.`);
            location.reload();
          } else {
            alert("Error al actualizar el estado del usuario");
          }
        })
        .catch((error) => console.log(error));
    })
    .catch((error) => console.log(error));
  
}

function eliminarUsuario(id, usuario) {
  // Consumir el endpoint usuario service para eliminar un usuario
  var url = "https://sistema-mgm-service-users.azurewebsites.net/api/usuario/";
  const jwtToken = getTokenFromLocalStorage();

  fetch(url + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  })
    .then((response) => {
      if (response.status === 200) {
        alert(`Usuario ${usuario} eliminado exitosamente.`);
        location.reload();
      } else {
        alert("Error al eliminar el usuario");
      }
    })
    .catch((error) => console.log(error));
}
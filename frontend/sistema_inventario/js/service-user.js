
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
                id_rol: 102,
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
    var usernameUpd = document.querySelector("#username").innerHTML;
    var valorRolUpd = document.forms["actualizarUsuarioForm"]["rol"].value;
  
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
        "https://sistema-mgm-service-users.azurewebsites.net/api/usuario/username?value=";
      const jwtToken = localStorage.getItem("jwt");
      const userinSession = JSON.parse(localStorage.getItem("userSession"));
  
      fetch(url + userinSession.credenciales.usuario, {
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
                // rol_usuario: {
                //   id_rol: 102,
                //   nombre_rol: valorRolUpd
                // },
                credenciales: {
                  usuario: usernameUpd,
                  contrasena: valorPasswordUpd
                }
              })
            })
              .then((responseUpdateUser) => {
                // Si el usuario se crea exitosamente, se muestra el mensaje y se recarga la página
                if (responseUpdateUser.status === 200) {
                  alert(`Usuario ${usernameUpd} actualizado exitosamente. Deberá iniciar sesión nuevamente.`);
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

        // no hay token!!!!
      const jwtToken = process.env.JWT_RECOVERY_MGM;

      fetch(url + valorUsername, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      })
        .then((resSearchUsername) => {
          // Si la respuesta es 200 (porque existe el usuario), se procede a actualizar los datos según el id del usuario
          if (resSearchUsername.status === 200) {
            url =
              "https://sistema-mgm-service-users.azurewebsites.net/api/usuario/";
            // Se procede a crear el usuario
            fetch(url + valorUsername, {
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
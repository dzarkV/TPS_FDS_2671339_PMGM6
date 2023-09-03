function navegar() {
  var select = document.querySelector("#funcionUsuario");

  switch (select.value) {
    case "1":
      window.open(logout(), "_self");
      break;
    case "2":
      window.open("Actualizar_Usuario.html", "_self");
      break;
    case "3":
      window.open("consultar_usuario.html", "_self");
      break;
    case "4":
      window.open("estados_de_usuarios.html", "_self");
      break;
    case "5":
      window.open("eliminar_usuario.html", "_self");
      break;
    case "6":
      window.open("crear_usuario.html", "_self");
      break;
    default:
      console.log("el valor es :" + select.value);
  }
}

function logout() {
  window.localStorage.removeItem("jwt");
  window.localStorage.removeItem("userSession");
  window.location.href = "login.html";
}

async function verificarUsuarioSesion(jwt) {
  const entry_endpoint = "https://sistema-mgm-service-users.azurewebsites.net";

  if (jwt) {
    await fetch(entry_endpoint + "/api/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
      .then((response) => response.json())
      .then((data) =>
        window.localStorage.setItem("userSession", JSON.stringify(data))
      );
  } else {
    window.location.href = "login.html";
  }
}

function loginUsuario() {
  const entry_endpoint = "https://sistema-mgm-service-users.azurewebsites.net";
  const span_message = document.getElementById("login_message");

  // obtener referencia al formulario
  const form = document.querySelector("#login-form");
  // agregar un gestor de eventos para enviar el formulario
  form.addEventListener("submit", async (event) => {
    // detener el comportamiento predeterminado del formulario (que es recargar la página)
    event.preventDefault();

    // obtener los datos del formulario como un objeto FormData
    const formData = new FormData(form);

    // enviar los datos al servidor usando fetch()
    const responseAuth = await fetch(entry_endpoint + "/api/login", {
      method: "POST",
      body: formData,
    });

    // procesar la respuesta del servidor
    const dataAuth = await responseAuth.json();

    // si el usuario está autenticado con token, guardar en localStorage y redirigir al usuario a la página de inicio
    if (dataAuth.access_token) {
      // guardar el token en el almacenamiento local
      window.localStorage.setItem("jwt", dataAuth.access_token);

      // verificar si el usuario está autenticado y obtener datos
      verificarUsuarioSesion(dataAuth.access_token).then(
        () => {
          // redirigir al usuario a la página de inicio
          window.location.href = "index.html";
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      // si el inicio de sesión falló, mostrar un mensaje de error
      span_message.innerText = dataAuth.detail;
    }
  });
}

window.addEventListener("DOMContentLoaded", function () {
  if (location.pathname.endsWith("login.html") == false) {
    const nombreUsuario = document.getElementById("nombreUsuario");
    const rolUsuario = document.getElementById("rolUsuario");
    const usuarioSesion = localStorage.getItem("userSession");

    nombreUsuario.innerHTML = JSON.parse(usuarioSesion).nombre_usuario;
    rolUsuario.innerHTML = JSON.parse(usuarioSesion).rol_usuario.nombre_rol;
  }

  if (location.pathname.endsWith("Actualizar_Usuario.html")) {
        // carga datos del usuario sesion en el formulario
        document.getElementsByName('nombre')[0].value = JSON.parse(localStorage.getItem("userSession")).nombre_usuario;
        document.getElementsByName('apellido')[0].value = JSON.parse(localStorage.getItem("userSession")).apellido_usuario;
        document.getElementById("username").innerHTML = JSON.parse(localStorage.getItem("userSession")).credenciales.usuario;
        document.getElementsByName('rol')[0].value = JSON.parse(localStorage.getItem("userSession")).rol_usuario.nombre_rol;
  }
});

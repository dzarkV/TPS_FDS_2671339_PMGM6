from fastapi import APIRouter, Body, Query, Response, status
from typing import Annotated
from fastapi.encoders import jsonable_encoder
from models.usuario_finded_by import UsuarioFindedBy
from werkzeug.security import generate_password_hash

from controllers.usuario import (
    add_user,
    delete_user,
    retrieve_user_by_id,
    retrieve_user_by_name,
    retrieve_user_by_username,
    retrieve_all_users,
    update_user,
)

from models.usuario import (
    ErrorResponseModel,
    ResponseModel,
    Usuario,
    UpdateUsuario,
)

usuario = APIRouter()


@usuario.post(
    "/api/usuario", response_description="Usuario agregado a la base de datos"
)
def add_usuario_data(usuario: Usuario = Body(...)):
    """Add a new user in endpoint /api/usuario"""
    usuario = jsonable_encoder(usuario)
    usuario["credenciales"]["contrasena"] = generate_password_hash(
        password=usuario["credenciales"]["contrasena"], method="scrypt"
    )
    new_usuario = add_user(usuario)
    return ResponseModel(new_usuario, "Usuario agregado exitosamente.")


@usuario.get(
    "/api/usuarios", response_description="Usuarios obtenidos de la base de datos"
)
def get_all_usuarios(response: Response):
    """Get all users in endpoint /usuarios"""
    usuarios = retrieve_all_users()
    if usuarios:
        return ResponseModel(usuarios, "Usuarios obtenidos exitosamente.")
    response.status_code = status.HTTP_404_NOT_FOUND
    return ErrorResponseModel(
        "No se encontraron usuarios.", 404, "No se encontraron usuarios."
    )


@usuario.get(
    "/api/usuario/{find_by}",
    response_description="Usuario obtenido de la base de datos",
)
def get_usuario(
    find_by: UsuarioFindedBy,
    value: Annotated[str, Query(max_length=25)],
    response: Response,
):
    """Get a user by id or name in endpoint /usuario/{find_by}"""
    usuario = {}
    if find_by == UsuarioFindedBy.id:
        usuario = retrieve_user_by_id(value)
    elif find_by == UsuarioFindedBy.name:
        usuario = retrieve_user_by_name(value)
    elif find_by == UsuarioFindedBy.username:
        usuario = retrieve_user_by_username(value)

    if usuario:
        return ResponseModel(usuario, "Usuario obtenido exitosamente.")
    response.status_code = status.HTTP_404_NOT_FOUND
    return ErrorResponseModel(
        "No se encontró el usuario.", 404, "No se encontró el usuario."
    )


@usuario.put("/api/usuario/{id}")
def update_usuario_data(id: str, response: Response, data: UpdateUsuario = Body(...)):
    """Update a user by id in endpoint /api/usuario/{id}"""
    user_dict = delete_none_in_dict(data.dict())
    try:
        if user_dict["credenciales"]["contrasena"]:
            user_dict["credenciales"]["contrasena"] = generate_password_hash(
                password=user_dict["credenciales"]["contrasena"], method="scrypt"
            )
    except KeyError:
        print("No pass key sended")

    updated_usuario = update_user(id, user_dict)
    if updated_usuario:
        return ResponseModel(
            "Usuario con ID: {} actualizado exitosamente.".format(id),
            "Usuario actualizado exitosamente.",
        )
    response.status_code = status.HTTP_404_NOT_FOUND
    return ErrorResponseModel(
        "Error al actualizar el usuario.", 404, "No se encontró el usuario."
    )


def delete_none_in_dict(_dict):
    """Delete None values recursively from all of the
    dictionaries, tuples, lists, sets"""
    if isinstance(_dict, dict):
        for key, value in list(_dict.items()):
            if isinstance(value, (list, dict, tuple, set)):
                _dict[key] = delete_none_in_dict(value)
            elif value is None or key is None:
                del _dict[key]
    elif isinstance(_dict, (list, set, tuple)):
        _dict = type(_dict)(
            delete_none_in_dict(item) for item in _dict if item is not None
        )
    return _dict


@usuario.delete(
    "/api/usuario/{id}", response_description="Usuario eliminado de la base de datos"
)
def delete_usuario_data(id: str, response: Response):
    """Delete a user by id in endpoint /api/usuario/{id}"""
    deleted_usuario = delete_user(id)
    if deleted_usuario:
        return ResponseModel(
            "Usuario con ID: {} eliminado exitosamente.".format(id),
            "Usuario eliminado exitosamente.",
        )
    response.status_code = status.HTTP_404_NOT_FOUND
    return ErrorResponseModel(
        "Error al eliminar el usuario.", 404, "No se encontró el usuario."
    )

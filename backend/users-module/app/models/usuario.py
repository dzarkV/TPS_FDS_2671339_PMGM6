from pydantic import BaseModel, Field, constr
from typing import Optional, Union
from datetime import date
from models.rol import Rol, UpdateRol
from models.credencial import Credencial, UpdateCredencial


class Usuario(BaseModel):
    """Modelo de datos para un usuario del sistema"""

    nombre_usuario: constr(strict=True, min_length=3, max_length=20) = Field(
        ..., example="Dinense"
    )
    apellido_usuario: constr(strict=True, min_length=3, max_length=20) = Field(
        ..., example="Pardo"
    )
    fecha_registro: Union[date | str] = date.today()
    rol_usuario: Rol
    credenciales: Credencial

    class Config:
        """Configuración del modelo de datos de usuario"""

        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        schema_extra = {
            "example": {
                "nombre_usuario": "Segundo",
                "apellido_usuario": "Pardo",
                "rol_usuario": {"id_rol": 101, "nombre_rol": "Administrador"},
                "credenciales": {
                    "usuario": "segundopa",
                    "contrasena": "secret123",
                    "estado": True,
                },
            }
        }


class UpdateUsuario(BaseModel):
    """Modelo de datos para actualizar un usuario del sistema"""

    nombre_usuario: Optional[str]
    apellido_usuario: Optional[str]
    fecha_registro: Optional[date]
    rol_usuario: Optional[UpdateRol]
    credenciales: Optional[UpdateCredencial]

    class Config:
        """Configuración del modelo de datos de usuario
        cuando es actualizado. Además de un ejemplo de
        como se debe enviar la información para actualizar
        """

        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        schema_extra = {
            "example": {
                "nombre_usuario": "Tercero",
                "apellido_usuario": "Fontecha",
                "rol_usuario": {"id_rol": 102, "nombre_rol": "Vendedor"},
                "credenciales": {
                    "usuario": "terceropa",
                    "contrasena": "secret122",
                    "estado": True,
                },
            }
        }


def ResponseModel(data, message):
    """Modelo de respuesta para el usuario en caso exitoso"""
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    """Modelo de respuesta para el usuario en caso de error"""
    return {"error": error, "code": code, "message": message}

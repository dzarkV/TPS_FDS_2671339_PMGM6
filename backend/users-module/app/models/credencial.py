from typing import Optional
import uuid
from pydantic import BaseModel, Field, constr


class Credencial(BaseModel):
    """Modelo de Credenciales de usuario"""

    id_credencial: Optional[str] = Field(default_factory=uuid.uuid1, alias="_id")
    usuario: constr(strict=True, min_length=3, max_length=20) = Field(
        ..., example="alexandergo"
    )
    contrasena: constr(strict=True, min_length=8, max_length=20) = Field(
        ..., example="secret123"
    )
    estado: bool = Field(default=True, example=True)


class UpdateCredencial(BaseModel):
    """Modelo de Credenciales de usuario cuando se actualizan los datos"""

    usuario: Optional[str]
    contrasena: Optional[str]
    estado: Optional[bool]

    class Config:
        """Configuracion de los campos

        - allow_population_by_field_name: Permite la asignacion
        de valores por nombre de campo
        - arbitrary_types_allowed: Permite el uso de tipos arbitrarios
        """

        allow_population_by_field_name = True
        arbitrary_types_allowed = True

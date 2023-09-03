from enum import Enum


class UsuarioFindedBy(str, Enum):
    """Enum para los campos por los cuales se puede buscar un usuario"""

    id = "id"
    name = "name"
    username = "username"

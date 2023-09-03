import pytest
from app.controllers.usuario import (
    retrieve_all_users,
    retrieve_user_by_id,
    user_helper,
    add_user,
    retrieve_user_by_name,
    delete_user,
)


class TestControllerUsuario:
    """
    Pruebas unitarias para controlador usuario
    """

    USUARIO_VALIDO = {
        "_id": "60a7b3b6e4b9f9b5f0e1b1a2",
        "nombre_usuario": "nombre_user",
        "apellido_usuario": "apellido_user",
        "fecha_registro": "2021-05-01",
        "rol_usuario": {"id_rol": "101", "nombre_rol": "test_rol"},
        "credenciales": {
            "usuario": "test_user",
            "contrasena": "test_password",
            "estado": "activo",
        },
    }

    def test_user_helper(self):
        """Test function to converts a user from MongoDB to a dictionary"""
        assert user_helper(self.USUARIO_VALIDO) == {
            "id_usuario": "60a7b3b6e4b9f9b5f0e1b1a2",
            "nombre_usuario": "nombre_user",
            "apellido_usuario": "apellido_user",
            "fecha_registro": "2021-05-01",
            "rol_usuario": {"id_rol": "101", "nombre_rol": "test_rol"},
            "credenciales": {
                "usuario": "test_user",
                "contrasena": "test_password",
                "estado": "activo",
            },
        }

    def test_retrieve_all_users(self):
        """Test to check the retrieve user function is not empty"""
        assert retrieve_all_users() != []

    def test_add_user_valido(self):
        """Test to check the add user function is like a user valid"""
        usuario_sin_id = self.USUARIO_VALIDO.copy()
        del usuario_sin_id["_id"]
        usuario_added = add_user(usuario_sin_id.copy())
        del usuario_added["id_usuario"]
        assert usuario_sin_id == usuario_added

    @pytest.mark.parametrize(
        "objectId,expected",
        [
            ("60a7b3b6e4b9f9b5f0e1b1a2", False),
            (12345678, False),
            ("5678", False),
            ([], False),
            ({"60a7b3b6e4b9f9b5f0e1b1a6"}, False),
        ],
    )
    def test_retrieve_user_by_id_invalid(self, objectId, expected):
        """Parametrized test to check the retrieve user by id function only  with valid id"""
        assert retrieve_user_by_id(objectId) is expected

    @pytest.mark.parametrize(
        "usern_name,expected",
        [
            (
                "Lalo",
                {
                    "id_usuario": "648dcf32289bb3847673d75b",
                    "nombre_usuario": "Lalo",
                    "apellido_usuario": "Landa",
                    "fecha_registro": "2023-06-17",
                    "rol_usuario": {"id_rol": 102, "nombre_rol": "Vendedor"},
                    "credenciales": {
                        "_id": "77f275b0-0d22-11ee-93f3-2edf6ce5aa9d",
                        "usuario": "lalolan",
                        "contrasena": "scrypt:32768:8:1$SRJ3quxBaxeKyMPb$d3a51d6e5949409e07220117da57b7ead5a6ecfedff5058d7b017e938324b9cc5b42ac100c30c4179b3c64d0cbe5155f870b9304d31a1a9cc41afb4bfaba3197",
                        "estado": True,
                    },
                },
            ),
            ("Prueba", False),
            ("", False),
            (" ", False),
            (123, False),
        ],
    )
    def test_retrieve_user_by_name(self, usern_name, expected):
        assert retrieve_user_by_name(usern_name) == expected

    @pytest.mark.parametrize(
        "objectId,expected",
        [
            ("60a7b3b6e4b9f9b5f07777", False),
            (12345678, False),
        ],
    )
    def test_delete_user_by_id_invalid(self, objectId, expected):
        """Test to check the delete user with invalid id doesn´t work"""
        assert delete_user(objectId) is expected

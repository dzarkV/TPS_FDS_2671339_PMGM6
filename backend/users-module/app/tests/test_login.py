import pytest
from app.controllers.login import authenticate_user


class TestControllerLogin:
    """Pruebas unitarias para controlador login"""

    @pytest.mark.parametrize(
        "username, password",
        [
            ("test_user", "$2b$12$0Z1Z1Z1Z1Z1Z1Z1Z1Z1Z1"),
            ("uservalid", 12345),
            (" ", " "),
            ({"data"}, True),
            ([], []),
        ],
    )
    def test_authenticate_user_invalid(self, username, password):
        """Test to check the authenticate user function when user does not exist"""
        assert authenticate_user(username, password) is False

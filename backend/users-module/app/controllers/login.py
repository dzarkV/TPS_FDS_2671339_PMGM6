from datetime import datetime, timedelta
from os import getenv
from typing import Union

from dotenv import load_dotenv
from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from werkzeug.security import check_password_hash

from .usuario import retrieve_user_by_name, retrieve_user_by_username

load_dotenv()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/login")


def verify_pass(pass_hashed: str, form_pass: str) -> bool:
    """Verify password"""
    return check_password_hash(pwhash=pass_hashed, password=form_pass)


def decode_token(token: str = Depends(oauth2_scheme)) -> dict:
    """Decode token"""
    credential_exception = HTTPException(
        status_code=401,
        detail="Usuario no encontrado",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        token_decode = jwt.decode(
            token=token, key=getenv("SECRET_KEY"), algorithms=[getenv("ALGORITHM")]
        )
        username = token_decode.get("name")
        if username is None:
            raise credential_exception
    except JWTError:
        raise credential_exception

    user = retrieve_user_by_name(username)
    if user is None:
        raise credential_exception
    del user["id_usuario"]
    del user["rol_usuario"]["id_rol"]
    del user["credenciales"]["_id"]
    del user["credenciales"]["contrasena"]
    return user


def authenticate_user(username: str, password: str) -> bool | dict:
    """Authenticate user"""
    if not isinstance(username, str) or not isinstance(password, str):
        return False
    user = retrieve_user_by_username(username)
    if not user:
        return False
    passwd = verify_pass(user["credenciales"]["contrasena"], password)
    if not passwd:
        return False
    return user


def create_token(data: dict, time_expire: Union[timedelta, None] = None) -> str:
    """Create token"""
    data_copy = data.copy()
    if time_expire is None:
        expire = datetime.utcnow() + timedelta(days=5)
    else:
        expire = datetime.utcnow() + time_expire
    data_copy.update({"exp": expire})
    token_jwt = jwt.encode(
        data_copy, key=getenv("SECRET_KEY"), algorithm=getenv("ALGORITHM")
    )
    return token_jwt

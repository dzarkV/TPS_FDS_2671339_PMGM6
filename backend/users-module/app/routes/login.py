from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from models.usuario import Usuario
from controllers.login import authenticate_user, create_token, decode_token
from datetime import timedelta

login = APIRouter()


@login.post("/api/login")
def login_with_token(form_data: OAuth2PasswordRequestForm = Depends()) -> dict:
    """Login with token"""
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=401,
            detail="Nombre de usuario o contraseña incorrectos",
            headers={"WWW-Authenticate": "Bearer"},
        )

    if user["credenciales"]["estado"] is False:
        raise HTTPException(
            status_code=401,
            detail="Usuario inactivo",
            headers={"WWW-Authenticate": "Bearer"},
        )
    # Token
    access_token_expires = timedelta(days=7)
    access_token_jwt = create_token(
        {"sub": user["id_usuario"], "name": user["nombre_usuario"]},
        access_token_expires,
    )

    return {"access_token": access_token_jwt, "token_type": "bearer"}


@login.get("/api/me")
def login_me(current_user: dict | Usuario = Depends(decode_token)) -> dict | Usuario:
    """Login user in session"""
    return current_user

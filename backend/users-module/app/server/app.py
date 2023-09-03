from db_conn import client
from fastapi import Depends, FastAPI
from routes.login import login as LoginRouter
from routes.login import login_me
from routes.usuario import usuario as UsuarioRouter

app = FastAPI(
    title="Users module",
    description="API REST de servicio de usuarios del sistema MGM",
    version="0.0.1",
)

app.include_router(UsuarioRouter, tags=["Usuarios"], dependencies=[Depends(login_me)])
app.include_router(LoginRouter, tags=["Login"])


@app.get("/", tags=["Root"])
def root_page():
    return {"message": "Qué hace"}


@app.on_event("shutdown")
def shutdown():
    client.close()

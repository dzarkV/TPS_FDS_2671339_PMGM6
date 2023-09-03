from bson.objectid import ObjectId
from db_conn import user_collection


def user_helper(user) -> dict:
    """Converts a user from MongoDB to a dictionary, it means that
    this function helps to convert data from db to python dict
    """
    return {
        "id_usuario": str(user["_id"]),
        "nombre_usuario": user["nombre_usuario"],
        "apellido_usuario": user["apellido_usuario"],
        "fecha_registro": user["fecha_registro"],
        "rol_usuario": user["rol_usuario"],
        "credenciales": user["credenciales"],
    }


def retrieve_all_users() -> list:
    """Retrieve all users present in the database"""
    users = []
    for user in user_collection.find():
        users.append(user_helper(user))
    return users


def add_user(user_data: dict) -> dict:
    """Add a new user into to the database"""
    user_id_inserted = user_collection.insert_one(user_data).inserted_id
    new_user = user_collection.find_one({"_id": user_id_inserted})
    return user_helper(new_user)


def retrieve_user_by_id(id: str) -> dict | bool:
    """Retrieve a user with a matching ID"""
    if not ObjectId.is_valid(id):
        return False
    user = user_collection.find_one({"_id": ObjectId(id)})
    if user is not None:
        return user_helper(user)
    else:
        return False


def retrieve_user_by_name(name: str) -> dict | bool:
    """Retrieve a user with a matching name"""
    user = user_collection.find_one({"nombre_usuario": name})
    if user:
        return user_helper(user)
    else:
        return False


def retrieve_user_by_username(username: str) -> dict | bool:
    """Retrieve a user with a matching username"""
    user = user_collection.find_one({"credenciales.usuario": username})
    if user:
        return user_helper(user)
    else:
        return False


def update_user(id: str, data: dict):
    """Update a user with a matching ID"""
    # Return false if an empty request body is sent or id is not valid
    if len(data) < 1 or not ObjectId.is_valid(id):
        return False
    # Find the user in db
    user = user_collection.find_one({"_id": ObjectId(id)})
    if user:
        user_modified = update_dict_recursive(user, data)
        del user_modified["_id"]
        updated_user = user_collection.update_one(
            {"_id": ObjectId(id)}, {"$set": user_modified}
        )
        if updated_user:
            return True
        return False


def update_dict_recursive(original_user, items_modified):
    """Update user's items in dictionary
    in a recursive way (because of embedded json)
    """
    for key in items_modified.keys():
        if isinstance(original_user[key], dict):
            update_dict_recursive(original_user[key], items_modified[key])
        else:
            original_user[key] = items_modified[key]
    return original_user


def delete_user(id: str):
    """Delete a user from the database"""
    if not ObjectId.is_valid(id):
        return False
    user = user_collection.find_one({"_id": ObjectId(id)})
    if user:
        user_collection.delete_one({"_id": ObjectId(id)})
        return True

from typing import Optional
from flask import request
from firebase_admin.auth import verify_id_token
from firebase_admin import firestore


# https://pradyothkukkapalli.com/tech/firebase-auth-client-and-backend/
def get_current_user() -> str:
    # Return None if no Authorization header.
    if "Authorization" not in request.headers:
        return None
    authorization = request.headers["Authorization"]

    # Authorization header format is "Bearer <token>".
    # This matches OAuth 2.0 spec:
    # https://www.rfc-editor.org/rfc/rfc6750.txt.
    if not authorization.startswith("Bearer "):
        return None

    token = authorization.split("Bearer ")[1]
    try:
        # Verify that the token is valid.
        result = verify_id_token(token)
        # Return the user ID of the authenticated user.
        return result["uid"]
    except:
        return None


def get_user_team(user) -> dict:
    db = firestore.client()
    user_ref = db.collection("managers").document(user)
    team = user_ref.get()
    return team

from flask import Blueprint

from api.db import get_db, close_db

teams_bp = Blueprint("teams", __name__, url_prefix="/api/teams")


@teams_bp.route("")
def list_teams():
    db = get_db()

    db.execute("SELECT * FROM teams")
    teams = db.fetchall()
    close_db()
    
    return teams

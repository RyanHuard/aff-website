from flask import Blueprint

from api.db import get_db

teams_bp = Blueprint("teams", __name__, url_prefix="/teams")


@teams_bp.route("")
def list_teams():
    db = get_db()
    db.execute("SELECT * FROM teams")
    return db.fetchall()


@teams_bp.route("/standings/<season_id>")
def list_team_stats(season_id):
    db = get_db()
    db.execute("SELECT * FROM team_standings WHERE season_id = %s", season_id)
    return db.fetchall()


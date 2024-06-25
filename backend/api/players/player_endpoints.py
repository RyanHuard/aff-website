from flask import Blueprint

from ..db import get_db, close_db

player_bp = Blueprint("players", __name__, url_prefix="/api/players")


@player_bp.route("/<first_name>/<last_name>")
def get_player_details(first_name, last_name):
    db = get_db

    db.execute(
        "SELECT * FROM rosters WHERE fname = %s AND lname = %s ORDER BY season_id LIMIT 1"
    )

    player_details = db.fetchone()

    return player_details

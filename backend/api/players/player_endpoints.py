from flask import Blueprint

from ..db import get_db, close_db
from .player_handler import get_team_details_by_player

player_bp = Blueprint("players", __name__, url_prefix="/api/players")


@player_bp.route("/<first_name>/<last_name>")
def get_player_details(first_name, last_name):
    db = get_db()

    db.execute(
        "SELECT * FROM rosters WHERE fname ILIKE %s AND lname ILIKE %s ORDER BY season_id LIMIT 1",
        (first_name, last_name),
    )

    player_details = db.fetchone()

    team_details = get_team_details_by_player(player_details)

    player_details["team_details"] = team_details

    close_db()

    return player_details

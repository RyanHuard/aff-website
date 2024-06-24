from flask import Blueprint

from ..db import get_db, close_db
from .home_handler import handle_stats

home_bp = Blueprint("home", __name__, url_prefix="/api/home")

@home_bp.route("/stats/weekly")
def get_weekly_stat_leaders():
    db = get_db()

    db.execute("""SELECT *
    FROM player_stats
    WHERE game_id IN (
        SELECT DISTINCT game_id
        FROM player_stats
        ORDER BY game_id DESC
        LIMIT 5
    )""")
    player_stats = db.fetchall()

    close_db()

    organized_player_stats = handle_stats(player_stats)

    return organized_player_stats
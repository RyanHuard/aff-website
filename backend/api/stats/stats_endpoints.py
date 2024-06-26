from flask import Blueprint, request

from api.db import get_db
from .stats_handler import query_season_stats, handle_stats

stats_bp = Blueprint("player_stats", __name__, url_prefix="/api/player-stats")


@stats_bp.route("")
def get_season_stats():
    season_id = request.args.get("season-id")
    team_city = request.args.get("team-city")
    first_name = request.args.get("first-name")
    last_name = request.args.get("last-name")

    player_stats = query_season_stats(season_id, team_city, first_name, last_name)
    organized_player_stats = handle_stats(player_stats)

    return organized_player_stats

from flask import Blueprint, request

from api.db import get_db, close_db
from .games_handler import handle_stats, query_season_schedule


games_bp = Blueprint("games", __name__, url_prefix="/api/games")


@games_bp.route("/schedule/<season_id>")
def get_schedule(season_id):
    team_id = request.args.get("teamId")
    schedule = query_season_schedule(season_id, team_id)

    return schedule


@games_bp.route("/details/<int:game_id>")
def get_game_details(game_id):
    db = get_db()

    db.execute("SELECT * FROM games WHERE game_id = %s", (game_id,))
    game_details = db.fetchone()

    close_db()

    return game_details


@games_bp.route("/stats/<int:game_id>")
def get_game_stats(game_id):
    db = get_db()

    db.execute(
        """
    SELECT player_stats.*
    FROM player_stats
    JOIN games ON player_stats.game_id = games.game_id
    JOIN teams ON games.away_team_id = teams.team_id
    WHERE games.game_id = %s
    AND player_stats.team_city = teams.abbreviation
    """,
        (game_id,),
    )
    away_team_stats = db.fetchall()

    db.execute(
        """
    SELECT player_stats.*
    FROM player_stats
    JOIN games ON player_stats.game_id = games.game_id
    JOIN teams ON games.home_team_id = teams.team_id
    WHERE games.game_id = %s
    AND player_stats.team_city = teams.abbreviation
    """,
        (game_id,),
    )
    home_team_stats = db.fetchall()

    close_db

    return {
        "away_team_stats": handle_stats(away_team_stats),
        "home_team_stats": handle_stats(home_team_stats),
    }

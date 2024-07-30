from flask import Blueprint, request, jsonify
from api.db import get_db, close_db
from .games_handler import handle_stats, query_season_schedule, handle_schedule


games_bp = Blueprint("games", __name__, url_prefix="/api/games")


@games_bp.route("/schedule/<season_id>")
def get_schedule(season_id):
    team_id = request.args.get("team-id")
    schedule = query_season_schedule(season_id, team_id)

    return handle_schedule(schedule)


@games_bp.route("/details/<game_id>")
def get_game_details(game_id):
    db = get_db()

    db.execute(
        """SELECT games.game_id, games.season_id, games.away_team_id, games.home_team_id, 
                  games.away_team_score, games.home_team_score, 
                  away.team_location AS away_team_location, away.team_name AS away_team_name,
                  away.abbreviation AS away_team_abbreviation, away.team_logo AS away_team_logo,
                  home.team_location AS home_team_location, home.team_name AS home_team_name, 
                  home.abbreviation AS home_team_abbreviation, home.team_logo AS home_team_logo,
                  away_standings.wins AS away_team_wins, away_standings.loss AS away_team_loss,
                  away_standings.points_for AS away_team_points_for, away_standings.points_against AS away_team_points_against,
                  home_standings.wins AS home_team_wins, home_standings.loss AS home_team_loss,
                  home_standings.points_for AS home_team_points_for, home_standings.points_against AS home_team_points_against
           FROM games
           JOIN teams AS away ON away.team_id = games.away_team_id
           JOIN teams AS home ON home.team_id = games.home_team_id
           LEFT JOIN team_standings AS away_standings ON away_standings.team_id = games.away_team_id AND away_standings.season_id = games.season_id
           LEFT JOIN team_standings AS home_standings ON home_standings.team_id = games.home_team_id AND home_standings.season_id = games.season_id
           WHERE games.game_id = %s""",
        (game_id,),
    )
    game_details = db.fetchone()

    close_db()

    if game_details is None:
        return jsonify({"error": "Game not found"}), 404

    return handle_schedule([game_details])[0]


@games_bp.route("/stats/<game_id>")
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
    AND player_stats.first_name <> 'BACKUP'
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
    AND player_stats.first_name <> 'BACKUP'
    """,
        (game_id,),
    )
    home_team_stats = db.fetchall()

    close_db

    return {
        "away_team_stats": handle_stats(away_team_stats),
        "home_team_stats": handle_stats(home_team_stats),
    }

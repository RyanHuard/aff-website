from flask import request

from api.db import get_db, close_db


def handle_stats(player_stats):
    passing_stats = []
    rushing_stats = []
    receiving_stats = []
    defense_stats = []
    kicking_stats = []
    punting_stats = []
    kick_returning_stats = []
    punt_returning_stats = []

    for player in player_stats:
        if player["match_pass_attempts"] > 0:
            passing_stats.append(player)
        if player["match_rush_attempts"] > 0:
            rushing_stats.append(player)
        if (
            player["match_receiving_targets"] > 0
            or player["match_receiving_receptions"] > 0
        ):
            receiving_stats.append(player)
        if (
            player["match_defense_tackles"] > 0
            or player["match_defense_deflections"] > 0
        ):
            defense_stats.append(player)
        if player["match_kick_fg_attempts"] > 0 or player["match_kick_xp_attempts"] > 0:
            kicking_stats.append(player)
        if player["match_punt_count"] > 0:
            punting_stats.append(player)
        if player["match_kick_return_count"] > 0:
            kick_returning_stats.append(player)
        if player["match_punt_return_count"] > 0:
            punt_returning_stats.append(player)

    stats_dict = {
        "passing": passing_stats,
        "rushing": rushing_stats,
        "receiving": receiving_stats,
        "defense": defense_stats,
        "kicking": kicking_stats,
        "punting": punting_stats,
        "kick_returning": kick_returning_stats,
        "punt_returning": punt_returning_stats,
    }

    return stats_dict


def query_season_schedule(season_id, team_id=None):
    db = get_db()

    query = """SELECT 
    games.game_id, 
    games.season_id,
    away.team_location AS away_team_location, 
    away.team_name AS away_team_name,
    home.team_location AS home_team_location, 
    home.team_name AS home_team_name,
    games.away_team_score, 
    games.home_team_score,
    away_standings.wins AS away_team_wins,
    away_standings.loss AS away_team_loss,
    home_standings.wins AS home_team_wins,
    home_standings.loss AS home_team_loss,
    away.team_logo AS away_team_logo,
    home.team_logo AS home_team_logo, 
    away.abbreviation AS away_team_abbreviation, 
    home.abbreviation AS home_team_abbreviation,
    away.helmet AS away_team_helmet, 
    home.helmet AS home_team_helmet, 
    away.team_id AS away_team_id, 
    home.team_id AS home_team_id
FROM 
    games
JOIN 
    teams away ON games.away_team_id = away.team_id
JOIN 
    teams home ON games.home_team_id = home.team_id
LEFT JOIN 
    team_standings away_standings ON games.away_team_id = away_standings.team_id AND games.season_id = away_standings.season_id
LEFT JOIN 
    team_standings home_standings ON games.home_team_id = home_standings.team_id AND games.season_id = home_standings.season_id
WHERE games.season_id = %s
"""

    params = [season_id]
    if team_id is not None:
        query += (
            " AND (away_team_id = %s OR home_team_id = %s) ORDER BY games.game_id ASC"
        )
        params.extend([team_id, team_id])

    db.execute(query, params)
    schedule = db.fetchall()

    close_db()

    return schedule


def handle_schedule(schedule):
    sorted_schedule = sorted(schedule, key=lambda x: x["game_id"])
    organized_schedule = []

    for game_details in sorted_schedule:
        game = {
            "game_id": game_details["game_id"],
            "season_id": game_details["season_id"],
            "away_team_id": game_details["away_team_id"],
            "home_team_id": game_details["home_team_id"],
            "away_team_score": game_details["away_team_score"],
            "home_team_score": game_details["home_team_score"],
            "away_team": {
                "name": game_details["away_team_name"],
                "location": game_details["away_team_location"],
                "logo": game_details["away_team_logo"],
                "helmet": game_details.get("away_team_helmet", None),
                "abbreviation": game_details["away_team_abbreviation"],
                "current_season": {
                    "wins": game_details["away_team_wins"],
                    "loss": game_details["away_team_loss"],
                    "points_for": game_details.get("away_team_points_for", None),
                    "points_against": game_details.get(
                        "away_team_points_against", None
                    ),
                },
            },
            "home_team": {
                "name": game_details["home_team_name"],
                "location": game_details["home_team_location"],
                "logo": game_details["home_team_logo"],
                "helmet": game_details.get("home_team_helmet", None),
                "abbreviation": game_details["home_team_abbreviation"],
                "current_season": {
                    "wins": game_details["home_team_wins"],
                    "loss": game_details["home_team_loss"],
                    "points_for": game_details.get("home_team_points_for", None),
                    "points_against": game_details.get(
                        "home_team_points_against", None
                    ),
                },
            },
        }
        organized_schedule.append(game)

    return organized_schedule

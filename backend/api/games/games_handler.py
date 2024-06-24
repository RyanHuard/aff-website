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
        if player["match_receiving_targets"] > 0 or player["match_receiving_receptions"] > 0:
            receiving_stats.append(player)
        if player["match_defense_tackles"] > 0 or player["match_defense_deflections"] > 0:
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
        "punt_returning": punt_returning_stats
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
    away.team_logo, 
    home.team_logo, 
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
        query += " AND away_team_id = %s OR home_team_id = %s"
        params.extend([team_id, team_id])

    db.execute(query, params)
    schedule = db.fetchall()

    close_db()

    return schedule

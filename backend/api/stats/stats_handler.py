from api.db import get_db, close_db

def query_season_stats(season_id, team_city=None):
    db = get_db()

    player_stats_query = """
    SELECT 
        first_name,
        last_name,
        position,
        team_city,
        SUM(fantasy_points) AS total_fantasy_points,
        SUM(match_defense_deflections) AS season_defense_deflections,
        SUM(match_defense_int) AS season_defense_int,
        SUM(match_defense_int_tds) AS season_defense_int_tds,
        SUM(match_defense_int_yards) AS season_defense_int_yards,
        MAX(match_defense_int_yards_long) AS season_defense_int_yards_long,
        SUM(match_defense_sacks) AS season_defense_sacks,
        SUM(match_defense_tackles) AS season_defense_tackles,
        SUM(match_defense_tackles_for_loss) AS season_defense_tackles_for_loss,
        SUM(match_fumble) AS season_fumble,
        SUM(match_fumble_forced) AS season_fumble_forced,
        SUM(match_fumble_recovered) AS season_fumble_recovered,
        SUM(match_fumble_recovered_tds) AS season_fumble_recovered_tds,
        SUM(match_fumble_recovered_yards) AS season_fumble_recovered_yards,
        SUM(match_kick_count) AS season_kick_count,
        SUM(match_kick_fg_attempts) AS season_kick_fg_attempts,
        MAX(match_kick_fg_long) AS season_kick_fg_long,
        SUM(match_kick_fg_made) AS season_kick_fg_made,
        SUM(match_kick_return_count) AS season_kick_return_count,
        MAX(match_kick_return_long) AS season_kick_return_long,
        SUM(match_kick_return_tds) AS season_kick_return_tds,
        SUM(match_kick_return_yards) AS season_kick_return_yards,
        SUM(match_kick_touchbacks) AS season_kick_touchbacks,
        SUM(match_kick_xp_attempts) AS season_kick_xp_attempts,
        SUM(match_kick_xp_made) AS season_kick_xp_made,
        SUM(match_pass_attempts) AS season_pass_attempts,
        SUM(match_pass_completions) AS season_pass_completions,
        SUM(match_pass_ints) AS season_pass_ints,
        MAX(match_pass_long) AS season_pass_long,
        SUM(match_pass_sacks) AS season_pass_sacks,
        SUM(match_pass_tds) AS season_pass_tds,
        SUM(match_pass_yards) AS season_pass_yards,
        SUM(match_punt_count) AS season_punt_count,
        SUM(match_punt_gross_yards) AS season_punt_gross_yards,
        MAX(match_punt_long) AS season_punt_long,
        SUM(match_punt_net_yards) AS season_punt_net_yards,
        SUM(match_punt_return_count) AS season_punt_return_count,
        MAX(match_punt_return_long) AS season_punt_return_long,
        SUM(match_punt_return_tds) AS season_punt_return_tds,
        SUM(match_punt_return_yards) AS season_punt_return_yards,
        SUM(match_punt_touchbacks) AS season_punt_touchbacks,
        SUM(match_receiving_drops) AS season_receiving_drops,
        MAX(match_receiving_long) AS season_receiving_long,
        SUM(match_receiving_receptions) AS season_receiving_receptions,
        SUM(match_receiving_targets) AS season_receiving_targets,
        SUM(match_receiving_tds) AS season_receiving_tds,
        SUM(match_receiving_yards) AS season_receiving_yards,
        SUM(match_rush_attempts) AS season_rush_attempts,
        MAX(match_rush_long) AS season_rush_long,
        SUM(match_rush_tds) AS season_rush_tds,
        SUM(match_rush_yards) AS season_rush_yards,
        SUM(match_safeties) AS season_safeties,
        SUM(match_two_point_conversion_plays) AS season_two_point_conversion_plays,
        SUM(match_two_point_conversions) AS season_two_point_conversions
    FROM 
        player_stats
    WHERE season_id = %s
    """

    params = [season_id]
    if team_city is not None:
        player_stats_query += " AND team_city ILIKE %s"
        params.append(team_city)
    
    player_stats_query += "AND first_name <> 'BACKUP' GROUP BY first_name, last_name, position, team_city"

    db.execute(player_stats_query, params)
    player_stats = db.fetchall()
    
    close_db()

    return player_stats


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
        if player["season_pass_attempts"] > 0:
            passing_stats.append(player)
        if player["season_rush_attempts"] > 0:
            rushing_stats.append(player)
        if player["season_receiving_targets"] > 0 or player["season_receiving_receptions"] > 0:
            receiving_stats.append(player)
        if player["season_defense_tackles"] > 0 or player["season_defense_deflections"] > 0:
            defense_stats.append(player)
        if player["season_kick_fg_attempts"] > 0 or player["season_kick_xp_attempts"] > 0:
            kicking_stats.append(player)
        if player["season_punt_count"] > 0:
            punting_stats.append(player)
        if player["season_kick_return_count"] > 0:
            kick_returning_stats.append(player)
        if player["season_punt_return_count"] > 0:
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
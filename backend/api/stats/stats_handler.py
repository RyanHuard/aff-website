from api.db import get_db, close_db


def query_season_stats(season_id=None, team_city=None, first_name=None, last_name=None):
    db = get_db()

    player_stats_query = """
    SELECT 
        first_name,
        last_name,
        position,
        COUNT(*) AS games_played,
        season_id,
        team_city,
        teams.team_location,
        teams.team_name,
        teams.team_logo,
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
    JOIN teams ON teams.abbreviation = player_stats.team_city
    """

    params = []

    if season_id is not None:
        player_stats_query += " WHERE season_id = %s"
        params.append(season_id)

    if team_city is not None:
        player_stats_query += " AND team_city ILIKE %s"
        params.append(team_city)

    if first_name is not None:
        player_stats_query += " AND first_name ILIKE %s"
        params.append(first_name)

    if last_name is not None:
        player_stats_query += " AND last_name ILIKE %s"
        params.append(last_name)

    player_stats_query += """AND first_name <> 'BACKUP' 
    GROUP BY first_name, last_name, position, team_city, season_id,
    teams.team_location, teams.team_name, teams.team_logo"""

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
        # Makes the team details object
        player["team"] = {
            "name": player["team_name"],
            "location": player["team_location"],
            "abbreviation": player["team_city"],
            "logo": player["team_logo"],
        }
        del player["team_name"]
        del player["team_location"]
        del player["team_city"]
        del player["team_logo"]

        if player["season_pass_attempts"] > 0:
            passing_stats.append(player)
        if player["season_rush_attempts"] > 0:
            rushing_stats.append(player)
        if (
            player["season_receiving_targets"] > 0
            or player["season_receiving_receptions"] > 0
        ):
            receiving_stats.append(player)
        if (
            player["season_defense_tackles"] > 0
            or player["season_defense_deflections"] > 0
        ):
            defense_stats.append(player)
        if (
            player["season_kick_fg_attempts"] > 0
            or player["season_kick_xp_attempts"] > 0
        ):
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
        "punt_returning": punt_returning_stats,
    }

    return stats_dict


def query_season_stat_leaders(season_id):
    db = get_db()

    pass_yards_query = "SELECT first_name, last_name, position, SUM(match_pass_yards) as season_pass_yards FROM player_stats WHERE season_id = %s GROUP BY first_name, last_name, position ORDER BY season_pass_yards DESC LIMIT 5"
    pass_tds_query = "SELECT first_name, last_name, position, SUM(match_pass_tds) as season_pass_tds FROM player_stats WHERE season_id = %s GROUP BY first_name, last_name, position ORDER BY season_pass_tds DESC LIMIT 5"
    rush_yards_query = "SELECT first_name, last_name, position, SUM(match_rush_yards) as season_rush_yards FROM player_stats WHERE season_id = %s GROUP BY first_name, last_name, position ORDER BY season_rush_yards DESC LIMIT 5"
    receiving_yards_query = "SELECT first_name, last_name, position, SUM(match_receiving_yards) as season_receiving_yards FROM player_stats WHERE season_id = %s GROUP BY first_name, last_name, position ORDER BY season_receiving_yards DESC LIMIT 5"
    total_touchdowns_query = "SELECT first_name, last_name, position, (SUM(match_receiving_tds) + SUM(match_rush_tds)) as season_total_touchdowns_yards FROM player_stats WHERE season_id = %s GROUP BY first_name, last_name, position ORDER BY season_total_touchdowns_yards DESC LIMIT 5"
    defense_sacks_query = "SELECT first_name, last_name, position, SUM(match_defense_sacks) as season_defense_sacks FROM player_stats WHERE season_id = %s GROUP BY first_name, last_name, position ORDER BY season_defense_sacks DESC LIMIT 5"

    db.execute(pass_yards_query, season_id)
    pass_yards = db.fetchall()

    db.execute(pass_tds_query, season_id)
    pass_tds = db.fetchall()

    db.execute(rush_yards_query, season_id)
    rush_yards = db.fetchall()

    db.execute(receiving_yards_query, season_id)
    receiving_yards = db.fetchall()

    db.execute(total_touchdowns_query, season_id)
    total_touchdowns = db.fetchall()

    db.execute(defense_sacks_query, season_id)
    defense_sacks = db.fetchall()

    season_stat_leaders = {
        "pass_yards": pass_yards,
        "pass_tds": pass_tds,
        "rush_yards": rush_yards,
        "receiving_yards": receiving_yards,
        "total_touchdowns": total_touchdowns,
        "defense_sacks": defense_sacks,
    }

    return season_stat_leaders

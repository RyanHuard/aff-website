from ..db import get_db, close_db


def get_team_details_by_player(player_details):
    db = get_db()

    query = """
        SELECT teams.*
        FROM teams
        JOIN player_stats ON player_stats.team_city = teams.abbreviation
        WHERE player_stats.first_name = %s AND player_stats.last_name = %s AND player_stats.season_id = %s
    """

    db.execute(
        query,
        (player_details["fname"], player_details["lname"], player_details["season_id"]),
    )

    team_details = db.fetchone()
    close_db()

    return team_details

from ..db import get_db, close_db


def get_team_details_by_player(team_id):
    db = get_db()

    query = """
        SELECT * FROM teams WHERE team_id = %s
    """

    db.execute(
        query,
        (team_id),
    )

    team_details = db.fetchone()
    close_db()

    return team_details

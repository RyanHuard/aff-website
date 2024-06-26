from flask import Blueprint, request

from api.db import get_db, close_db

teams_bp = Blueprint("teams", __name__, url_prefix="/api/teams")


@teams_bp.route("")
def list_teams():
    db = get_db()

    team_id = request.args.get("team-id")

    params = []
    query = "SELECT * FROM teams"
    if team_id is not None:
        query += " JOIN team_standings ON team_standings.team_id = teams.team_id WHERE teams.team_id = %s ORDER BY team_standings.season_id DESC LIMIT 1"
        params.append(team_id)
    else:
        query += " ORDER BY team_location ASC"

    db.execute(query, params)

    teams = db.fetchall()
    close_db()

    return teams

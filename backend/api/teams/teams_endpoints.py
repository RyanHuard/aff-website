from flask import Blueprint, request

from api.db import get_db, close_db

teams_bp = Blueprint("teams", __name__, url_prefix="/api/teams")


@teams_bp.route("")
def list_teams():
    db = get_db()

    team_id = request.args.get("team-id")
    order_by = request.args.get("order-by")

    params = []
    query = "SELECT * FROM teams"
    if team_id is not None:
        query += " JOIN team_standings ON team_standings.team_id = teams.team_id WHERE teams.team_id = %s ORDER BY team_standings.season_id DESC LIMIT 1"
        params.append(team_id)
    elif order_by is not None:
        query += " ORDER BY teams.team_id ASC"
        params.append(order_by)
    else:
        query += " ORDER BY team_location ASC"

    db.execute(query, params)

    teams = db.fetchall()
    close_db()

    return teams


@teams_bp.route("/rosters")
def get_roster():
    db = get_db()

    season_id = request.args.get("season-id")
    team_id = request.args.get("team-id")

    query = "SELECT * FROM rosters WHERE fname <> 'BACKUP'"
    params = []

    if season_id is not None:
        query += " AND season_id = %s"
        params.extend(season_id)
        if team_id is not None:
            query += " AND tid = %s"
            params.append(team_id)

    query += """ ORDER BY
    CASE
        WHEN position = 'QB' THEN 1
        WHEN position = 'HB' THEN 2
        WHEN position = 'FB' THEN 3
        WHEN position = 'TE' THEN 4
        WHEN position = 'WR' THEN 5
        WHEN position = 'LT' THEN 6
        WHEN position = 'LG' THEN 7
        WHEN position = 'C' THEN 8
        WHEN position = 'RT' THEN 9
        WHEN position = 'RG' THEN 10
        WHEN position = 'RDE' THEN 11
        WHEN position = 'RDT' THEN 12
        WHEN position = 'LDT' THEN 13
        WHEN position = 'LDE' THEN 14
        WHEN position = 'ILB' THEN 15
        WHEN position = 'OLB' THEN 16
        WHEN position = 'CB' THEN 17
        WHEN position = 'FS' THEN 18
        WHEN position = 'SS' THEN 19
        WHEN position = 'K' THEN 20
        WHEN position = 'P' THEN 21
        ELSE 22 END, depth ASC"""

    db.execute(query, params)

    rosters = db.fetchall()
    close_db()

    return rosters


@teams_bp.route("/draft-picks")
def get_draft_picks():
    db = get_db()

    season_id = request.args.get("season-id")
    team_id = request.args.get("team-id")

    query = "SELECT * FROM draft_picks"
    params = []

    if season_id is not None:
        query += " WHERE season_id = %s"
        params.extend(season_id)
        if team_id is not None:
            query += " AND team_id = %s"
            params.append(team_id)

    query += " ORDER BY pick_num ASC"
    db.execute(query, params)

    draft_picks = db.fetchall()
    close_db()

    return draft_picks

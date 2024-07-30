from flask import Blueprint

from ..db import get_db, close_db

standings_bp = Blueprint("standings", __name__, url_prefix="/api/standings")


@standings_bp.route("/<season_id>")
def get_standings(season_id):
    db = get_db()

    db.execute(
        """SELECT team_standings.*, teams.team_logo
FROM team_standings
JOIN teams ON team_standings.team_id = teams.team_id
WHERE season_id = %s
ORDER BY team_standings.season_id, team_standings.wins DESC, (team_standings.points_for - team_standings.points_against) DESC""",
        season_id,
    )

    standings = db.fetchall()
    close_db()

    return standings

import os

from flask import Flask


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        DATABASE=os.environ.get("DATABASE_URL")
    )

    from .teams.teams_endpoints import teams_bp
    from .stats.stats_endpoints import stats_bp
    from .games.games_endpoints import games_bp
    app.register_blueprint(teams_bp)
    app.register_blueprint(stats_bp)
    app.register_blueprint(games_bp)

    from api.db import get_db

    @app.route("/hello")
    def test():
        db = get_db()

        db.execute("SELECT * FROM teams")
        return db.fetchall()
        
    return app
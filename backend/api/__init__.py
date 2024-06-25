import os

from flask import Flask
from flask_cors import CORS, cross_origin


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(DATABASE=os.environ.get("DATABASE_URL"))

    CORS(app, resources={r"/*": {"origins": "*"}})

    from .teams.teams_endpoints import teams_bp
    from .stats.stats_endpoints import stats_bp
    from .games.games_endpoints import games_bp
    from .home.home_endpoints import home_bp
    from .standings.standings_endpoints import standings_bp
    from .players.player_endpoints import player_bp

    app.register_blueprint(teams_bp)
    app.register_blueprint(stats_bp)
    app.register_blueprint(games_bp)
    app.register_blueprint(home_bp)
    app.register_blueprint(standings_bp)
    app.register_blueprint(player_bp)

    return app

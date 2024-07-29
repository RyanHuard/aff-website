import os

from flask import Flask
from flask_cors import CORS, cross_origin
import firebase_admin
from firebase_admin import credentials


def create_app(test_config=None):
    os.environ["GRPC_VERBOSITY"] = "ERROR"
    os.environ["GLOG_minloglevel"] = "2"

    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(DATABASE=os.environ.get("DATABASE_URL"))

    CORS(app, resources={r"/*": {"origins": "*"}})

    cred = credentials.Certificate(os.environ.get("FIREBASE-ADMIN"))
    firebase_admin.initialize_app(cred)

    from .teams.teams_endpoints import teams_bp
    from .stats.stats_endpoints import stats_bp
    from .games.games_endpoints import games_bp
    from .home.home_endpoints import home_bp
    from .standings.standings_endpoints import standings_bp
    from .players.player_endpoints import player_bp
    from .trade.trade_endpoints import trade_bp

    app.register_blueprint(teams_bp)
    app.register_blueprint(stats_bp)
    app.register_blueprint(games_bp)
    app.register_blueprint(home_bp)
    app.register_blueprint(standings_bp)
    app.register_blueprint(player_bp)
    app.register_blueprint(trade_bp)

    app.config["MAIL_SERVER"] = "smtp.gmail.com"
    app.config["MAIL_PORT"] = 587
    app.config["MAIL_USERNAME"] = "affederationheadquarters@gmail.com"
    app.config["MAIL_PASSWORD"] = os.environ.get("EMAIL_PASSWORD")
    app.config["MAIL_USE_TLS"] = True
    app.config["MAIL_USE_SSL"] = False

    return app


app = create_app()

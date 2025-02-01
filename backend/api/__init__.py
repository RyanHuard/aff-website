import os
import json
from flask import Flask, send_from_directory
from flask_cors import CORS, cross_origin
import firebase_admin
from firebase_admin import credentials
from flask_socketio import SocketIO

socketio = SocketIO(cors_allowed_origins="*")

def create_app(test_config=None):
    os.environ["GRPC_VERBOSITY"] = "ERROR"
    os.environ["GLOG_minloglevel"] = "2"

    base_path = os.path.abspath(
        os.path.dirname(__file__)
    )  # Get the absolute path of the directory containing the script
    static_folder_path = os.path.join(base_path, "../../frontend/dist")
    static_folder_path = os.path.abspath(static_folder_path)

    app = Flask(
        __name__,
        static_folder=static_folder_path,
        static_url_path="",
        instance_relative_config=True,
    )
    app.config.from_mapping(DATABASE=os.environ.get("DATABASE_URL"))

    CORS(app, resources={r"/api/*": {"origins": "*"}})
    socketio.init_app(app)

    if not firebase_admin._apps:
        cred = credentials.Certificate(json.loads(os.environ.get("FIREBASE_ADMIN")))
        firebase_admin.initialize_app(cred)

    from .teams.teams_endpoints import teams_bp
    from .stats.stats_endpoints import stats_bp
    from .games.games_endpoints import games_bp
    from .home.home_endpoints import home_bp
    from .standings.standings_endpoints import standings_bp
    from .players.player_endpoints import player_bp
    from .trade.trade_endpoints import trade_bp
    from .records.records_endpoints import records_bp

    from .free_agency.free_agency_endpoints import free_agency_bp

    app.register_blueprint(teams_bp)
    app.register_blueprint(stats_bp)
    app.register_blueprint(games_bp)
    app.register_blueprint(home_bp)
    app.register_blueprint(standings_bp)
    app.register_blueprint(player_bp)
    app.register_blueprint(trade_bp)
    app.register_blueprint(records_bp)
    app.register_blueprint(free_agency_bp)

    app.config["MAIL_SERVER"] = "smtp.gmail.com"
    app.config["MAIL_PORT"] = 587
    app.config["MAIL_USERNAME"] = "affederationheadquarters@gmail.com"
    app.config["MAIL_PASSWORD"] = os.environ.get("EMAIL_PASSWORD")
    app.config["MAIL_USE_TLS"] = True
    app.config["MAIL_USE_SSL"] = False

    @app.route("/")
    def index():
        return send_from_directory(app.static_folder, "index.html")

    @app.errorhandler(404)
    def error(e):
        return send_from_directory(app.static_folder, "index.html")

    @app.after_request
    def after_request(response):
       
        response.headers.add(
            "Access-Control-Allow-Headers", "Content-Type,Authorization"
        )
        response.headers.add(
            "Access-Control-Allow-Methods", "GET,PUT,POST,PATCH,DELETE,OPTIONS"
        )
        return response
    
    

    return app


app = create_app()

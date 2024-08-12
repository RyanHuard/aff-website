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

    # CORS(app, resources={r"/*": {"origins": "*"}})

    if not firebase_admin._apps:
        #cred = credentials.Certificate(json.loads(os.environ.get("FIREBASE_ADMIN")))
        cred = credentials.Certificate(json.loads("{\"type\":\"service_account\",\"project_id\":\"aff-website-890ce\",\"private_key_id\":\"8dc0a38e4e0f4f0b88f9c85ee3fef55dc229e37b\",\"private_key\":\"-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCcyZ5qOf10/r1A\\n7YFVG/C+85WZbHhSOjzPp6+Yj/ukO3prs97kwRNqKp1sAJ6wA+tMqaaTrKR83pOx\\n38pAb6u5cONOUS9zD30GIWgvM8EKiQZ0oHjTezJUzcoxtYe8plvyH94AJQp2iXKr\\n6JQ2zRGuyHb/T2KfTc0BnvN9yKvScfbmf1ZcXCYj/vvD36M5Z7JsIzNHgJw6u5v+\\nVG4nRyu5p8NPnBfDMiNBkRWQG+UTJL8hzl/lQdw0DMFp+RsEcQS8aZfWrZBmqXN6\\nlDUx1yym9Z7CzbE6NAAqimC/uLZkxHmxFd0R6PMGDH0zdPdbbfTdxt6XapSmyy3D\\ne/l/YwbDAgMBAAECggEATT1OW4qiAKcWWQwocONI4OljQ6gaRngGSU6UxRX5pFjg\\n4HpGTm+Hvv+ree98Pb5Qhv304D9m8VU9cZ2MJ95bvQmOEaERPR/eOczvZIGckjIb\\nCg2cOKMyknCnMYH6ksdp+IgWd//HfcoMwf/cNHsmQPLlHLXhIhXT7v59efQIIa3Z\\nc5awKCigDzTQmZeRyq9HpWkd7d3EN5DybxmbQxF6DdtrNU4H/U9qUnXmM8Ujb9DG\\ntM1syl1X0ZmUXR2YIe51HC3p3/OimAG7lbQcnbUS7yqK+1jolpZDJmLpLDoECJjN\\n0AbtoQb92BZ2yagIxgrY5CX9NYdrtvnEt5EEr0EmAQKBgQDUni00QDbkPQ0rfXcZ\\nCPEr7zSmohs9Dj2KAeYv2Z9BRXaph0PSIT+0R77hy3UKH01uTD/dI0CNkZAHhUaC\\n7a1SdhsjcoAU8c7k9V4Mdw0VxfKnBR7zOMVquvbVBSKPRFhRrgUmj/U1N/SnY3jS\\nmU5GgXYhMlXDVqO1jmfkciv7QwKBgQC8xzezFFpZY7nySax/UwqXYzAUu+Kq0rGY\\nAP9cCEEZCO4/6n5ikDTRsc6UzrodDtyj1vePJRIVcTx3/ypYiGJdrny2eUn1mYP1\\nPSNdUS0CFjxv2jJVqYXZktxKitf+il1rtE6odSI7H9cMGCY+bqYarjdjNnP5JVtY\\nKb3sGnlOgQKBgG03p57ckZXiqp45f/FTP5fC87fZM8bERuZanWTdFEqSJSdmfXc2\\nbyPraulP+xotBDhxYKj2z9Uo/eRvGM5uywa99qjZy2N250GDrUEX8pfJrCERp1ln\\nQznVOrAoSB1yDTBABRNPBbXFvZ4yocEE0Um0fPsGgTmrisLbmRCneWJDAoGARlUu\\n0mCV3NID+Fosk2979bU1t7PcmmpPUmOkwEQvBMXIBjY2ikBR/YJyhgyTWLotyDkS\\nGNnl5+k9bzO5Miz2ARM+UbnUrVVZzafOojjZPPrN35p6wGGdhddqjbc3DBW/Ap61\\n45toeoC9XTsuHHqbFjusVSF3ie66HpnGsc2XPoECgYAq261r+knj6tZ89JFpnE12\\nKK4dpq9zd8rd6yAKYMbkrhlJ+id5/f8xh7+4EI075aoUZkT3oc/qY6nvCsixbVOq\\n/72Y0TAz08pl0iEJzwz6vOu6xWYkrys+NucJvdRv1t6g9zqOuqULOEb4E8BnW3Qz\\nfYHctU2kQMgze4HjZRfsNA==\\n-----END PRIVATE KEY-----\\n\",\"client_email\":\"firebase-adminsdk-2lptm@aff-website-890ce.iam.gserviceaccount.com\",\"client_id\":\"115922267431567396242\",\"auth_uri\":\"https://accounts.google.com/o/oauth2/auth\",\"token_uri\":\"https://oauth2.googleapis.com/token\",\"auth_provider_x509_cert_url\":\"https://www.googleapis.com/oauth2/v1/certs\",\"client_x509_cert_url\":\"https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2lptm%40aff-website-890ce.iam.gserviceaccount.com\",\"universe_domain\":\"googleapis.com\"}"
))
     
        firebase_admin.initialize_app(cred)
    from .teams.teams_endpoints import teams_bp
    from .stats.stats_endpoints import stats_bp
    from .games.games_endpoints import games_bp
    from .home.home_endpoints import home_bp
    from .standings.standings_endpoints import standings_bp
    from .players.player_endpoints import player_bp
    from .trade.trade_endpoints import trade_bp
    from .free_agency.free_agency_endpoints import free_agency_bp

    app.register_blueprint(teams_bp)
    app.register_blueprint(stats_bp)
    app.register_blueprint(games_bp)
    app.register_blueprint(home_bp)
    app.register_blueprint(standings_bp)
    app.register_blueprint(player_bp)
    app.register_blueprint(trade_bp)
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
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add(
            "Access-Control-Allow-Headers", "Content-Type,Authorization"
        )
        response.headers.add(
            "Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS"
        )
        return response
    
    socketio.init_app(app)

    return app


app = create_app()

if __name__ == "__main__":
    socketio.run(app)
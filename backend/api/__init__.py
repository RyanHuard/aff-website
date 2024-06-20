import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy


def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_mapping(
        DATABASE=os.environ.get("DATABASE_URL")
    )

    from api.db import get_db

    @app.route("/hello")
    def test():
        db = get_db()

        db.execute("SELECT * FROM teams")
        return db.fetchall()
    
    @app.route("/hello")
    def test():
        db = get_db()

        db.execute("SELECT * FROM teams")
        return db.fetchall()

    @app.route("/hello")
        def test():
            db = get_db()

            db.execute("SELECT * FROM teams")
            return db.fetchall()

    @app.route("/hello")
        def test():
            db = get_db()

            db.execute("SELECT * FROM teams")
            return db.fetchall()

    @app.route("/hello")
        def test():
            db = get_db()

            db.execute("SELECT * FROM teams")
            return db.fetchall()


    @app.route("/hello")
        def test():
            db = get_db()

            db.execute("SELECT * FROM teams")
            return db.fetchall()

    @app.route("/hello")
        def test():
            db = get_db()

            db.execute("SELECT * FROM teams")
            return db.fetchall()

    @app.route("/hello")
        def test():
            db = get_db()

            db.execute("SELECT * FROM teams")
            return db.fetchall()





    
    return app
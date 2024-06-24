import os
import psycopg2
import click

from flask import current_app, g
from psycopg2 import extras


def get_db():
    if "db" not in g:
        g.db = psycopg2.connect(os.environ.get("DATABASE_URL"), cursor_factory=extras.RealDictCursor)
 
    return g.db.cursor()


def close_db(e=None):
    db = g.pop("db", None)

    if db is not None:
        db.close()
        

def init_app(app):
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)



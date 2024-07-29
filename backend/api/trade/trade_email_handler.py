from flask_mail import Mail, Message
from flask import current_app

from ..db import get_db, close_db, commit_db

mail = Mail()


def send_trade_offer_created_email(trade_offer):
    mail.init_app(current_app)

    db = get_db()

    sending_team_id = trade_offer.get("sending_team_id")
    receiving_team_id = trade_offer.get("receiving_team_id")
    trade_details = trade_offer.get("trade_details")

    db.execute("SELECT * FROM teams WHERE team_id = %s", (sending_team_id,))
    sending_team = db.fetchone()

    db.execute("SELECT * FROM teams WHERE team_id = %s", (receiving_team_id,))
    receiving_team = db.fetchone()

    msg = Message(
        subject="A Trade in the American Football Federation Has Been Accepted",
        sender="affederationheadquarters@gmail.com",
        recipients=[
            sending_team.get("manager_email"),
            sending_team.get("manager_email"),
        ],
    )
    print(trade_details)
    msg.body = """
    Dear %s,

    The %s have sent a trade proposal your way.

    Here are the details of the propsed trade:

    """
    mail.send(msg)
    close_db()

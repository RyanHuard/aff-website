from flask_mail import Mail, Message
from flask import current_app

from ..db import get_db, close_db, commit_db

mail = Mail()


def format_trade_details(trade_details, sending_team_name, receiving_team_name):
    sending_team = ""
    receiving_team = ""

    db = get_db()

    for detail in trade_details:
        if detail["item_type"] == "player":
            db.execute(
                "SELECT position FROM rosters WHERE lname = %s AND season_id = 8",
                (detail["player_last_name"],),
            )
            pos = db.fetchone()["position"]
            player_info = (
                f"{pos} {detail['player_first_name']} {detail['player_last_name']}"
            )
        elif detail["item_type"] == "draft_pick":
            print(detail)
            db.execute(
                "SELECT * FROM draft_picks WHERE draft_pick_id = %s",
                (detail["draft_pick_id"],),
            )
            dp = db.fetchone()
            season = dp["season_id"]
            round_num = dp["round_num"]
            pick_num = dp["pick_num"]
            player_info = f"{season + 2021} Round {round_num}"
            if pick_num:
                player_info += f" Pick {pick_num}"

        if detail["direction"] == "to_sending_team":
            sending_team += "        - " + player_info + "\n"
        elif detail["direction"] == "to_receiving_team":
            receiving_team += "        - " + player_info + "\n"

    formatted_trade = f"""{receiving_team_name} receive:
{receiving_team}

{sending_team_name} receive:
{sending_team}
    """
    close_db()
    return formatted_trade


def send_trade_offer_created_email(trade_offer):
    mail.init_app(current_app)

    trade_info = get_trade_details(trade_offer["trade_id"])

    msg = Message(
        subject=f"The {trade_info['sending_team']} Have Offered You a Trade",
        sender="affederationheadquarters@gmail.com",
        recipients=[
            trade_info["sending_team_email"],
            trade_info["receiving_team_email"],
        ],
    )

    formatted_trade_details = format_trade_details(
        trade_info["trade_details"],
        trade_info["sending_team"],
        trade_info["receiving_team"],
    )

    msg.body = f"""Dear {trade_info['receiving_team']},

The {trade_info["sending_team"]} have sent a trade proposal your way.

Here are the details of the propsed trade:

{formatted_trade_details}
"""
    mail.send(msg)
    close_db()


def send_trade_offer_rejected_email(trade_id):
    mail.init_app(current_app)

    trade_info = get_trade_details(trade_id)

    msg = Message(
        subject=f"The {trade_info['receiving_team']} Have Declined Your Trade Offer",
        sender="affederationheadquarters@gmail.com",
        recipients=[
            trade_info["sending_team_email"],
            trade_info["receiving_team_email"],
        ],
    )

    msg.body = f"""Dear {trade_info["sending_team"]},

The {trade_info["receiving_team"]} have declined your trade offer."""

    mail.send(msg)
    close_db()

    return "Message sent"


def send_trade_offer_accepted_email(trade_id):
    mail.init_app(current_app)

    trade_info = get_trade_details(trade_id)

    msg = Message(
        subject=f"A Trade in the American Football Federation Has Been Accepted",
        sender="affederationheadquarters@gmail.com",
        recipients=[
            "graydon@cowgills.net",
            "cgarrett2209@gmail.com",
            "jhdunavant@gmail.com",
            "ryanjhuard@gmail.com",
            "griff3man@gmail.com",
            "twjames22@gmail.com",
            "andrewryanbrady@gmail.com",
            "ajmunie14@gmail.com",
            "jebtwells@gmail.com",
            "jhbaird003@gmail.com",
        ],
    )

    formatted_trade_details = format_trade_details(
        trade_info["trade_details"],
        trade_info["sending_team"],
        trade_info["receiving_team"],
    )

    msg.body = f"""The following trade has been accepted.

Here are the details of the trade:

{formatted_trade_details}
"""
    mail.send(msg)
    close_db()
    return "Message sent"


def get_trade_details(trade_id):
    db = get_db()

    db.execute("SELECT * FROM trade_offers WHERE trade_id = %s", (trade_id,))
    trade = db.fetchone()

    sending_team_id = trade["sending_team_id"]
    receiving_team_id = trade["receiving_team_id"]

    db.execute("SELECT * FROM teams WHERE team_id = %s", (sending_team_id,))
    sending_team = db.fetchone()

    db.execute("SELECT * FROM teams WHERE team_id = %s", (receiving_team_id,))
    receiving_team = db.fetchone()

    receiving_team_name = (
        receiving_team.get("team_location") + " " + receiving_team.get("team_name")
    )
    sending_team_name = (
        sending_team.get("team_location") + " " + sending_team.get("team_name")
    )

    db.execute("SELECT * FROM trade_offer_details WHERE trade_id = %s", (trade_id,))
    trade_details = db.fetchall()

    close_db()

    return {
        "sending_team": sending_team_name,
        "receiving_team": receiving_team_name,
        "trade_details": trade_details,
        "sending_team_email": sending_team["manager_email"],
        "receiving_team_email": receiving_team["manager_email"],
    }

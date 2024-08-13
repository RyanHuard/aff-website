import psycopg2
from datetime import datetime, timezone

from ..db import get_db, close_db, commit_db, rollback_db
from .trade_email_handler import (
    send_trade_offer_created_email,
    send_trade_offer_rejected_email,
    send_trade_offer_accepted_email,
)


def handle_trade_offer_create_offer(data):
    db = get_db()

    sending_team_id = data.get("sending_team_id")
    receiving_team_id = data.get("receiving_team_id")
    season_id = data.get("season_id")

    trade_details = data.get("trade_details")

    try:
        db.execute(
            """
            INSERT INTO trade_offers (sending_team_id, receiving_team_id, season_id)
            VALUES (%s, %s, %s) RETURNING trade_id""",
            (sending_team_id, receiving_team_id, season_id),
        )

        trade_id = db.fetchone().get("trade_id")
        data.update({"trade_id": trade_id})

        handle_trade_offer_create_details(trade_id, trade_details)

        commit_db()
        send_trade_offer_created_email(data)
        return data

    except psycopg2.Error as e:
        rollback_db()
        raise e

    finally:
        close_db()


def handle_trade_offer_create_details(trade_id, trade_details):
    db = get_db()

    for detail in trade_details:
        item_type = detail.get("item_type")
        direction = detail.get("direction")

        if item_type == "player":
            player_first_name = detail.get("fname")
            player_last_name = detail.get("lname")

            db.execute(
                """INSERT INTO trade_offer_details 
                       (trade_id, item_type, player_first_name, player_last_name, direction)
                       VALUES (%s, %s, %s, %s, %s)
                       """,
                (
                    trade_id,
                    item_type,
                    player_first_name,
                    player_last_name,
                    direction,
                ),
            )

        elif item_type == "draft_pick":
            draft_pick_id = detail.get("draft_pick_id")

            db.execute(
                """INSERT INTO trade_offer_details 
                       (trade_id, item_type, draft_pick_id, direction)
                       VALUES (%s, %s, %s, %s)
                       """,
                (
                    trade_id,
                    item_type,
                    draft_pick_id,
                    direction,
                ),
            )


def handle_trade_offer_response(data):
    db = get_db()

    response = data.get("response")
    trade_id = data.get("trade_id")

    if response == "accepted":
        handle_trade_offer_accepted(trade_id)
        commit_db()
        close_db()
        return data

    elif response == "rejected":
        handle_trade_offer_rejected(trade_id)
        commit_db()
        close_db()
        return data

    elif response == "canceled":
        db.execute("DELETE FROM trade_offer_details WHERE trade_id = %s", (trade_id,))
        db.execute("DELETE FROM trade_offers WHERE trade_id = %s", (trade_id,))
        commit_db()
        close_db()
        return data


def handle_trade_offer_rejected(trade_id):
    db = get_db()
    timestamp = datetime.now(timezone.utc)
    db.execute(
        "UPDATE trade_offers SET status = 'rejected', date_responded = %s WHERE trade_id = %s RETURNING *",
        (
            timestamp,
            trade_id,
        ),
    )
    commit_db()
    trade = db.fetchone()
    send_trade_offer_rejected_email(trade_id)
    close_db()


def handle_trade_offer_accepted(trade_id):
    db = get_db()
    timestamp = datetime.now(timezone.utc)

    db.execute(
        "UPDATE trade_offers SET status = 'accepted', date_responded = %s WHERE trade_id = %s RETURNING *",
        (
            timestamp,
            trade_id,
        ),
    )

    trade = db.fetchone()

    sending_team_id = trade.get("sending_team_id")
    receiving_team_id = trade.get("receiving_team_id")
    season_id = trade.get("season_id")

    db.execute("SELECT * FROM trade_offer_details WHERE trade_id = %s", (trade_id,))
    trade_details = db.fetchall()

    send_trade_offer_accepted_email(trade_id)

    for detail in trade_details:
        item_type = detail.get("item_type")
        direction = detail.get("direction")

        new_team_id = (
            sending_team_id if direction == "to_sending_team" else receiving_team_id
        )

        if item_type == "player":
            player_first_name = detail.get("player_first_name")
            player_last_name = detail.get("player_last_name")

            db.execute(
                "UPDATE rosters SET tid = %s WHERE fname ILIKE %s AND lname ILIKE %s AND season_id = %s",
                (
                    new_team_id,
                    player_first_name,
                    player_last_name,
                    season_id,
                ),
            )

        elif item_type == "draft_pick":
            draft_pick_id = detail.get("draft_pick_id")

            db.execute(
                "UPDATE draft_picks SET team_id = %s WHERE draft_pick_id = %s AND season_id = %s",
                (
                    new_team_id,
                    draft_pick_id,
                    season_id,
                ),
            )

    commit_db()
    close_db()

    return None

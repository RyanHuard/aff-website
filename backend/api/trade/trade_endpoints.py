from flask import Blueprint, request, jsonify
from marshmallow import ValidationError
import psycopg2

from ..db import get_db, close_db, commit_db
from .trade_handler import handle_trade_offer_create_offer, handle_trade_offer_response
from .models import TradeSchema

trade_bp = Blueprint("trades", __name__, url_prefix="/api/trades")


@trade_bp.route("", methods=["GET"])
def get_trade_offers():
    status = request.args.get("status")
    team_id = request.args.get("team-id")
    season_id = request.args.get("season-id")
    limit = request.args.get("limit")  # for recent trades

    db = get_db()

    params = [status]

    query = """SELECT 
    trade_offers.*,
    json_agg(
        json_build_object(
            'item_type', details.item_type,
            'player_first_name', details.player_first_name,
            'player_last_name', details.player_last_name,
            'draft_pick_id', details.draft_pick_id,
            'draft_pick_details', CASE 
                WHEN details.draft_pick_id IS NOT NULL THEN json_build_object(
                    'pick_num', draft_picks.pick_num,
                    'round_num', draft_picks.round_num,
                    'season_id', draft_picks.season_id
                )
                ELSE NULL
            END,
            'direction', details.direction
        ) ORDER BY details.item_type DESC
    ) AS details,
    sending_team.team_logo AS sending_team_logo,
    sending_team.team_location AS sending_team_location,
    sending_team.team_name AS sending_team_name,
    sending_team.abbreviation as sending_team_abbreviation,
    receiving_team.team_logo AS receiving_team_logo,
    receiving_team.team_location AS receiving_team_location,
    receiving_team.team_name AS receiving_team_name,
    receiving_team.abbreviation as receiving_team_abbreviation
    FROM 
        trade_offers 
    JOIN 
        (
            SELECT 
                trade_offer_details.*
            FROM 
                trade_offer_details
            ORDER BY 
                trade_offer_details.item_type
        ) AS details
    ON 
        details.trade_id = trade_offers.trade_id
    LEFT JOIN 
        draft_picks
    ON 
        details.draft_pick_id = draft_picks.draft_pick_id
    JOIN 
        teams AS sending_team
    ON 
        sending_team.team_id = trade_offers.sending_team_id
    JOIN 
        teams AS receiving_team
    ON 
        receiving_team.team_id = trade_offers.receiving_team_id
    WHERE 
        trade_offers.status = %s
   """
    if team_id:
        query += " AND (sending_team_id = %s OR receiving_team_id = %s)"
        params.extend([team_id, team_id])

    if season_id:
        query += " AND trade_offers.season_id = %s"
        params.extend([season_id])

    query += " GROUP BY trade_offers.trade_id, sending_team.team_logo, sending_team.team_name, receiving_team.team_logo, receiving_team.team_name, sending_team.abbreviation, receiving_team.abbreviation, sending_team_location, receiving_team_location ORDER BY trade_offers.trade_id DESC"

    if limit:
        query += " LIMIT 5"

    db.execute(query, params)

    return db.fetchall()


@trade_bp.route("", methods=["POST"])
def create_trade_offer():
    if request.method == "POST":
        data = request.json

        # Validates JSON
        try:
            trade_schema = TradeSchema()
            validated_data = trade_schema.load(data)
        except ValidationError as e:
            return jsonify(data=data, message=e.messages), 500

        try:
            trade_offer = handle_trade_offer_create_offer(validated_data)

            return (
                jsonify(data=trade_offer, message="Trade offer created successfully."),
                201,
            )

        except psycopg2.Error as e:
            return jsonify(error=str(e)), 500


@trade_bp.route("/respond", methods=["PATCH"])
def respond_to_trade_offer():
    if request.method == "PATCH":
        data = request.json

        # Either "accepted" or "rejected"
        response = data.get("response")

        if response not in ["accepted", "rejected"]:
            return (
                jsonify(error="Invalid response. Expected 'accepted' or 'rejected'."),
                400,
            )

        try:
            trade_offer_response = handle_trade_offer_response(data)
            if response == "accepted":
                return (
                    jsonify(data=trade_offer_response, message="Trade offer accepted."),
                    200,
                )
            elif response == "rejected":
                return (
                    jsonify(data=trade_offer_response, message="Trade offer rejected."),
                    200,
                )

        except psycopg2.Error as e:
            return jsonify(error=str(e)), 500

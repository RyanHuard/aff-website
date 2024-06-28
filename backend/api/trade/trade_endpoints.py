from flask import Blueprint, request, jsonify
from marshmallow import ValidationError
import psycopg2

from ..db import get_db, close_db, commit_db
from .trade_handler import handle_trade_offer_create_offer, handle_trade_offer_response
from .models import TradeSchema

trade_bp = Blueprint("trades", __name__, url_prefix="/api/trades")


@trade_bp.route("/create", methods=["POST"])
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
                jsonify(error="Invalid response. Expected 'accepted' or 'rejected'"),
                400,
            )

        try:
            trade_offer_response = handle_trade_offer_response(data)
            if response == "accepted":
                return (
                    jsonify(data=trade_offer_response, message="Trade offer accepted"),
                    200,
                )
            elif response == "rejected":
                return (
                    jsonify(data=trade_offer_response, message="Trade offer rejected"),
                    200,
                )

        except psycopg2.Error as e:
            return jsonify(error=str(e)), 500

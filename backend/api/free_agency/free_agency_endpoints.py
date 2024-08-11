from flask import Blueprint, request, jsonify
from api.db import get_db, close_db

free_agency_bp = Blueprint("free-agency", __name__, url_prefix="/api/free-agency")

offers = []
top_offers = []
final_offer_checks = {}
current_player_index = 0
current_player = None
free_agent_list = []
start = False

cap_remaining = {
    "0": {2028: 16, 2029: 23, 2030: 64},
    "1": {2028: 21, 2029: 33, 2030: 63},
    "2": {2028: 12, 2029: 20, 2030: 58},
    "3": {2028: 19, 2029: 31, 2030: 65},
    "4": {2028: 13, 2029: 25, 2030: 76},
    "5": {2028: 27, 2029: 32, 2030: 75},
    "6": {2028: 15, 2029: 26, 2030: 65},
    "7": {2028: 25, 2029: 33, 2030: 71},
    "8": {2028: 43, 2029: 42, 2030: 73},
    "9": {2028: 16, 2029: 22, 2030: 63},
}

@free_agency_bp.route("/")
def get_free_agents():
    db = get_db()

    query = "SELECT * FROM free_agency ORDER BY overall DESC, name"

    db.execute(query)
    free_agents = db.fetchall()

    close_db()

    global free_agent_list
    free_agent_list = free_agents
    global current_player
    current_player = free_agent_list[current_player_index]

    return jsonify(free_agents)
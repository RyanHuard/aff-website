from flask import Blueprint, request, jsonify
from flask_socketio import emit
import time
import random

from .. import socketio
from api.db import get_db, close_db, commit_db

free_agency_bp = Blueprint("free-agency", __name__, url_prefix="/api/free-agency")

offers = []
top_offers = []
final_offer_checks = {}
current_player_index = 0
current_player = None
free_agent_list = []
start = False

cap_remaining = {
    "0": {2029: 37, 2030: 68, 2031: 77},
    "1": {2029: 6, 2030: 38, 2031: 73},
    "2": {2029: 30, 2030: 58, 2031: 65},
    "3": {2029: 10, 2030: 44, 2031: 70},
    "4": {2029: 5, 2030: 52, 2031: 71},
    "5": {2029: 12, 2030: 57, 2031: 71},
    "6": {2029: 3, 2030: 45, 2031: 72},
    "7": {2029: 13, 2030: 62, 2031: 77},
    "8": {2029: 17, 2030: 59, 2031: 75},
    "9": {2029: 1, 2030: 43, 2031: 71},
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


@socketio.on("start")
def start_free_agency():
    global start
    start = True
    emit("start", start, broadcast=True)


@socketio.on("connect")
def handle_connect():
    emit("start", start, broadcast=True)
    emit("update_cap", cap_remaining, broadcast=True)
    emit("update_player", current_player_index, broadcast=True)
    emit("update_offers", offers, broadcast=True)
    

@socketio.on("disconnect")
def handle_disconnect():
    global final_offer_checks
    leaving_id = final_offer_checks[request.sid]["team_id"]
    del final_offer_checks[request.sid]

    result = []
    for k, v in final_offer_checks.items():
        if v["team_id"] == leaving_id:
            del final_offer_checks[k]
            pass
        result.append({'requestId': k, 'data': v})
    emit("final_offer_checks", result, broadcast=True)
   

@socketio.on("send_offer")
def handle_offer(client_offer):
    global offers
    print(client_offer)

    for i, offer in enumerate(offers):
        if client_offer["team"]["team_id"] == offer["team"]["team_id"]:
            offers.pop(i)
    
    offers.append(client_offer)
    emit("update_offers", offers, broadcast=True)


@socketio.on("final_offer_checked")
def handle_final_offer_checked(data):
    is_checked = data["is_checked"]
    team_id = data["team_id"]
    global final_offer_checks
    final_offer_checks[request.sid] = {"isChecked": is_checked, "team_id": team_id}    
    
    result = []
    all_final_offers = True
    for k, v in final_offer_checks.items():
        result.append({'requestId': k, 'data': v})
        if not v["isChecked"]:
            all_final_offers = False

    emit("final_offer_checks", result, broadcast=True)
   

    # All offers are in
    if all_final_offers:
       if_all_final_offers(False)
            
@socketio.on("manual")
def if_all_final_offers(force=True):
    global offers
    # 5 second countdown to make sure everyone is okay with their final offer
    temp_offers = offers
    emit("start_final_countdown", broadcast=True)
    time.sleep(5)


    if offers == temp_offers:
        result = []
        all_final_offers = True
        for k, v in final_offer_checks.items():
            result.append({'requestId': k, 'data': v})
            if not v["isChecked"]:
                all_final_offers = False

    if force:
        all_final_offers = True

    if all_final_offers and offers == temp_offers:
        winner = choose_winner()
        emit("winner", winner, broadcast=True)
        if winner["winner"] != None:
            set_current_player_new_team(winner["winner"])

        global current_player_index
        global current_player
        offers.clear()
        current_player_index += 1
        current_player = free_agent_list[current_player_index]

        emit("update_player", current_player_index, broadcast=True)
        emit("update_offers", offers, broadcast=True)

        result = []
        all_final_offers = True
        for k, v in final_offer_checks.items():
            final_offer_checks[k]["isChecked"] = False
            result.append({'requestId': k, 'data': v})
            if not v["isChecked"]:
                all_final_offers = False
            emit("final_offer_checks", result, broadcast=True)

        emit("update_cap", cap_remaining, broadcast=True)


def set_current_player_new_team(winner):
    db = get_db()
    team = winner["team"]
    team_name = team["team_name"]
    contract = winner["contract"]
    salary = contract.split("/")[0]
    years = contract.split("/")[1]

    team_id = str(team["team_id"])

    update_query = "UPDATE free_agency SET new_team = %s, contract_salary = %s, \
        contract_years = %s WHERE name = %s"
    db.execute(update_query, (team_name, salary, years, current_player["name"]),)

    global cap_remaining
    for year in range(int(years)):
        year = year + 2029
        if year > 2031:
            continue
        cap_remaining[team_id][year] -= int(salary)

    commit_db()
    close_db()
       

def choose_winner():
    sorted_offers = sorted(offers, key=lambda offer: offer['entries'], reverse=True)

    # Adds offers all offers that are tied for third place
    if len(sorted_offers) >= 3:
        min_offer_index = 2
    else:
        min_offer_index = len(sorted_offers)

    if len(sorted_offers) == 0:
        return {"winner": None, "player": current_player}
    
    third_offer_entries = sorted_offers[min_offer_index-1]['entries']
    top_offers = [offer for offer in sorted_offers if offer['entries'] >= third_offer_entries]

    # Uses entries as random weight
    sa_offer = next((offer for offer in top_offers if offer['team']['abbreviation'] == "SA"), None)

    # If "SA" is found, make them the winner, otherwise choose a winner randomly
    if sa_offer and (current_player["name"] == "Dudley Huntington" or current_player["name"] == "Lazaro Lockett" or current_player["name"] == "Dewitt Francois" ):
        winner = sa_offer
    else:
        # Uses entries as random weight
        winner = random.choices(top_offers, weights=(offer["entries"] for offer in top_offers))[0]

    return {"winner": winner, "player": current_player}


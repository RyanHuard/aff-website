from flask import Blueprint, request, jsonify

from api.db import get_db, close_db

records_bp = Blueprint("records", __name__, url_prefix="/api/records")


@records_bp.route("/season")
def get_single_season_records():
    db = get_db()

    # Helper function to execute a query and get records
    def get_records(query):
        db.execute(query)
        records = db.fetchall()
        return records

    # Queries for each category
    queries = {
        "pass_yards": """
            SELECT season_id, first_name, last_name, SUM(match_pass_yards) AS value
            FROM player_stats
            GROUP BY season_id, first_name, last_name
            ORDER BY value DESC
        """,
        "pass_tds": """
            SELECT season_id, first_name, last_name, SUM(match_pass_tds) AS value
            FROM player_stats
            GROUP BY season_id, first_name, last_name
            ORDER BY value DESC
        """,
        "rush_yards": """
            SELECT season_id, first_name, last_name, SUM(match_rush_yards) AS value
            FROM player_stats
            GROUP BY season_id, first_name, last_name
            ORDER BY value DESC
        """,
        "rush_tds": """
            SELECT season_id, first_name, last_name, SUM(match_rush_tds) AS value
            FROM player_stats
            GROUP BY season_id, first_name, last_name
            ORDER BY value DESC
        """,
        "receiving_yards": """
            SELECT season_id, first_name, last_name, SUM(match_receiving_yards) AS value
            FROM player_stats
            GROUP BY season_id, first_name, last_name
            ORDER BY value DESC
        """,
        "receiving_touchdowns": """
            SELECT season_id, first_name, last_name, SUM(match_receiving_tds) AS value
            FROM player_stats
            GROUP BY season_id, first_name, last_name
            ORDER BY value DESC
        """,
        "total_yards": """
            SELECT season_id, first_name, last_name, SUM(match_receiving_yards + match_rush_yards) AS value
            FROM player_stats
            GROUP BY season_id, first_name, last_name
            ORDER BY value DESC
        """,
    }

    data = {}

    for category, query in queries.items():
        records = get_records(query)

        # Rank records manually
        ranked_records = [
            {
                "season": record["season_id"] + 2021,
                "first_name": record["first_name"],
                "last_name": record["last_name"],
                category: record["value"],
            }
            for record in records[:10]  # Take top 10 records
        ]
        data[category] = ranked_records

    close_db()
    return jsonify(data)


from flask import jsonify


@records_bp.route("/career")
def get_career_records():
    db = get_db()

    # Helper function to execute a query and get records
    def get_records(query):
        db.execute(query)
        records = db.fetchall()
        return records

    # Queries for each category without season_id
    queries = {
        "pass_yards": """
            SELECT first_name, last_name, SUM(match_pass_yards) AS value
            FROM player_stats
            GROUP BY first_name, last_name
            ORDER BY value DESC
        """,
        "pass_tds": """
            SELECT first_name, last_name, SUM(match_pass_tds) AS value
            FROM player_stats
            GROUP BY first_name, last_name
            ORDER BY value DESC
        """,
        "rush_yards": """
            SELECT first_name, last_name, SUM(match_rush_yards) AS value
            FROM player_stats
            GROUP BY first_name, last_name
            ORDER BY value DESC
        """,
        "rush_tds": """
            SELECT first_name, last_name, SUM(match_rush_tds) AS value
            FROM player_stats
            GROUP BY first_name, last_name
            ORDER BY value DESC
        """,
        "receiving_yards": """
            SELECT first_name, last_name, SUM(match_receiving_yards) AS value
            FROM player_stats
            GROUP BY first_name, last_name
            ORDER BY value DESC
        """,
        "receiving_touchdowns": """
            SELECT first_name, last_name, SUM(match_receiving_tds) AS value
            FROM player_stats
            GROUP BY first_name, last_name
            ORDER BY value DESC
        """,
        "total_yards": """
            SELECT first_name, last_name, SUM(match_receiving_yards + match_rush_yards) AS value
            FROM player_stats
            GROUP BY first_name, last_name
            ORDER BY value DESC
        """,
    }

    data = {}

    for category, query in queries.items():
        records = get_records(query)
        # Rank records manually
        ranked_records = [
            {
                "first_name": record["first_name"],
                "last_name": record["last_name"],
                category: record["value"],
            }
            for record in records[:10]  # Take top 10 records
        ]
        data[category] = ranked_records

    close_db()
    return jsonify(data)

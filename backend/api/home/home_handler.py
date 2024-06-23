# Sorts the players to only return the top 5
def sort_and_slice(category_stats, key):
        sorted_players = sorted(category_stats, key=lambda x: x[key], reverse=True)
        return sorted_players[:5]  # Return only the top 5 players

def handle_stats(player_stats):
    passing_stats = []
    rushing_stats = []
    receiving_stats = []
    defense_stats = []
    kicking_stats = []
    punting_stats = []
    kick_returning_stats = []
    punt_returning_stats = []

    for player in player_stats:
        if player["match_pass_attempts"] > 0:
            passing_stats.append(player)
        if player["match_rush_attempts"] > 0:
            rushing_stats.append(player)
        if player["match_receiving_targets"] > 0 or player["match_receiving_receptions"] > 0:
            receiving_stats.append(player)
        if player["match_defense_tackles"] > 0 or player["match_defense_deflections"] > 0:
            defense_stats.append(player)
        if player["match_kick_fg_attempts"] > 0 or player["match_kick_xp_attempts"] > 0:
            kicking_stats.append(player)
        if player["match_punt_count"] > 0:
            punting_stats.append(player)
        if player["match_kick_return_count"] > 0:
            kick_returning_stats.append(player)
        if player["match_punt_return_count"] > 0:
            punt_returning_stats.append(player)
    
    stats_dict = {
        "passing_yards": sort_and_slice(passing_stats, "match_pass_yards"),
        "passing_tds": sort_and_slice(passing_stats, "match_pass_tds"),
        "rushing": sort_and_slice(rushing_stats, "match_rush_yards"),
        "receiving": sort_and_slice(receiving_stats, "match_receiving_yards"),
        "defense": sort_and_slice(defense_stats, "match_defense_sacks"),
    }
    return stats_dict
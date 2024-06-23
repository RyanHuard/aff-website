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
        "passing": passing_stats,
        "rushing": rushing_stats,
        "receiving": receiving_stats,
        "defense": defense_stats,
        "kicking": kicking_stats,
        "punting": punting_stats,
        "kick_returning": kick_returning_stats,
        "punt_returning": punt_returning_stats
    }

    return stats_dict
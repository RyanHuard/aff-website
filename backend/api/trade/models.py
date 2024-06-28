from marshmallow import Schema, fields, validate


class TradeDetailSchema(Schema):
    item_type = fields.Str(
        validate=validate.OneOf(["player", "draft_pick"]), required=True
    )
    player_first_name = fields.Str(required=False)
    player_last_name = fields.Str(required=False)
    draft_pick_id = fields.Int(required=False)
    direction = fields.Str(
        validate=validate.OneOf(["to_sending_team", "to_receiving_team"]), required=True
    )


class TradeSchema(Schema):
    sending_team_id = fields.Int(required=True)
    receiving_team_id = fields.Int(required=True)
    season_id = fields.Int(required=True)
    trade_details = fields.List(fields.Nested(TradeDetailSchema), required=True)

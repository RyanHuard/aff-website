from marshmallow import Schema, fields, validate, INCLUDE


class TradeDetailSchema(Schema):
    class Meta:
        unknown = INCLUDE

    item_type = fields.Str(
        validate=validate.OneOf(["player", "draft_pick"]), required=True
    )
    fname = fields.Str(required=False)
    lname = fields.Str(required=False)
    draft_pick_id = fields.Int(required=False)
    direction = fields.Str(
        validate=validate.OneOf(["to_sending_team", "to_receiving_team"]), required=True
    )


class TradeSchema(Schema):
    sending_team_id = fields.Int(required=True)
    receiving_team_id = fields.Int(required=True)
    season_id = fields.Int(required=True)
    trade_details = fields.List(fields.Nested(TradeDetailSchema), required=True)


class TradeResponseSchema(Schema):
    trade_id = fields.Int(required=True)
    response = fields.Str(
        validate=validate.OneOf(["accepted", "rejected", "canceled"]), required=True
    )

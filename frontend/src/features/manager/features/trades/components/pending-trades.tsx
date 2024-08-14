import React, { useState } from "react";
import { usePendingTrades } from "../api/get-pending-trades";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useRespondToTradeOffer } from "../api/respond-to-trade-offer";
import { TradeResponse } from "@/types/trades";
import { useAuthToken } from "@/hooks/use-auth-token";

type PendingTradesProps = {
  teamId: string;
};

function PendingTrades({ teamId }: PendingTradesProps) {
  const authToken = useAuthToken();

  const pendingTradesQuery = usePendingTrades(teamId, authToken);
  const responseToTradeMutation = useRespondToTradeOffer();

  const isLoading = responseToTradeMutation.isPending;
  

  function handleTradeResponse(
    tradeId: number,
    response: "accepted" | "rejected" | "canceled"
  ) {
    const tradeResponse: TradeResponse = {
      trade_id: tradeId,
      response: response,
    };

    responseToTradeMutation.mutate(tradeResponse);
  }

  return (
    <div className="bg-white">
      {pendingTradesQuery?.data?.map((trade) => {
        const date = new Date(trade?.date_created!);
        const formattedDate = format(date, "EEEE, MMMM d, yyyy");

        const isSending =
          trade.sending_team_id == parseInt(teamId) ? true : false;

        return (
          <div key={formattedDate} className="text-sm">
            <h2 className="bg-slate-50 font-bold border-y-2 p-2 px-3">
              {formattedDate}
            </h2>
            <div className="flex sm:text-sm justify-between p-5 text-xs gap-4">
              <div className="w-1/2 flex gap-2">
                <img
                  src={`/logos/${trade.sending_team_logo}`}
                  className="my-auto h-12 sm:h-16"
                />
                <div className="font-semibold text-slate-600 sm:px-4">
                  {trade.sending_team_location} acquires:
                  <div className="flex flex-col font-normal">
                    {trade?.details?.map(
                      (detail, detailIndex) =>
                        detail.direction == "to_sending_team" &&
                        (detail.item_type == "player" ? (
                          <Link
                            key={detailIndex}
                            to={`/players/${detail.player_first_name?.toLowerCase()}-${detail.player_last_name?.toLowerCase()}`}
                            className="text-aff-orange underline flex"
                          >
                            <span className="hidden xl:block">
                              {detail.player_first_name}&nbsp;
                            </span>
                            <span className="block xl:hidden">
                              {detail.player_first_name?.[0]}.&nbsp;
                            </span>
                            <span> {detail.player_last_name}</span>
                          </Link>
                        ) : (
                          <>
                            <div key={detailIndex} className="hidden sm:block">
                              {detail.draft_pick_details?.season_id! + 2021}{" "}
                              Round {detail.draft_pick_details?.round_num}
                              {detail.draft_pick_details?.pick_num && (
                                <span>
                                  &nbsp;Pick{" "}
                                  {detail.draft_pick_details.pick_num}
                                </span>
                              )}
                            </div>
                            <div key={detailIndex} className="block sm:hidden">
                              {detail.draft_pick_details?.season_id! + 2021} Rd.{" "}
                              {detail.draft_pick_details?.round_num}
                              {detail.draft_pick_details?.pick_num && (
                                <span>
                                  &nbsp;(
                                  {detail.draft_pick_details.pick_num})
                                </span>
                              )}
                            </div>
                          </>
                        ))
                    )}
                  </div>
                </div>
              </div>

              <div className="w-1/2 flex gap-2">
                <img
                  src={`/logos/${trade.receiving_team_logo}`}
                  className="my-auto h-12 sm:h-16"
                />
                <div className="font-semibold text-slate-600 sm:px-4">
                  {trade.receiving_team_location} acquires:
                  <div className="flex flex-col font-normal">
                    {trade?.details?.map(
                      (detail, detailIndex) =>
                        detail.direction == "to_receiving_team" &&
                        (detail.item_type == "player" ? (
                          <Link
                            key={detailIndex}
                            to={`/players/${detail.player_first_name?.toLowerCase()}-${detail.player_last_name?.toLowerCase()}`}
                            className="text-aff-orange underline flex"
                          >
                            <span className="hidden xl:block">
                              {detail.player_first_name}&nbsp;
                            </span>
                            <span className="block xl:hidden">
                              {detail.player_first_name?.[0]}.&nbsp;
                            </span>
                            <span> {detail.player_last_name}</span>
                          </Link>
                        ) : (
                          <div key={detailIndex} className="hidden sm:block">
                            {detail.draft_pick_details?.season_id! + 2021} Round{" "}
                            {detail.draft_pick_details?.round_num}
                            {detail.draft_pick_details?.pick_num && (
                              <span>
                                &nbsp;Pick {detail.draft_pick_details.pick_num}
                              </span>
                            )}
                            <div key={detailIndex} className="block sm:hidden">
                              {detail.draft_pick_details?.season_id! + 2021} Rd.{" "}
                              {detail.draft_pick_details?.round_num}
                              {detail.draft_pick_details?.pick_num && (
                                <span>
                                  &nbsp;(
                                  {detail.draft_pick_details.pick_num})
                                </span>
                              )}
                            </div>
                          </div>
                        ))
                    )}
                  </div>
                </div>
              </div>
              <div>
                {!isSending ? (
                  <div className="flex gap-2 my-auto">
                    <Button
                      size="sm"
                      className="rounded-none bg-green-600 hover:bg-green-800"
                      disabled={isLoading}
                      onClick={(e) =>
                        handleTradeResponse(trade.trade_id, "accepted")
                      }
                    >
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-none bg-red-600 hover:bg-red-800"
                      disabled={isLoading}
                      onClick={(e) =>
                        handleTradeResponse(trade.trade_id, "rejected")
                      }
                    >
                      Decline
                    </Button>
                  </div>
                ) : (
                  <Button
                    size="sm"
                    className="rounded-none  bg-red-600 hover:bg-red-800"
                    disabled={isLoading}
                    onClick={(e) =>
                      handleTradeResponse(trade.trade_id, "canceled")
                    }
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default PendingTrades;

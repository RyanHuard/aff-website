import ContentLayout from "@/components/layouts/wrapper/content-layout";
import Table from "@/components/table/table";
import React, { useEffect, useState } from "react";
import { useTrades } from "./api/get-trades";
import columns from "./components/columns";
import { Header } from "@/components/header/header";
import { Link, useNavigate, useParams } from "react-router-dom";
import { CURRENT_SEASON_ID } from "@/lib/utils";
import SeasonSelect from "@/components/ui/season-select";
import { format } from "date-fns";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

function Trades() {
  const navigate = useNavigate();
  const { seasonId } = useParams<{ seasonId?: string }>();
  const [selectedSeasonId, setSelectedSeasonId] = useState<string>(
    CURRENT_SEASON_ID.toString()
  );

  useEffect(() => {
    setSelectedSeasonId(seasonId ?? CURRENT_SEASON_ID.toString());
  }, [seasonId]);

  function handleSeasonSelect(e: string) {
    setSelectedSeasonId(e);
    navigate(`/trades/${e}`);
  }

  const tradesQuery = useTrades(selectedSeasonId);

  // const groupTradesByDate = (trades: TradeOffer[]) => {
  //   return trades?.reduce((acc: any, trade: TradeOffer) => {
  //     const date = new Date(trade?.date_responded!);
  //     const formattedDate = format(date, "EEEE, MMMM d, yyyy");
  //     if (!acc[formattedDate]) {
  //       acc[formattedDate] = [];
  //     }
  //     acc[formattedDate].push(trade);
  //     return acc;
  //   }, {});
  // };

  if (tradesQuery.isLoading) {
    return <LoadingSpinner />;
  }

  // const groupedTrades = groupTradesByDate(tradesQuery?.data!);
  // console.log(groupedTrades);

  return (
    <>
      <Header
        title={`AFF Trades - ${parseInt(selectedSeasonId) + 2021}`}
        children={
          <SeasonSelect
            handleSeasonSelect={handleSeasonSelect}
            value={seasonId ?? CURRENT_SEASON_ID.toString()}
          />
        }
      />
      <ContentLayout>
        <div className="bg-white">
          {tradesQuery?.data?.map((trade) => {
            const date = new Date(trade?.date_responded!);
            const formattedDate = format(date, "EEEE, MMMM d, yyyy");

            return (
              <div key={formattedDate} className="last-of-type:pb-6 text-sm">
                <h2 className="bg-slate-50 my-4 p-2 font-bold border-y-2">
                  {formattedDate}
                </h2>
                <div className="flex text-sm">
                  <div className="w-1/2 px-8 flex ">
                    <img
                      src={`/logos/${trade.sending_team_logo}`}
                      width="64"
                      className="my-auto"
                    />
                    <div className="font-semibold text-slate-600 px-8">
                      {trade.sending_team_location} acquired:
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
                              <div key={detailIndex}>
                                {detail.draft_pick_details?.season_id! + 2021}{" "}
                                Round {detail.draft_pick_details?.round_num}
                                {detail.draft_pick_details?.pick_num && (
                                  <span>
                                    &nbsp;Pick{" "}
                                    {detail.draft_pick_details.pick_num}
                                  </span>
                                )}
                              </div>
                            ))
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="w-1/2 px-8 flex">
                    <img
                      src={`/logos/${trade.receiving_team_logo}`}
                      width="64"
                      className="my-auto"
                    />
                    <div className="font-semibold text-slate-600 px-8">
                      {trade.receiving_team_location} acquired:
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
                              <div key={detailIndex}>
                                {detail.draft_pick_details?.season_id! + 2021}{" "}
                                Round {detail.draft_pick_details?.round_num}
                                {detail.draft_pick_details?.pick_num && (
                                  <span>
                                    &nbsp;Pick{" "}
                                    {detail.draft_pick_details.pick_num}
                                  </span>
                                )}
                              </div>
                            ))
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* {Object.keys(groupedTrades).map((date) => (
        <div key={date}>
          <h2>{date}</h2>
          <table>
            <thead>
              <tr>
                <th>Sending Team</th>
                <th>Receiving Team</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {groupedTrades[date].map((trade) => (
                <tr key={trade.trade_id}>
                  <td>
                    <img src={trade.sending_team_logo} alt={trade.sending_team_name} width="50" />
                    {trade.sending_team_name}
                  </td>
                  <td>
                    <img src={trade.receiving_team_logo} alt={trade.receiving_team_name} width="50" />
                    {trade.receiving_team_name}
                  </td>
                  <td>
                    {trade.details.map((detail, index) => (
                      <div key={index}>
                        {detail.item_type === 'player' ? (
                          `${detail.player_first_name} ${detail.player_last_name}`
                        ) : (
                          `Round ${detail.draft_pick_details.round_num} Pick ${detail.draft_pick_details.pick_num}`
                        )}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))} */}
      </ContentLayout>
    </>
  );
}

export default Trades;

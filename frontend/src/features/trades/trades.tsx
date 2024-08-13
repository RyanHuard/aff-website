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
import { IoMdSwap } from "react-icons/io";

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
          {tradesQuery?.isLoading ? (
            <div className="flex h-24 w-full items-center justify-center bg-[#edeef2]">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <>
              {tradesQuery?.data?.map((trade) => {
                const date = new Date(trade?.date_responded!);
                const formattedDate = format(date, "EEEE, MMMM d, yyyy");

                return (
                  <div key={trade.trade_id} className="text-sm">
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
                          <span>{trade.sending_team_location}</span> acquired:
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
                                    <div
                                      key={detailIndex}
                                      className="hidden sm:block"
                                    >
                                      {detail.draft_pick_details?.season_id! +
                                        2021}{" "}
                                      Round{" "}
                                      {detail.draft_pick_details?.round_num}
                                      {detail.draft_pick_details?.pick_num && (
                                        <span>
                                          &nbsp;Pick{" "}
                                          {detail.draft_pick_details.pick_num}
                                        </span>
                                      )}
                                    </div>
                                    <div className="block sm:hidden">
                                      {detail.draft_pick_details?.season_id! +
                                        2021}{" "}
                                      Rd. {detail.draft_pick_details?.round_num}
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
                                  <>
                                    <div
                                      key={detailIndex}
                                      className="hidden sm:block"
                                    >
                                      {detail.draft_pick_details?.season_id! +
                                        2021}{" "}
                                      Round{" "}
                                      {detail.draft_pick_details?.round_num}
                                      {detail.draft_pick_details?.pick_num && (
                                        <span>
                                          &nbsp;Pick{" "}
                                          {detail.draft_pick_details.pick_num}
                                        </span>
                                      )}
                                    </div>
                                    <div className="block sm:hidden">
                                      {detail.draft_pick_details?.season_id! +
                                        2021}{" "}
                                      Rd. {detail.draft_pick_details?.round_num}
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
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </ContentLayout>
    </>
  );
}

export default Trades;

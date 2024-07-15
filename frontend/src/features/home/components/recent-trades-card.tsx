import { IoMdSwap } from "react-icons/io";

import { useRecentTrades } from "./api/get-recent-trades";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

function RecentTradesCard() {
  const recentTradesQuery = useRecentTrades();
  return (
    <div className="drop-shadow-md rounded-sm bg-white">
      <header className="h-12 bg-aff-blue rounded-t-sm">
        <h1 className="px-4 py-3 font-semibold text-white">RECENT TRADES</h1>
      </header>
      <section className="flex flex-wrap justify-between p-4 pb-2">
        <Accordion
          className="flex flex-col w-full -mt-2"
          type="multiple"
          collapsible
        >
          {recentTradesQuery?.data?.map((trade, index) => (
            <AccordionItem value={trade.trade_id.toString()} key={index}>
              <AccordionTrigger className="flex py-2">
                <div className="flex w-2/5 pl-2">
                  <img
                    src={`/logos/${trade.sending_team_logo}`}
                    width="30"
                    className=""
                  />
                  <span className="px-2 my-auto hidden xl:block">
                    {trade.sending_team_name}
                  </span>
                  <span className="px-2 my-auto xl:hidden block">
                    {trade.sending_team_abbreviation}
                  </span>
                </div>

                <IoMdSwap color="green" className="mx-auto" size={24} />

                <div className="flex flex-row-reverse w-2/5 px-4">
                  {" "}
                  <img src={`/logos/${trade.receiving_team_logo}`} width="30" />
                  <span className="px-2 my-auto hidden xl:block">
                    {trade.receiving_team_name}
                  </span>
                  <span className="px-2 my-auto xl:hidden block">
                    {trade.receiving_team_abbreviation}
                  </span>
                </div>
                <div className="text-xs text-slate-600">05/0{index + 1}</div>
              </AccordionTrigger>
              <AccordionContent className="flex flex-row justify-between px-6 -mb-2">
                <div className="w-2/5 text-left">
                  <div className="text-slate-600">Acquired:</div>
                  <div className="flex flex-col">
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
                            {detail.draft_pick_details?.season_id! + 2021} Rd.{" "}
                            {detail.draft_pick_details?.round_num}
                            {detail.draft_pick_details?.pick_num && (
                              <span>
                                &nbsp;({detail.draft_pick_details.pick_num})
                              </span>
                            )}
                          </div>
                        ))
                    )}
                  </div>
                </div>
                <div className="pr-8 text-right">
                  <div className="text-slate-600">Acquired:</div>
                  {trade?.details?.map(
                    (detail, detailIndex) =>
                      detail.direction == "to_receiving_team" &&
                      (detail.item_type == "player" ? (
                        <Link
                          key={detailIndex}
                          to={`/players/${detail.player_first_name.toLowerCase()}-${
                            detail.player_last_name?.toLowerCase
                          }`}
                          className="text-aff-orange underline flex ml-16"
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
                          {detail.draft_pick_details?.season_id! + 2021} Rd.{" "}
                          {detail.draft_pick_details?.round_num}
                          {detail.draft_pick_details?.pick_num && (
                            <span>
                              &nbsp;({detail.draft_pick_details.pick_num})
                            </span>
                          )}
                        </div>
                      ))
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </div>
  );
}

export default RecentTradesCard;

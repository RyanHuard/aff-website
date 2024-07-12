import { IoMdSwap } from "react-icons/io";

import { useRecentTrades } from "./api/get-recent-trades";

function RecentTradesCard() {
  const recentTradesQuery = useRecentTrades();
  console.log(recentTradesQuery);
  return (
    <div className="drop-shadow-md rounded-sm bg-white">
      <header className="h-12 bg-aff-blue rounded-t-sm">
        <h1 className="px-4 py-3 font-semibold text-white">RECENT TRADES</h1>
      </header>
      <section className="flex flex-wrap justify-between p-4 pb-2">
        <div className="flex flex-col w-full -mt-2">
          {recentTradesQuery?.data?.map((trade, index) => (
            <div
              key={index}
              className="flex items-center border-b border-slate-300 py-2 last-of-type:border-0"
            >
              <div className="flex w-2/5">
                <img
                  src={`/logos/${trade.sending_team_logo}`}
                  width="30"
                  className=""
                />
                <span className="px-2 my-auto">{trade.sending_team_name}</span>
              </div>

              <IoMdSwap color="green" className="mx-auto" size={24} />

              <div className="flex flex-row-reverse w-2/5">
                {" "}
                <img src={`/logos/${trade.receiving_team_logo}`} width="30" />
                <span className="px-2 my-auto">
                  {trade.receiving_team_name}
                </span>
              </div>
              <div className="w-1/5 pl-2 pr-1 text-center text-xs underline">
                {trade.date_responded
                  ? new Date(trade.date_responded).toLocaleDateString("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                      year: "2-digit",
                    })
                  : "06/28/24"}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default RecentTradesCard;

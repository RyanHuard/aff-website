import ContentLayout from "@/components/layouts/wrapper/content-layout";
import Table from "@/components/table/table";
import React, { useEffect, useState } from "react";
import { useTrades } from "./api/get-trades";
import columns from "./components/columns";
import { Header } from "@/components/header/header";
import { useNavigate, useParams } from "react-router-dom";
import { CURRENT_SEASON_ID } from "@/lib/utils";
import SeasonSelect from "@/components/ui/season-select";

function Trades() {
  const navigate = useNavigate();
  const { seasonId } = useParams<{ seasonId?: string }>();
  const [selectedSeasonId, setSelectedSeasonId] = useState<string>(
    CURRENT_SEASON_ID.toString()
  );

  const tradesQuery = useTrades();

  useEffect(() => {
    setSelectedSeasonId(seasonId ?? "7");
  }, [seasonId]);

  function handleSeasonSelect(e: string) {
    setSelectedSeasonId(e);
    navigate(`/trades/${e}`);
  }

  return (
    <>
      <Header
        title={`Trades - ${parseInt(selectedSeasonId) + 2021}`}
        children={
          <SeasonSelect
            handleSeasonSelect={handleSeasonSelect}
            value={seasonId ?? CURRENT_SEASON_ID.toString()}
          />
        }
      />
      <ContentLayout>
        <Table
          title="Trades"
          data={tradesQuery?.data}
          columns={columns}
          progressPending={tradesQuery.isLoading}
          expandableRows
          expandableRowsComponent
        />
      </ContentLayout>
    </>
  );
}

function ExpandedTradeRow({ data }) {}

export default Trades;

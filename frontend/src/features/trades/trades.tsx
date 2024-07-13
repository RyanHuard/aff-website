import ContentLayout from "@/components/layouts/wrapper/content-layout";
import Table from "@/components/table/table";
import React from "react";
import { useTrades } from "./api/get-trades";
import columns from "./components/columns";
import { Header } from "@/components/header/header";

function Trades() {
  const tradesQuery = useTrades();

  return (
    <>
      <Header title="Trades" />
      <ContentLayout>
        <Table
          title="Trades"
          data={tradesQuery?.data}
          columns={columns}
          progressPending={tradesQuery.isLoading}
        />
      </ContentLayout>
    </>
  );
}

export default Trades;

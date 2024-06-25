import React, { useEffect, useState } from "react";
import { usePlayerStats } from "./api/get-player-stats";
import Table from "@/components/table/table";
import { columns } from "./components/columns";
import ContentLayout from "@/components/layouts/wrapper/content-layout";
import { Header } from "@/components/header/header";
import SeasonSelect from "@/components/ui/season-select";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PositionFilter from "./components/position-filter";

const PlayerStats = () => {
  const navigate = useNavigate();
  const { seasonId } = useParams<{
    seasonId?: string;
  }>();

  const [selectedSeasonId, setSelectedSeasonId] = useState<string>(
    seasonId ?? "7"
  );
  const [tabIndex, setTabIndex] = useState<number>(0);
  const [category, setCategory] = useState<string>("Passing");
  const [filterValue, setFilterValue] = useState<string>("");

  const categories = [
    "Passing",
    "Rushing",
    "Receiving",
    "Defense",
    "Kicking",
    "Punting",
    "Kick Returning",
    "Punt Returning",
  ];

  useEffect(() => {
    setSelectedSeasonId(seasonId ?? "7");
  }, [seasonId]);

  const handleSeasonSelect = (e: string) => {
    setSelectedSeasonId(e);
    setFilterValue("");
    navigate(`/stats/${e}`);
  };

  const handleTabChange = (index: number) => {
    setTabIndex(index);
    setCategory(categories[index]);
    setFilterValue("");
  };

  let playerStatsQuery = usePlayerStats(selectedSeasonId);
  let stats =
    playerStatsQuery?.data?.[category?.toLowerCase().replace(" ", "_")];

  const filteredStats = stats?.filter(
    (player) => filterValue === "" || player.position === filterValue
  );

  return (
    <>
      <Header
        title={`Player Statistics - ${parseInt(selectedSeasonId) + 2021}`}
        children={
          <div className="flex flex-col gap-4">
            <SeasonSelect
              handleSeasonSelect={handleSeasonSelect}
              value={selectedSeasonId}
              statYearsOnly={true}
            />
          </div>
        }
      />
      {/* <div className="bg-white -mt-12 mb-12 py-2 flex">
        <div className="max-w-7xl mx-auto">
          <Tabs defaultValue={categories[0]}>
            <TabsList>
              {categories.map((name, index) => {
                return (
                  <TabsTrigger
                    value={name}
                    key={index}
                    onFocus={() => handleTabChange(index)}
                  >
                    {name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
          <div className="ml-auto mx-2">
            <PositionFilter value={filterValue} setValue={setFilterValue} />
          </div>
        </div>
      </div> */}
      <ContentLayout>
        <div className="bg-white py-2 flex">
          <Tabs defaultValue={categories[0]} className="max-w-7xl">
            <TabsList className="rounded-none mx-2">
              {categories.map((name, index) => {
                return (
                  <TabsTrigger
                    value={name}
                    key={index}
                    onFocus={() => handleTabChange(index)}
                  >
                    {name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>
          <div className="ml-auto mx-2">
            <PositionFilter value={filterValue} setValue={setFilterValue} />
          </div>
        </div>
        <Table
          key={category}
          data={filteredStats}
          columns={columns[tabIndex]}
          title={category}
          progressPending={playerStatsQuery.isLoading}
          defaultSortFieldId={2}
          pagination={true}
          paginationPerPage={20}
          paginationComponentOptions={{
            selectAllRowsItem: true,
            rowsPerPageText: "Players per row",
          }}
          fontSize="14px"
        />
      </ContentLayout>
    </>
  );
};

export default PlayerStats;

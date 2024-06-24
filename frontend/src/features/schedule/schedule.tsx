import React, { useState } from "react";

import { LoadingSpinner } from "@/components/ui/loading-spinner";
import Week from "./components/week";
import { useSchedule } from "./api/get-schedule";
import { Header } from "@/components/header/header";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import ContentLayout from "@/components/layouts/wrapper/content-layout";
import { useNavigate, useParams } from "react-router-dom";

type HeaderActionsProps = {
  handleSeasonSelect: (e: string) => void;
  handleWeekSelect: (e: string) => void;
  seasonId: string;
  weekId: string;
};

function HeaderActions({
  handleSeasonSelect,
  handleWeekSelect,
  seasonId,
  weekId,
}: HeaderActionsProps) {
  return (
    <>
      <Select defaultValue={seasonId} onValueChange={handleSeasonSelect}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">2022</SelectItem>
          <SelectItem value="2">2023</SelectItem>
          <SelectItem value="3">2024</SelectItem>
          <SelectItem value="4">2025</SelectItem>
          <SelectItem value="5">2026</SelectItem>
          <SelectItem value="6">2027</SelectItem>
          <SelectItem value="7">2028</SelectItem>
        </SelectContent>
      </Select>

      <Select defaultValue={weekId} onValueChange={handleWeekSelect}>
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Week 1</SelectItem>
          <SelectItem value="2">Week 2</SelectItem>
          <SelectItem value="3">Week 3</SelectItem>
          <SelectItem value="4">Week 4</SelectItem>
          <SelectItem value="5">Week 5</SelectItem>
          <SelectItem value="6">Week 6</SelectItem>
          <SelectItem value="7">Week 7</SelectItem>
          <SelectItem value="8">Week 8</SelectItem>
          <SelectItem value="9">Week 9</SelectItem>
          <SelectItem value="10">Week 10</SelectItem>
          <SelectItem value="11">Week 11</SelectItem>
          <SelectItem value="12">Week 12</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
}

export default function Schedule() {
  const navigate = useNavigate();
  const { seasonId, weekId } = useParams<{
    seasonId?: string;
    weekId?: string;
  }>();

  const [selectedSeasonId, setSelectedSeasonId] = useState<string>(
    seasonId ?? "7"
  );
  const [selectedWeekId, setSelectedWeekId] = useState<string>(weekId ?? "1");

  const handleSeasonSelect = (e: string) => {
    setSelectedSeasonId(e);
    navigate(`/schedule/${e}/${selectedWeekId}`);
  };

  const handleWeekSelect = (e: string) => {
    setSelectedWeekId(e);
    navigate(`/schedule/${selectedSeasonId}/${e}`);
  };

  let scheduleQuery = useSchedule(selectedSeasonId);

  return (
    <>
      <Header
        title={`AFF Schedule - ${
          parseInt(selectedSeasonId) + 2021
        } - Week ${selectedWeekId}`}
        children={
          <HeaderActions
            handleSeasonSelect={handleSeasonSelect}
            handleWeekSelect={handleWeekSelect}
            seasonId={selectedSeasonId}
            weekId={selectedWeekId}
          />
        }
      />
      <ContentLayout>
        {scheduleQuery?.isLoading ? (
          <div className="flex h-24 w-full items-center justify-center bg-[#edeef2]">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <Week
            seasonIdString={selectedSeasonId}
            weekId={selectedWeekId}
            schedule={scheduleQuery.data}
          />
        )}
      </ContentLayout>
    </>
  );
}

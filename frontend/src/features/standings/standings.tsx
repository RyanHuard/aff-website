import { useState, useEffect } from "react";

import Tables from "./components/tables";
import { Header } from "@/components/header/header";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate, useParams } from "react-router-dom";

type HeaderActionsProps = {
  handleSeasonSelect: (e: string) => void;
  defaultValue: string;
};

function HeaderActions({
  handleSeasonSelect,
  defaultValue,
}: HeaderActionsProps) {
  return (
    <Select defaultValue={defaultValue} onValueChange={handleSeasonSelect}>
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
  );
}

export default function Standings() {
  const navigate = useNavigate();
  const { seasonId } = useParams<{ seasonId?: string }>();
  const [selectedSeasonId, setSelectedSeasonId] = useState<string>("7");

  function handleSeasonSelect(e: string) {
    setSelectedSeasonId(e);
    navigate(`/standings/${e}`);
  }

  return (
    <>
      <Header
        title={`AFF Standings - ${parseInt(selectedSeasonId) + 2021}`}
        children={
          <HeaderActions
            handleSeasonSelect={handleSeasonSelect}
            defaultValue={seasonId ?? "7"}
          />
        }
      />
      <Tables seasonIdString={selectedSeasonId} />;
    </>
  );
}

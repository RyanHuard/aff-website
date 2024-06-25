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
import ContentLayout from "@/components/layouts/wrapper/content-layout";
import SeasonSelect from "@/components/ui/season-select";

type HeaderActionsProps = {
  handleSeasonSelect: (e: string) => void;
  defaultValue: string;
};

export default function Standings() {
  const navigate = useNavigate();
  const { seasonId } = useParams<{ seasonId?: string }>();
  const [selectedSeasonId, setSelectedSeasonId] = useState<string>("7");

  useEffect(() => {
    setSelectedSeasonId(seasonId ?? "7");
  }, [seasonId]);

  function handleSeasonSelect(e: string) {
    setSelectedSeasonId(e);
    navigate(`/standings/${e}`);
  }

  return (
    <>
      <Header
        title={`AFF Standings - ${parseInt(selectedSeasonId) + 2021}`}
        children={
          <SeasonSelect
            handleSeasonSelect={handleSeasonSelect}
            value={seasonId ?? "7"}
          />
        }
      />
      <ContentLayout>
        <Tables seasonIdString={selectedSeasonId} />
      </ContentLayout>
    </>
  );
}

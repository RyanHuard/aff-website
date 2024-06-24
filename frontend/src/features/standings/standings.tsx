import React, { ChangeEvent, useState } from "react";

import Tables from "./components/tables";

const Standings = () => {
  const [seasonId, setSeasonId] = useState<string>("7");

  const handleSeasonSelect = (e: string) => {
    setSeasonId(e);
  };

  return <Tables seasonIdString={seasonId} />;
};

export default Standings;

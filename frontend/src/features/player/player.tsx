import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePlayerDetails } from "./api/get-player-details";
import Header from "./components/header";
import { useTeam } from "../team/api/get-team";

const Player = () => {
  const [tabIndex, setTabIndex] = useState(0);

  let { name } = useParams() as { name: string };

  let firstName = name?.split("-")[0];
  let lastName = name?.split("-")[1];

  const playerDetailsQuery = usePlayerDetails(firstName, lastName);
  const playerDetails = playerDetailsQuery?.data;

  const handleTabChange = (e) => {
    setTabIndex(e);
  };

  return (
    <div>
      <Header playerDetails={playerDetails} />
    </div>
  );
};

export default Player;

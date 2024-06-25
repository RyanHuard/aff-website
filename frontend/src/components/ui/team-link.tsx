import React from "react";
import { Link } from "react-router-dom";

type TeamLinkProps = {
  location: string;
  name: string;
  teamId: number;
  children: React.ReactNode;
};

const TeamLink = ({ location, name, teamId, children }: TeamLinkProps) => {
  let locationSplit = location
    ?.replace(" ", "-")
    .replace(".", "")
    .toLowerCase();
  let nameSplit = name?.replace(" ", "-").toLowerCase();
  return (
    <Link to={`/teams/${teamId}/${locationSplit}-${nameSplit}`}>
      {children}
    </Link>
  );
};

export default TeamLink;

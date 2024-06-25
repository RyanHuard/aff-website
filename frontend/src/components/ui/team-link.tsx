import React from "react";
import { Link } from "react-router-dom";

type TeamLinkProps = {
  teamId: number;
  children: React.ReactNode;
};

const TeamLink = ({ teamId, children }: TeamLinkProps) => {
  return <Link to={`/teams/${teamId}`}>{children}</Link>;
};

export default TeamLink;

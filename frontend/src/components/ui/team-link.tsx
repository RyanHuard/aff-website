import React from "react";
import { Link } from "react-router-dom";

type TeamLinkProps = {
  teamId: number;
  className?: string;
  children: React.ReactNode;
};

const TeamLink = ({ teamId, className, children }: TeamLinkProps) => {
  return (
    <Link to={`/teams/${teamId}`} className={className}>
      {children}
    </Link>
  );
};

export default TeamLink;

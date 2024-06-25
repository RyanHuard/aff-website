import ContentLayout from "@/components/layouts/wrapper/content-layout";
import { NavLink } from "react-router-dom";
import { useTeams } from "./api/get-teams";

const Teams = () => {
  let teamsQuery = useTeams();

  let teamData = teamsQuery?.data;
  teamData = teamsQuery?.data?.sort((a: string, b: string) =>
    a.team_location.localeCompare(b.team_location)
  );

  const homeTowns = [
    "Birmingham, AL",
    "Fargo, ND",
    "Louisville, KY",
    "Memphis, TN",
    "Norman, OK",
    "Orlando, FL",
    "San Antonio, TX",
    "Shreveport, LA",
    "Charleston, SC",
    "St. Louis, MO",
  ];

  const managers = [
    "Colby Garrett",
    "Andrew Munie",
    "Tucker James",
    "Hutch Dunavant",
    "Andrew Brady",
    "Jeb Wells",
    "Ryan Huard",
    "Jackson Baird",
    "Graydon Cowgill",
    "Griffon Kipper",
  ];

  return (
    <ContentLayout>
      <div className="flex flex-wrap justify-center gap-x-36 gap-y-20 gap pt-12">
        {teamData?.map((team: any, index: number) => {
          return (
            <NavLink to={`/teams/${team.team_id}`} key={index}>
              <img width="300" src={`/helmets/${team.helmet}`} />
              <div className="flex-col flex text-center leading-5">
                <span className="font-bold">
                  {team.team_location} {team.team_name}
                </span>
                <span>{homeTowns[index]}</span>
                <span>General Manager: {managers[index]}</span>
              </div>
            </NavLink>
          );
        })}
      </div>
    </ContentLayout>
  );
};

export default Teams;

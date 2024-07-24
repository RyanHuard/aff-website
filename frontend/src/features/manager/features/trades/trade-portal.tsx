import { useUserTeam } from "@/hooks/use-user-team";
import TeamTraderBox from "./components/team-trader-box";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useTeams } from "@/features/teams/api/get-teams";
import ContentLayout from "@/components/layouts/wrapper/content-layout";
import { Separator } from "@/components/ui/separator";

function TradePortal() {
  const { userTeam, isLoading } = useUserTeam();

  const teamsQuery = useTeams("team_id"); // Orders them by teamId
  const teams = teamsQuery?.data;

  if (!userTeam) {
    return <></>;
  }

  const filteredTeams = teams?.filter(
    (team) => team.team_id != userTeam.teamId
  );

  return (
    <ContentLayout>
      <div className="block md:flex lg:gap-6 gap-0">
        <TeamTraderBox
          userTeamDetails={teamsQuery?.data?.[parseInt(userTeam.teamId)]}
        />
        <Separator className="w-[2px]" />
        <TeamTraderBox teamDetails={filteredTeams} />
      </div>
    </ContentLayout>
  );
}

export default TradePortal;

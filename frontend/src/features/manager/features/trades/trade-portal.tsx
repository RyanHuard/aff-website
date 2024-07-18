import { useUserTeam } from "@/hooks/use-user-team";
import TeamTraderBox from "./components/team-trader-box";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useTeams } from "@/features/teams/api/get-teams";
import ContentLayout from "@/components/layouts/wrapper/content-layout";

function TradePortal() {
  const { userTeam, isLoading } = useUserTeam();

  const teamsQuery = useTeams("team_id"); // Orders them by teamId

  if (isLoading || teamsQuery.isLoading) {
    return (
      <div className="flex h-24 w-full items-center justify-center bg-slate-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!userTeam) {
    return <></>;
  }

  return (
    <ContentLayout>
      {/* <TeamTraderBox
        userTeamDetails={teamsQuery?.data?.[parseInt(userTeam.teamId)]}
      /> */}
      <TeamTraderBox teamDetails={teamsQuery?.data} />
    </ContentLayout>
  );
}

export default TradePortal;

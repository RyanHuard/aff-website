import { useUserTeam } from "@/hooks/use-user-team";
import TeamTraderBox from "./components/team-trader-box";

import { useTeams } from "@/features/teams/api/get-teams";
import ContentLayout from "@/components/layouts/wrapper/content-layout";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { CreateTradeOffer, DraftPickDetail, PlayerDetail } from "@/types/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useCreateTradeOffer } from "./api/create-trade-offer";
import { CURRENT_SEASON_ID } from "@/lib/utils";
import PendingTrades from "./components/pending-trades";
import { useAuthToken } from "@/hooks/use-auth-token";

function TradePortal() {
  const { userTeam, isLoading } = useUserTeam();
  const [toReceivingTeam, setToReceivingTeam] = useState<
    (PlayerDetail | DraftPickDetail)[]
  >([]);

  const [toSendingTeam, setToSendingTeam] = useState<
    (PlayerDetail | DraftPickDetail)[]
  >([]);

  const authToken = useAuthToken();

  const createTradeOfferMutation = useCreateTradeOffer(authToken);

  const teamsQuery = useTeams("team_id"); // Orders them by teamId
  const teams = teamsQuery?.data;

  if (!userTeam) {
    return <></>;
  }

  const filteredTeams = teams?.filter(
    (team) => team.team_id != userTeam.teamId
  );

  function handleToReceivingTeam(
    players: PlayerDetail[],
    draftPicks: DraftPickDetail[]
  ) {
    setToReceivingTeam([...players, ...draftPicks]);
  }

  function handleToSendingTeam(
    players: PlayerDetail[],
    draftPicks: DraftPickDetail[]
  ) {
    setToSendingTeam([...players, ...draftPicks]);
  }

  function handleSendTradeOffer() {
    toReceivingTeam.forEach((asset) => {
      asset.direction = "to_receiving_team";
      asset.item_type = asset.fname ? "player" : "draft_pick";
    });

    toSendingTeam.forEach((asset) => {
      asset.direction = "to_sending_team";
      asset.item_type = asset.fname ? "player" : "draft_pick";
    });

    const tradeData: CreateTradeOffer = {
      sending_team_id: parseInt(userTeam!.teamId),
      receiving_team_id: toSendingTeam[0].tid ?? toSendingTeam[0].team_id,
      season_id: CURRENT_SEASON_ID,
      trade_details: [...toReceivingTeam, ...toSendingTeam],
    };

    createTradeOfferMutation.mutate(tradeData, {
      onSuccess: () => {
        setToReceivingTeam([]);
        setToSendingTeam([]);
      },
    });
  }

  return (
    <>
      <ContentLayout>
        <Tabs defaultValue="create" className="pt-2">
          <TabsList>
            <TabsTrigger value="create">Create</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>
          <TabsContent value="create">
            <div className="block md:flex lg:gap-6 gap-0">
              <TeamTraderBox
                userTeamDetails={teamsQuery?.data?.[parseInt(userTeam.teamId)]}
                handleToReceivingTeam={handleToReceivingTeam}
                handleToSendingTeam={handleToSendingTeam}
                incomingAssets={toSendingTeam}
                outgoingAssets={toReceivingTeam}
                handleSendTradeOffer={handleSendTradeOffer}
              />
              <Separator className="w-[2px]" />
              <TeamTraderBox
                teamDetails={filteredTeams}
                handleToReceivingTeam={handleToReceivingTeam}
                handleToSendingTeam={handleToSendingTeam}
                incomingAssets={toReceivingTeam}
                outgoingAssets={toSendingTeam}
              />
            </div>
          </TabsContent>
          <TabsContent value="pending">
            <PendingTrades teamId={userTeam.teamId} />
          </TabsContent>
        </Tabs>
      </ContentLayout>
    </>
  );
}

export default TradePortal;

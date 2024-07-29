import CreateAPlayerCard from "./components/create-player-card";
import SocialsCard from "./components/socials-card";
import ContentLayout from "@/components/layouts/wrapper/content-layout";
import HomeLayout from "./components/home-layout";
import StatLeadersCard from "./components/stat-leaders/stat-leaders";
import RecentTradesCard from "./components/recent-trades-card";
import { useAuthToken } from "@/hooks/use-auth-token";

const Header = () => {
  return (
    <img
      className="w-full lg:block hidden"
      src={"/assets/welcome-banner.png"}
    />
  );
};
const Home = () => {
  // Different component order for mobile vs desktop
  return (
    <>
      <Header />
      <div className="hidden lg:block pt-12">
        <ContentLayout>
          <HomeLayout>
            <div className="col-span-6 flex-col space-y-6">
              {/* <JoinCommunity />
              <ArticleCard /> */}
              <StatLeadersCard />
            </div>

            <div className="col-span-3 space-y-6">
              <CreateAPlayerCard />
              <RecentTradesCard />
              {/* <StandingsCard /> */}
              <SocialsCard />
            </div>

            <div className="col-span-9">{/* <LeagueInfoCard /> */}</div>
          </HomeLayout>
        </ContentLayout>
      </div>

      <div className="mr lg:hidden">
        <ContentLayout>
          <HomeLayout>
            {/* <ArticleCard />
            <JoinCommunity /> */}
            <CreateAPlayerCard />
            {/* <StandingsCard /> */}
            <SocialsCard />
            {/* <LeagueInfoCard /> */}
          </HomeLayout>
        </ContentLayout>
      </div>
    </>
  );
};

export default Home;

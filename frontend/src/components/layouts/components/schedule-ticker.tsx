import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { useSchedule } from "../api/get-schedule";
import Carousel from "./carousel";
import Game from "./game";

export default function Ticker() {
  const gamesQuery = useSchedule();

  if (gamesQuery.isLoading) {
    return (
      <div className="flex h-24 w-full items-center justify-center bg-slate-50">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <Carousel>
      {gamesQuery?.data?.map((game, index) => {
        return <Game game={game} key={index} />;
      })}
    </Carousel>
  );
}

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

import App from "./App";
import "./index.css";
import MainLayout from "./components/layouts/main-layout";
import Standings from "./features/standings/standings";
import Schedule from "./features/schedule/schedule";
import Game from "./features/game/game";
import PlayerStats from "./features/stats/player-stats";
import Team from "./features/team/team";
import Teams from "./features/teams/teams";
import Player from "./features/player/player";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <App />,
      },
      {
        path: "/standings/:seasonId?",
        element: <Standings />,
      },
      {
        path: "/schedule/:seasonId?/:weekId?",
        element: <Schedule />,
      },
      {
        path: "/stats/:seasonId?",
        element: <PlayerStats />,
      },
      {
        path: "/teams",
        element: <Teams />,
      },
      {
        path: "/teams/:teamId",
        element: <Team />,
      },
      {
        path: "/game/:gameId",
        element: <Game />,
      },
      {
        path: "/players/:name",
        element: <Player />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister }}
    >
      <RouterProvider router={router} />
    </PersistQueryClientProvider>
  </React.StrictMode>
);

import { auth } from "@/firebase";
import { useUserTeam } from "@/hooks/use-user-team";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

function ManagerRoute() {
  const { userTeam, isLoading } = useUserTeam();

  if (isLoading) {
    return <div>Loading</div>;
  }

  const isManager = !!userTeam;

  if (!isManager) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default ManagerRoute;

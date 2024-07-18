import { auth } from "@/firebase";
import { useUserTeam } from "@/hooks/use-user-team";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import MainLayout from "../layouts/main-layout";
import { LoadingSpinner } from "../ui/loading-spinner";

function ManagerRoute() {
  const { userTeam, isLoading } = useUserTeam();
  console.log(userTeam, isLoading);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#edeef2]">
        <LoadingSpinner size="lg" className="relative bottom-64 sm:bottom-86" />
      </div>
    );
  }

  const isManager = !!userTeam;

  if (!isManager) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}

export default ManagerRoute;

import { Card } from "@chakra-ui/react";
import React from "react";

import playerEditor from "../../../assets/player-editor.png";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CreateAPlayerCard = () => {
  const navigate = useNavigate();
  return (
    <div className="drop-shadow-md rounded-sm bg-white">
      <div className="flex">
        <img
          src={"/assets/create-player.png"}
          className="w-[8.2rem] rounded-l-sm object-cover"
        />
        <div className="p-6 mx-auto">
          <h1 className="text-center text-2xl font-bold">CREATE A PLAYER</h1>
          <p className="mt-6 text-center">Create your unique superstar</p>
          <div className="mt-6 text-center">
            {/* <Button onClick={() => navigate("/create-a-player")}>GET STARTED</Button> */}
            <Button
              className="bg-aff-blue"
              onClick={() => alert("Create a Player is coming soon!")}
            >
              GET STARTED
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAPlayerCard;

import React, { useContext, useEffect, useState } from "react";

import { io } from "socket.io-client";

import { useFreeAgents } from "./api/get-free-agents";;
import { Modal, ModalContent, ModalOverlay } from "@chakra-ui/react";

import List from "./components/list";
import Offers from "./components/offers";
import CurrentPlayer from "./components/current-player";
import OfferInput from "./components/offer-input";
import TeamList from "./components/team-list";
import CountdownTimer from "./components/countdown-timer";
import { useTeams } from "../teams/api/get-teams";
import { Button } from "@/components/ui/button";

let socket;
const URL = process.env.NODE_ENV == "production" ? undefined : "http://127.0.0.1:5000"
export default function FreeAgency() {
  const [start, setStart] = useState(false);
  const [capRemaining, setCapRemaining] = useState([]);

  const [inputOffer, setInputOffer] = useState("");
  const [offers, setOffers] = useState([]);
  const [userOffer, setUserOffer] = useState();

  const [finalOfferIsChecked, setFinalOfferIsChecked] = useState(false);
  const [finalOfferChecks, setFinalOfferChecks] = useState([]);
  const [numChecked, setNumChecked] = useState(0);

  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);

  const [winner, setWinner] = useState();
  const [winnerModal, setWinnerModal] = useState(false);

  const [finalOfferCountdown, setFinalOfferCountdown] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(0);

  let freeAgentsQuery = useFreeAgents(currentPlayerIndex);
  let freeAgents = freeAgentsQuery?.data;
  let currentPlayer = freeAgents?.[currentPlayerIndex];

  const teamsQuery = useTeams();
  const teams = teamsQuery?.data;

  const calculateEntries = (offer) => {
    const progression = [3, 2.5, 2, 1.5, 1];
    const prime = [2, 2.5, 3, 2.5, 2];
    const regression = [1, 1.5, 2, 2.5, 3];

    let salary = offer.split("/")[0];
    let length = offer.split("/")[1];
    let entries;

    if (currentPlayer.age <= 27) {
      entries = salary * progression[length - 1] * 2;
    } else if (currentPlayer.age <= 32) {
      entries = salary * prime[length - 1] * 2;
    } else {
      entries = salary * regression[length - 1] * 2;
    }

    return entries;
  };

  useEffect(() => {
    socket = io(URL, { transports: ["websocket"] });

    socket.on("start", (data) => {
      setStart(data);
    });

    socket.on("connect", () => {
      const teamId = localStorage.getItem("teamId");
      socket.emit("final_offer_checked", {
        is_checked: finalOfferIsChecked,
        team_id: teamId,
      });
    });

    socket.on("update_cap", (updated_cap) => {
      setCapRemaining(updated_cap[localStorage.getItem("teamId")]);
    });

    socket.on("update_offers", (updated_offers) => {
      setOffers([...updated_offers]);
    });

    socket.on("final_offer_checks", (final_offers) => {
      setFinalOfferChecks(final_offers);
      let finalOfferCount = final_offers.filter(
        (offer) => offer.data?.isChecked == true
      ).length;

      if (finalOfferCount >= 1) {
        setNumChecked(finalOfferCount);
      } else {
        setNumChecked(0);
      }
    });

    socket.on("winner", (winner) => {
      setFinalOfferIsChecked(false);
      setOffers([]);
      setInputOffer("");
      setNumChecked(0);
      setUserOffer();
      setWinner(winner);
      if (winner.winner) {
        setWinnerModal(true);
      }
    });

    socket.on("update_player", (data) => {
      setCurrentPlayerIndex(data);
    });

    socket.on("start_final_countdown", () => {
      startCountdown();
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (countdownSeconds > 0) {
      const timer = setInterval(
        () => setCountdownSeconds(prevCountdownSeconds => prevCountdownSeconds - 1),
        1000
      );
  
      return () => {
        clearInterval(timer);
        setFinalOfferCountdown(false);
      };
    }
  }, [countdownSeconds, setFinalOfferCountdown]);

  const startCountdown = () => {
    setCountdownSeconds(prevCountdownSeconds => {
      // Check if countdown is not already active
      if (prevCountdownSeconds === 0) {
        setFinalOfferCountdown(true); // Assuming you want to indicate that the countdown is now active
        return 5;
      }
      return prevCountdownSeconds;
    });
  };

  const sendOffer = () => {
    const userTeam = teams?.find(
      (team) => team.team_id == localStorage.getItem("teamId")
    );

    const offer = {
      contract: inputOffer,
      entries: calculateEntries(inputOffer),
      team: userTeam,
    };
    socket.emit("send_offer", offer);
  };

  const handleSubmitOffer = (e) => {
    e.preventDefault();
    if (!finalOfferIsChecked) {
      console.log(inputOffer)
    if (/^\d+\/[1-5]$/.test(inputOffer)) {
      sendOffer();
      setUserOffer(inputOffer);
      setInputOffer("");
    } else {
      alert(
        "Please enter your offer in the correct format ($/years):\ne.g. '4/3' offers the player $4,000,000 for 3 years"
      );
      setInputOffer("");
    }
  }
  };

  const handleFinalOfferCheck = (e) => {
    const isChecked = e.target.checked;
    const teamId = localStorage.getItem("teamId");

    setFinalOfferIsChecked(isChecked);
    socket.emit("final_offer_checked", {
      is_checked: isChecked,
      team_id: teamId,
    });
  };

  const handleWinnerModalClose = () => {
    setWinnerModal(false);
  };

  return (
    <div className="min-h-[900px] bg-[#edeef2]">
      <Modal size="2xl" isOpen={winnerModal} onClose={handleWinnerModalClose}>
        <ModalOverlay />
        <ModalContent>
          <CountdownTimer winner={winner} />
        </ModalContent>
      </Modal>
      <div className="border-b-2 border-white bg-aff-blue pb-8 pt-8">
        <h1 className="text-center text-2xl font-bold text-gray-100">
          AMERICAN FOOTBALL FEDERATION FREE AGENCY 2028
        </h1>
        <div>{socket?.connected}</div>
      </div>
      {start || localStorage.getItem("teamId") == "2" ? (
        <div className="flex h-[89.3vh] justify-center gap-2 p-2 pt-44 md:flex-row md:justify-around md:gap-8 md:p-8">
          <List
            freeAgents={freeAgents}
            teams={teams}
            currentPlayerIndex={currentPlayerIndex}
          />
          <Offers offers={offers} teams={teams} />
          <div className="flex flex-col gap-8">
            <CurrentPlayer
              currentPlayer={freeAgents?.[currentPlayerIndex]}
              capRemaining={capRemaining}
              userOffer={userOffer}
              setCapRemaining={setCapRemaining}
            />
            <OfferInput
              currentPlayer={currentPlayer}
              handleSubmitOffer={handleSubmitOffer}
              inputOffer={inputOffer}
              setInputOffer={setInputOffer}
              finalOfferIsChecked={finalOfferIsChecked}
              handleFinalOfferCheck={handleFinalOfferCheck}
              finalOfferChecks={finalOfferChecks}
              numChecked={numChecked}
              countdownSeconds={countdownSeconds}
            />
            {localStorage.getItem("teamId") == 2 && !start && (
              <Button onClick={() => socket.emit("start")}>Start</Button>
            )}

            <TeamList finalOfferChecks={finalOfferChecks} teams={teams} />
          </div>
        </div>
      ) : (
        <div className="flex h-[89.3vh] justify-center gap-8 p-8 ">
          <h1 className="text-center text-xl font-semibold">
            Waiting for free agency to start!
          </h1>
        </div>
      )}
    </div>
  );
};
import React, { useEffect, useState } from "react";

const CurrentPlayer = ({
  currentPlayer,
  userOffer,
  capRemaining,
  setCapRemaining,
}) => {
    
  let userOfferSalary = userOffer?.split("/")[0];
  let userOfferLength = userOffer?.split("/")[1];
  let updatedCapRemaining = capRemaining;

  let ageStage;

  if (currentPlayer?.age >= 32) {
    ageStage = "Regression";
  }

  else if (currentPlayer?.age >= 28) {
    ageStage = "Prime";
  }
  else {
    ageStage = "Progression";
  }

  if (userOfferLength) {
    for (let i = 0; i < userOfferLength; i++) {
      if (i < 3) {
      let updatedCap = parseInt(capRemaining[2030 + i] - parseInt(userOfferSalary));
      updatedCapRemaining = {
        ...updatedCapRemaining,
        [2030 + i]: updatedCap,
      };
    }
    }
  }

  
  return (
    <div className="h-fit max-w-[30rem] lg:w-[30rem] bg-white drop-shadow-md">
      <div className="px-6 pt-6">
        <h2 className="text-xl font-semibold">
          {currentPlayer?.name} is now accepting offers:
        </h2>
        <div className="pt-6">
          <div className="flex gap-4">
            <img
              width="170"
              src={`/players/${
                currentPlayer?.name?.split(" ")[0]
              }_${currentPlayer?.name?.split(" ")[1]}.png`}
            />
            <div className="flex gap-2">
              <ul className="font-semibold *:pb-2">
                <li>Name:</li>
                <li>Position: </li>
                <li>College:</li>
                <li>Age:</li>
                <li>Personality:</li>
              </ul>
              <ul className="[&>*]:pb-2">
                <li>{currentPlayer?.name}</li>
                <li>{currentPlayer?.pos}</li>
                <li>{currentPlayer?.college}</li>
                <li>{currentPlayer?.age} ({ageStage})</li>
                <li>{currentPlayer?.personality}</li>
              </ul>
            </div>
          </div>
          <div className="flex gap-8 py-6">
            <div className="flex gap-2">
              <ul className="font-semibold [&>*]:pb-2 ">
                <li className="font-bold">Overall:</li>
                <li>Skill: </li>
                <li>Speed:</li>
                <li>Agility:</li>
                <li>Strength:</li>
              </ul>
              <ul className="[&>*]:pb-2">
                <li className="font-bold">{currentPlayer?.overall}</li>
                <li>{currentPlayer?.skill}</li>
                <li>{currentPlayer?.speed}</li>
                <li>{currentPlayer?.agility}</li>
                <li>{currentPlayer?.strength}</li>
              </ul>
            </div>
            <div className="ml-16">
              <span className="font-bold">Your current offer:</span>
              {userOfferSalary && <div className="">${userOfferSalary},000,000 / {userOfferLength} year{userOfferLength != 1 && <span>s</span>}</div>}
              <div className="pt-2">
                <span className="font-bold">Cap remaining:</span>
                <ul className="">
                  {Object.entries(updatedCapRemaining)?.map(
                    ([year, amount], index) => {
                      return (
                        <li key={index}>
                          {year}: ${amount},000,000
                        </li>
                      );
                    }
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentPlayer;
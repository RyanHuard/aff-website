import React from 'react'

const TeamList = ({ finalOfferChecks, teams, handleFinalOfferCheck }) => {
  return (
    <div className="flex flex-col gap-4">
    <div className="flex flex-wrap gap-10">
      {finalOfferChecks?.slice(0, 5).map((offer, index) => {
        const offerTeam = teams?.find(
          (team) => team.team_id == offer.data?.team_id
        );
        let opaque;
        if (!offer.data?.isChecked) {
          opaque = "opacity-40";
        } else {
          opaque = "opacity-100";
        }

        return (
          <img
            key={index}
            className={`w-[4rem] ${opaque}`}
            src={`/logos/${offerTeam?.team_logo}`}
          />
        );
      })}
    </div>
    <div className="flex flex-wrap gap-10">
      {finalOfferChecks?.slice(5, 10).map((offer, index) => {
        const offerTeam = teams?.find(
          (team) => team.team_id == offer.data?.team_id
        );
        let opaque;
        if (!offer.data?.isChecked) {
          opaque = "opacity-50";
        } else {
          opaque = "opacity-100";
        }

        return (
          <img
            key={index}
            className={`w-[4rem] ${opaque} pointer-events-auto`}
            src={`/assets/logos/${offerTeam?.team_logo}`}
            onClick={() => {
              if (localStorage.getItem("teamId") == 2) {
                const fakeEvent = {
                  target: {
                    checked: true, // Simulate the checkbox being checked or unchecked
                  },
                };
       
                handleFinalOfferCheck(fakeEvent);
              }
            }}
          />
        );
      })}
    </div>
  </div>
  )
}

export default TeamList
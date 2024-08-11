import React from 'react'

const TeamList = ({ finalOfferChecks, teams }) => {
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
            src={`/assets/logos/${offerTeam?.team_logo}`}
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
            className={`w-[4rem] ${opaque}`}
            src={`/assets/logos/${offerTeam?.team_logo}`}
          />
        );
      })}
    </div>
  </div>
  )
}

export default TeamList
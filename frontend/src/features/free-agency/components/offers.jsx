import React from "react";

const Offers = ({ offers, teams }) => {
  offers.sort((a, b) => b.entries - a.entries)
  return (
    <div className="lg:w-[30rem] md:min-w-[24rem] bg-white drop-shadow-md">
      {offers?.map((offer, index) => {
        let formattedOffer = `$${offer.contract.split("/")[0]} million / ${
          offer.contract.split("/")[1]
        } years`;

        // Check if the index is less than 3 (first three elements)
        const isThirdIndex = index === 2;
        const isFirstThreeElements = index < 3;

        return (
          <div
            key={index}
            className={`h-[8.34%] border-b border-gray-600 px-4 ${
              isThirdIndex && "border-b-2 !border-black"
            } ${isFirstThreeElements ? " bg-green-300" : "bg-red-200"}`}
          >
            <div className="flex h-full">
              <img
                src={`/logos/${offer?.team.team_logo}`}
                alt={`${offer.former_team} Logo`}
                className="m-[6px]"
              />
              <span className="my-auto ml-4 font-semibold">
                {formattedOffer}
              </span>
              <span className="my-auto ml-auto pr-8 font-semibold">
                {offer.entries} entries
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Offers;
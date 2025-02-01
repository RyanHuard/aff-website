import React, { useState, useEffect } from "react";

const CountdownTimer = ({ winner }) => {
  const [count, setCount] = useState(3);

  const player = winner.player;
  const winningTeam = winner.winner.team;

  const salary = winner.winner.contract.split("/")[0];
  const length = winner.winner.contract.split("/")[1];

  useEffect(() => {
    if (count > 0) {
      const timer = setInterval(() => setCount(count - 1), 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [count]);

  return (
    <div className="h-96 rounded bg-white w-1/3 mx-auto mt-8">
      <div className="p-4 text-center text-xl" style={{}}>
        {count === 0 ? (
          <div className="h-full mt-14 text-2xl">
            <h1 className="font-semibold pb-4">Congratulations!</h1>
            <div>
              <div>
                <img
                  width="90px"
                  className="mx-auto pb-4"
                  src={`/logos/${winningTeam.team_logo}`}
                />
              </div>{" "}
              {player.name} signs with the {winningTeam.team_location}{" "}
              {winningTeam.team_name}. <br />${salary}
              ,000,000 / {length} years
            </div>
          </div>
        ) : (
          <h1 className="text-3xl mt-14">{count}</h1>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;
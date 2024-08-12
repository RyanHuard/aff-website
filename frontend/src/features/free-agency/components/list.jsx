import React from "react";

const List = ({ freeAgents, teams, currentPlayerIndex }) => {
  return (
    <div className="w-[50rem] hidden xl:block overflow-scroll bg-white drop-shadow-md">
      <table className="w-full table-auto text-[14px]">
        <thead>
          <tr className="border-b border-gray-400 text-left ">
            <th className="py-2 pl-2">Player</th>
            <th className="py-2 pl-2">Pos</th>
            <th className="py-2 pl-2">College</th>
            <th className="py-2 pl-2">Ovr</th>
            <th className="py-2 pl-2">Skl</th>
            <th className="py-2 pl-2">Spd</th>
            <th className="py-2 pl-2">Agl</th>
            <th className="py-2 pl-2">Str</th>
            <th className="py-2 pl-2">Personality</th>
            <th className="py-2 pl-2">Age</th>
            <th className="py-2 pl-2">Former</th>
            <th className="py-2 pl-2">New</th>
            <th className="py-2 pl-2">Contract</th>
          </tr>
        </thead>
        <tbody>
          {freeAgents?.map((player, index) => {
            const playerTeam = teams?.find(
              (team) => team.team_name === player.former_team
            );

            const newPlayerTeam = teams?.find(
              (team) => team.team_name === player.new_team
            );
            return (
              <tr
              key={index}
              className={` border-b border-gray-400 even:bg-gray-50 [&>*]:px-2 [&>*]:py-1 ${
                currentPlayerIndex == index && "!bg-green-500"
              }`}
            >
                <td >{player.name}</td>
                <td>{player.pos}</td>
                <td>{player.college}</td>
                <td className="font-bold">{player.overall}</td>
                <td>{player.skill}</td>
                <td>{player.speed}</td>
                <td>{player.agility}</td>
                <td>{player.strength}</td>
                <td>{player.personality}</td>
                <td>{player.age}</td>
                <td>
                  {playerTeam && (
                    <img
                      src={`/logos/${playerTeam?.team_logo}`}
                      alt={`${player?.former_team} Logo`}
                      width="30"
                    />
                  )}
                </td>
                <td>
                  {newPlayerTeam && (
                    <img
                      src={`/logos/${newPlayerTeam?.team_logo}`}
                      alt={`${player?.new_team} Logo`}
                      width="30"
                    />
                  )}
                </td>
                {player.contract_salary ? (
                  <td>
                    ${player.contract_salary}m/{player.contract_years}yrs
                  </td>
                ) : (
                  <div></div>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default List;

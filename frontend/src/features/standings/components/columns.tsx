import TeamLink from "@/components/ui/team-link";

const columns = [
  {
    name: "Rank",
    selector: (_row: any, index: any) => index + 1,
    width: "6rem",
    hide: "sm",
  },
  {
    name: "Team",
    selector: (row: any) => row.team,
    sortable: true,
    cell: (row: any) => {
      let location = row.team?.split(" ")[0];
      let name = row.team?.split(" ")[1];

      return (
        <TeamLink teamId={row.team_id}>
          <div className="flex">
            <img src={`/logos/${row.team_logo}`} alt="Team Logo" width={30} />
            <span className="my-auto hidden pl-2 sm:block">{row.team}</span>
            <span className="my-auto pl-2 sm:hidden">
              {row.stats_team_city}
            </span>
          </div>
        </TeamLink>
      );
    },
    width: () => {
      const isSmallerThan600 = window.matchMedia("(max-width: 600px)").matches;
      return isSmallerThan600 ? "8rem" : "16rem";
    },
  },
  {
    name: "W",
    selector: (row: any) => row.wins,
    sortable: true,
  },
  {
    name: "L",
    selector: (row: any) => row.loss,
    sortable: true,
  },
  {
    name: "PCT",
    selector: (row: any) =>
      row.wins != 0
        ? parseFloat((row.wins / (row.loss + row.wins)).toFixed(3))
        : "N/A",
    sortable: true,
  },
  {
    name: "PF",
    selector: (row: any) => row.points_for,
    sortable: true,
  },
  {
    name: "PA",
    selector: (row: any) => row.points_against,
    sortable: true,
  },
  {
    name: "P+/-",
    selector: (row: any) => row.points_for - row.points_against,
    sortable: true,
  },
];

export default columns;

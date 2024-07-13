import TeamLink from "@/components/ui/team-link";

const columns = [
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
      //   const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");
      //   return isSmallerThan600 ? "8rem" : "16rem";
      return "16rem";
    },
  },
  // {
  //   name: "W",
  //   selector: (row: any) => row.wins,
  //   sortable: true,
  // }
];

export default columns;

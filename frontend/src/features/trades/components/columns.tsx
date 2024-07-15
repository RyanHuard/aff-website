import TeamLink from "@/components/ui/team-link";

const columns = [
  {
    name: "Date",
    selector: (row: TradeOffer) => row.date_responded,
    sortable: true,
    cell: (row: TradeOffer) => {
      const date = new Date(row?.date_responded!);

      // Define arrays for day of the week and month names
      const daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];

      // Format the date
      const formattedDate = `${daysOfWeek[date.getDay()]}, ${
        months[date.getMonth()]
      } ${date.getDate()}, ${date.getFullYear()}`;

      return <div>{formattedDate}</div>;
    },
    width: "16rem",
  },
  {
    name: "Sending Team",
    selector: (row: TradeOffer) => row.sending_team_id,
    sortable: true,
    cell: (row: TradeOffer) => {
      return (
        <TeamLink teamId={row.sending_team_id}>
          <div className="flex">
            <img
              src={`/logos/${row.sending_team_logo}`}
              alt="Team Logo"
              width={30}
            />
            <span className="my-auto hidden pl-2 sm:block">
              {row.sending_team_name}
            </span>
            <span className="my-auto pl-2 sm:hidden">
              {row.sending_team_abbreviation}
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
  {
    name: "Receiving Team",
    selector: (row: TradeOffer) => row.receiving_team_id,
    sortable: true,
    cell: (row: TradeOffer) => {
      return (
        <TeamLink teamId={row.receiving_team_id}>
          <div className="flex">
            <img
              src={`/logos/${row.receiving_team_logo}`}
              alt="Team Logo"
              width={30}
            />
            <span className="my-auto hidden pl-2 sm:block">
              {row.receiving_team_name}
            </span>
            <span className="my-auto pl-2 sm:hidden">
              {row.receiving_team_abbreviation}
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
  {
    name: "Sending Team",
    selector: (row: TradeOffer) => row.sendinn,
  },
  // {
  //   name: "W",
  //   selector: (row: any) => row.wins,
  //   sortable: true,
  // }
];

export default columns;

import DataTable from "react-data-table-component";

import "./table.css";
import { LoadingSpinner } from "../ui/loading-spinner";

const affStyles = {
  table: {
    style: {
      overflow: "auto",
    },
  },
  headRow: {
    style: {
      fontSize: "14px",
      fontWeight: "semibold",
      color: "black",
      backgroundColor: "white",
      minHeight: "40px",
    },
    denseStyle: {
      fontSize: "14px",
    },
  },
  rows: {
    style: {
      fontSize: "15px",
    },
    denseStyle: {
      fontSize: "14px",
    },
  },
  header: {
    style: {
      backgroundColor: "white",
      fontSize: "18px",
      minHeight: "50px",
      borderBottom: "1px solid orange",
    },
  },
};

const Table = (props: any) => {
  return (
    <div className="overflow-x-auto drop-shadow">
      <DataTable
        striped={true}
        customStyles={affStyles}
        responsive="true"
        progressComponent={<LoadingSpinner className="m-36" />}
        defaultSortAsc={false}
        {...props}
      />
    </div>
  );
};

export default Table;

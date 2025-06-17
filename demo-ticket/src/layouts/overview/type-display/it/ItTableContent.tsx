import CustomizeTablePopOver from "@/components/pop-overs/CustomizeTablePopOver";
import TicketTable from "@/components/table/ticket-table/TicketTable";
import React from "react";

const ItTableContent = () => {
  return (
    <>
      <div className="it-table-tool">
        <div className="it-table-tool-left">
          <div className="it-table-tool-left-item">
            <CustomizeTablePopOver />
          </div>
        </div>
      </div>
      <TicketTable />
    </>
  );
};

export default ItTableContent;

import Icons from "@/components/icons/Icons";
import CustomizeFieldPopOver from "@/components/pop-overs/CustomizeFieldPopOver";
import TicketTable from "@/components/table/ticket-table/TicketTable";
import { Button } from "antd";
import React from "react";

const ItTableContent = () => {
  return (
    <>
      <div className="it-table-tool">
        <div className="d-flex align-items-center gap-2">
          <div className="theme-sample"></div>
          <p className="paragraph-no-style">Theme colors</p>
        </div>
        <CustomizeFieldPopOver />
        <Button variant="outlined" color="default" className="customize-button">
          <Icons name="start" />
          <p className="paragraph-no-style">Dev</p>
        </Button>
        <Button variant="outlined" color="default" className="customize-button">
          <Icons name="guide" />
          <p className="paragraph-no-style">Guide</p>
        </Button>
      </div>
      <TicketTable />
    </>
  );
};

export default ItTableContent;

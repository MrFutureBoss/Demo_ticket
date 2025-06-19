"use client";

import Icons from "@/components/icons/Icons";
import CustomizeFieldPopOver from "@/components/pop-overs/CustomizeFieldPopOver";
import TicketTable from "@/components/table/ticket-table/TicketTable";
import useClientSave from "@/hooks/useClientSave";
import { Button } from "antd";
import React, { useEffect, useState } from "react";
import LoadingDots from "@/components/loadings/LoadingDots";

const ItTableContent = () => {
  const { clientSave, patchClientSave } = useClientSave();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDevmode = (devmode: boolean) => {
    patchClientSave({ table: { devmode: !devmode } });
  };

  if (!isClient) {
    return (
      <div className="it-table-tool">
        <LoadingDots />
      </div>
    );
  }

  if (!clientSave) {
    return (
      <div className="it-table-tool">
        <LoadingDots />
      </div>
    );
  }

  return (
    <>
      <div className="it-table-tool">
        <div className="d-flex align-items-center gap-2">
          <div className="theme-sample"></div>
          <p className="paragraph-no-style">Theme colors</p>
        </div>
        <CustomizeFieldPopOver />
        <Button
          type="default"
          className={`customize-button ${
            clientSave?.table?.devmode
              ? "devmode-button-active"
              : "devmode-button"
          }`}
          onClick={() => handleDevmode(clientSave?.table?.devmode)}
        >
          <Icons name="start" />
          <p className="paragraph-no-style">Dev</p>
        </Button>
        <Button type="default" className="customize-button">
          <Icons name="guide" />
          <p className="paragraph-no-style">Guide</p>
        </Button>
      </div>
      <TicketTable />
    </>
  );
};

export default ItTableContent;

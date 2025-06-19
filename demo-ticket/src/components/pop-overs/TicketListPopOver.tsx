import { Popover } from "antd";
import React from "react";

interface TicketListPopOverProps {
  children: React.ReactNode;
}

const TicketListTitle = () => {
  return <div>List Tickets</div>;
};

const TicketListContent = () => {
  return <div>TicketListContent</div>;
};

export default function TicketListPopOver({
  children,
}: TicketListPopOverProps) {
  return (
    <Popover
      placement="left"
      title={<TicketListTitle />}
      content={<TicketListContent />}
      trigger="click"
      arrow={true}
    >
      {children}
    </Popover>
  );
}

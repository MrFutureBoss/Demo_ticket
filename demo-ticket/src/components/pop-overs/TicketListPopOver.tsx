import { Popover } from "antd";
import React, { useState } from "react";

interface TicketListPopOverProps {
  children: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
}

const TicketListTitle = () => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>List Tickets</div>
      <a href="#">Go to table</a>
    </div>
  );
};

const TicketListContent = () => {
  return <div>TicketListContent</div>;
};

export default function TicketListPopOver({
  children,
}: TicketListPopOverProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      placement="left"
      title={<TicketListTitle />}
      content={<TicketListContent />}
      trigger="click"
      arrow={true}
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      {typeof children === "function" ? children(isOpen) : children}
    </Popover>
  );
}

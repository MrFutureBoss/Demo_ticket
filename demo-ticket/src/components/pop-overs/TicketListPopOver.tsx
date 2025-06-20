import { Popover } from "antd";
import React, { useState } from "react";
import Icons from "../icons/Icons";

interface TicketListPopOverProps {
  children: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
}

const TicketListTitle = () => {
  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>Open Tickets today</div>
      <a href="#">
        Go to table <Icons name="arrow-right" />
      </a>
    </div>
  );
};

const TicketListContent = () => {
  return <div className="ticket-list-content">TicketListContent</div>;
};

export default function TicketListPopOver({
  children,
}: TicketListPopOverProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="ticket-list-popover">
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
    </div>
  );
}

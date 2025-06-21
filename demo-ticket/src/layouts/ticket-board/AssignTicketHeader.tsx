import Image from "next/image";
import React from "react";

export default function AssignTicketHeader() {
  return (
    <div className="ticket-board-header">
      <div className="ticket-board-header-title">
        <p className="title-small">Assign Ticket</p>
        <div className="d-flex align-items-center gap-2">
          <Image
            src="/assets/images/itticket.svg"
            alt="logo"
            width={30}
            height={30}
            className="image-square-rounded"
          />
          <p className="title-large">Welcome to the IT Ticket System 👋</p>
        </div>
      </div>
    </div>
  );
}

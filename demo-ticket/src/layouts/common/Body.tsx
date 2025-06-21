"use client";

import { Splitter } from "antd";
import React, { memo, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store";
import SideBar from "./SideBar";
import ChatButton from "@/components/chat/ChatButton";
import useTickets from "@/hooks/useTickets";
import { showNewTicketNotification } from "@/components/notifications/NewTicketNotification";
import TicketModals from "@/components/modals/TicketModals";

interface BodyProps {
  children: React.ReactNode;
}

const Body = memo(function Body({ children }: BodyProps) {
  const isLeftVisible = useSelector(
    (state: RootState) => state.splitter.isLeftVisible
  );

  const { tickets } = useTickets();
  const previousTicketsRef = useRef(tickets);
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // Skip notification on first load
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      previousTicketsRef.current = tickets;
      return;
    }

    // Check if we have new tickets
    if (tickets.length > 0 && previousTicketsRef.current.length > 0) {
      const latestTicket = tickets[0];
      const previousLatestTicket = previousTicketsRef.current[0];

      // Show notification only if the latest ticket is different from the previous one
      // and the new ticket has a newer timestamp
      if (
        latestTicket.id !== previousLatestTicket.id &&
        new Date(latestTicket.create_date) >
          new Date(previousLatestTicket.create_date)
      ) {
        showNewTicketNotification({
          title: latestTicket.title,
          description: latestTicket.content,
          status: latestTicket.status,
        });
      }
    }

    // Update the reference
    previousTicketsRef.current = tickets;
  }, [tickets]);

  const handleResize = (sizes: number[]) => {
    // Optional: You can handle the resize event here if needed
    console.log('Panels resized:', sizes);
  };

  return (
    <div className="body-container">
      <ChatButton />
      <TicketModals />
      <Splitter className="splitter-container" onResize={handleResize}>
        <Splitter.Panel
          defaultSize="15%"
          min="10%"
          max="40%"
          collapsible={{ start: !isLeftVisible }}
          size={isLeftVisible ? "15%" : 0}>
          <SideBar />
        </Splitter.Panel>
        <Splitter.Panel>
          <div className="body-content">
            {children}
          </div>
        </Splitter.Panel>
      </Splitter>
    </div>
  );
});

export default Body;


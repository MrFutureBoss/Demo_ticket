"use client";
import React, { useEffect, useRef } from "react";
import { Tabs, TabsProps } from "antd";
import Icons from "../icons/Icons";
import ItTableContent from "@/layouts/overview/type-display/it/ItTableContent";
import useTickets from "@/hooks/useTickets";
import { showNewTicketNotification } from "../notifications/NewTicketNotification";

const items: TabsProps["items"] = [
  {
    key: "1",
    label: (
      <div className="overview-tab-label">
        <Icons name="summary" /> Summary
      </div>
    ),
    children: <div>Summary</div>,
  },
  {
    key: "2",
    label: (
      <div className="overview-tab-label">
        <Icons name="board" />
        Board
      </div>
    ),
    children: <div>Board</div>,
  },
  {
    key: "3",
    label: (
      <div className="overview-tab-label">
        <Icons name="calendar" />
        Calendar
      </div>
    ),
    children: <div>Calendar</div>,
  },
  {
    key: "4",
    label: (
      <div className="overview-tab-label">
        <Icons name="table" />
        Table
      </div>
    ),
    children: (
      <div className="overview-tab-content">
        <ItTableContent />
      </div>
    ),
  },
  {
    key: "5",
    label: (
      <div className="overview-tab-label">
        <Icons name="form" />
        Form
      </div>
    ),
    children: <div>Form</div>,
  },
];

export default function OverviewTabs() {
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
      if (latestTicket.id !== previousLatestTicket.id && 
          new Date(latestTicket.create_date) > new Date(previousLatestTicket.create_date)) {
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

  return (
    <div className="overview-tabs">
      <Tabs defaultActiveKey="4" items={items}></Tabs>
    </div>
  );
}

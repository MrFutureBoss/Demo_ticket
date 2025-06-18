"use client";
import React from "react";
import { notification } from "antd";
import Status from "../icons/Status";

interface NewTicketNotificationProps {
  title: string;
  description: string;
  status: number;
}

export const showNewTicketNotification = ({ title, description, status }: NewTicketNotificationProps) => {
  notification.open({
    message: title,
    description: description,
    icon: <Status status={status} />,
    showProgress: true,
    duration: 4.5,
    placement: "topRight",
  });
};

export default function NewTicketNotification() {
  return null;
}

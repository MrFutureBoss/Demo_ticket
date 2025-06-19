"use client";
import React from "react";
import { notification } from "antd";
import Status from "../icons/Status";
import readHTML from "@/utilities/convert/readHTML";
import showLessWord from "@/utilities/format/showLessWord";

interface NewTicketNotificationProps {
  title: string;
  description: string;
  status: number;
}

export const showNewTicketNotification = ({
  title,
  description,
  status,
}: NewTicketNotificationProps) => {
  notification.open({
    message: <span className="paragraph-bold-style">{title}</span>,
    description: readHTML(showLessWord(description, 50)),
    icon: <Status status={status} showTitle={false} />,
    showProgress: true,
    duration: 60,
    placement: "topRight",
  });
};

export default function NewTicketNotification() {
  return null;
}

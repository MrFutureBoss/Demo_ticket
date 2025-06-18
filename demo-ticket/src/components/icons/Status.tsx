import { Tooltip } from "antd";
import Image from "next/image";
import React from "react";

interface StatusProps {
  status: number;
  showTitle?: boolean;
}

export default function Status({ status, showTitle = true }: StatusProps) {
  const item = renderStatus(status);

  function renderStatus(status: number) {
    switch (status) {
      case 1:
        return { title: "Open", url: "/assets/images/open.svg" };
      case 2:
        return { title: "In Progress", url: "/assets/images/inprogress.svg" };
      case 3:
        return { title: "Completed", url: "/assets/images/check.svg" };
      case 4:
        return { title: "In Review", url: "/assets/images/reopen.svg" };
      case 5:
        return { title: "Pending", url: "/assets/images/pending.svg" };
      case 6:
        return { title: "On Hold", url: "/assets/images/onhold.svg" };
      default:
        return { title: "Undefined", url: "/assets/images/kaban.svg" };
    }
  }

  return (
    <Tooltip title={item.title}>
      <div className="d-flex gap-2 align-items-center">
        <Image
          src={item.url}
          width={25}
          height={25}
          quality={50}
          alt={item.title}
        />
        <p className={`paragraph-bold-style ${showTitle ? "" : "d-none"}`}>
          {item.title}
        </p>
      </div>
    </Tooltip>
  );
}

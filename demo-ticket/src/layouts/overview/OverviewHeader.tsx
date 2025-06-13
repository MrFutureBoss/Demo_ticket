import OverviewTabs from "@/components/tabs/OverviewTabs";
import Image from "next/image";
import React from "react";

export default function OverviewHeader() {
  return (
    <div className="overview-header">
      <div className="overview-header-title">
        <p className="title-small">Overview</p>
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
      <div className="overview-header-tabs">
        <OverviewTabs />
      </div>
    </div>
  );
}

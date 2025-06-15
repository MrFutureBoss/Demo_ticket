import Image from "next/image";
import React from "react";

interface StatusProps {
  status: number;
}

export default function Status({ status }: StatusProps) {
  const item = renderStatus(status);

  function renderStatus(status: number) {
    switch (status) {
      case 1:
        return { title: "Completed", url: "/assets/images/check.svg" };
      case 2:
        return { title: "On Hold", url: "/assets/images/onhold.svg" };
      case 3:
        return { title: "In Progress", url: "/assets/images/inprogress.svg" };
      case 4:
        return { title: "Reopen", url: "/assets/images/reopen.svg" };
      case 5:
        return { title: "Open", url: "/assets/images/open.svg" };
      case 6:
        return { title: "Pending", url: "/assets/images/pending.svg" };
      default:
        return { title: "Undefined", url: "/assets/images/kaban.svg" };
    }
  }

  return (
    <div className="d-flex gap-2 align-items-center">
      <Image src={item.url} width={25} height={25} quality={50} alt={item.title} />
      <p className="paragraph-bold-style">{item.title}</p>
    </div>
  );
}

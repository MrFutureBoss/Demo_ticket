"use client";

import { Button, Popover } from "antd";
import React from "react";
import Icons from "../icons/Icons";
import { useRouter, usePathname } from "next/navigation";
import ListOfTicketByStatus from "../list/ListOfTicketByStatus";
import LoadingDots from "../loadings/LoadingDots";

interface TicketListPopOverProps {
  children: React.ReactNode | ((isOpen: boolean) => React.ReactNode);
  parentPath?: string;
  status?: number;
  title: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const TicketListTitle = ({
  title,
  status,
  onClose,
}: {
  title: string;
  status: number;
  onClose: () => void;
}) => {
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div>
        {title} tickets {status === 1 ? "today" : ""}
      </div>
      <Button
        variant="outlined"
        color="danger"
        className="btn-reset"
        onClick={handleClose}
        icon={<Icons name="close" />}
        aria-label="Close popover"
      />
    </div>
  );
};

const TicketListContent = ({ status, onNavigate }: { status: number, onNavigate: () => void }) => {
  const pathname = usePathname();
  const isTicketsPage = pathname.includes('/tickets');

  return (
    <div className="ticket-list-content">
      <React.Suspense fallback={<LoadingDots text="Loading tickets..." />}>
        <ListOfTicketByStatus status={status} />
      </React.Suspense>
      {!isTicketsPage && (
        <div className="d-flex justify-content-end mt-2">
          <Button 
            type="link" 
            onClick={onNavigate}
            className="d-flex align-items-center"
          >
            Go to tickets page <Icons name="arrow-right" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default function TicketListPopOver({
  children,
  status = 1,
  title = "",
  open,
  onOpenChange,
}: TicketListPopOverProps) {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onOpenChange(true);
  };

  const handleClose = () => {
    onOpenChange(false);
  };

  const handleNavigate = () => {
    router.push("/tickets");
    onOpenChange(false);
  };

  return (
    <div className="ticket-list-popover">
      <Popover
        placement="leftTop"
        title={
          <TicketListTitle
            title={title}
            status={status}
            onClose={handleClose}
          />
        }
        content={<TicketListContent status={status} onNavigate={handleNavigate} />}
        trigger="click"
        arrow={true}
        open={open}
        onOpenChange={(visible) => {
          if (visible) onOpenChange(true);
        }}
      >
        <div onClick={handleClick}>
          {typeof children === "function" ? children(open) : children}
        </div>
      </Popover>
    </div>
  );
}

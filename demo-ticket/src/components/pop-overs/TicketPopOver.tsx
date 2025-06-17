import { Button, Popover } from "antd";
import React from "react";

export default function TicketPopOver() {
  return (
    <Popover
      content={<div>TicketPopOver</div>}
      trigger="click"
    >
      <Button>Click me</Button>
    </Popover>
  );
}
import { Tooltip } from "antd";
import React from "react";

interface DescriptionTooltipProps {
  description: string | React.ReactNode;
}

export default function DescriptionTooltip({
  description,
}: DescriptionTooltipProps) {
  return (
    <Tooltip
      placement="topLeft"
      color="var(--color-bg-white-gray-light)"
      key="var(--color-bg-white-gray-light)"
      title={
        <div className="description-tooltip-content">
          <p className="description-italic-style">{description}</p>
        </div>
      }
    >
      {description}
    </Tooltip>
  );
}

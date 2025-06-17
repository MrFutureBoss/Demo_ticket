"use client";

import { Button, Popover, Tooltip } from "antd";
import Icons from "../icons/Icons";
import React from "react";

const customizeTitle = () => (
  <div className="customize-title">
    <p className="paragraph-bold-style">Customize Table</p>
  </div>
);

const customizeContent = () => (
  <div className="customize-content">
    <div className="customize-content-item">
      <p>Theme colors</p>
      <p>Field templates</p>
      <p>Rules set</p>
      <p>Dev mode</p>
    </div>
  </div>
);

export default function CustomizeTablePopOver() {
  return (
    <Popover
      placement="rightBottom"
      title={customizeTitle}
      content={customizeContent}
      trigger="click"
    >
      <Tooltip title="Customize" placement="bottomLeft">
        <Button
          variant="outlined"
          color="default"
          size="large"
          className="customize-button"
        >
          <Icons name="customize" />
        </Button>
      </Tooltip>
    </Popover>
  );
}

"use client";

import { Button, Popover } from "antd";
import Icons from "../icons/Icons";
import React from "react";

const customizeTitle = () => (
  <div className="customize-title">
    <p className="paragraph-bold-style">Customize Fields</p>
  </div>
);

const customizeContent = () => (
  <div className="customize-content">
    <div className="customize-content-item">
      <div className="left">
        <Icons name="field-template" />
        <p className="paragraph-no-style">Field templates</p>
      </div>
      <Icons name="arrow-right" />
    </div>
    <div className="customize-content-item">
      <div className="left">
        <Icons name="rules-set" />
        <p className="paragraph-no-style">Rules set</p>
      </div>
      <Icons name="arrow-right" />
    </div>
  </div>
);

export default function CustomizeFieldPopOver() {
  return (
    <Popover
      placement="bottomLeft"
      title={customizeTitle}
      content={customizeContent}
      arrow={false}
      trigger="click"
    >
      <Button type="default" className="customize-button">
        <Icons name="customize" />
        <p className="paragraph-no-style">Fields</p>
      </Button>
    </Popover>
  );
}

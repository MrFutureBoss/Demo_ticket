"use client";

import { Button, Splitter } from "antd";
import React from "react";
import { useSplitter } from "@/contexts/SplitterContext";
import SideBar from "./SideBar";

interface BodyProps {
  children: React.ReactNode;
}

export default function Body({ children }: BodyProps) {
  const { isLeftVisible, toggleLeftVisibility } = useSplitter();

  return (
    <div className="body-container">
      {isLeftVisible && (
        <Button className="d-none" onClick={toggleLeftVisibility}>
          Hide Left
        </Button>
      )}
      {isLeftVisible ? (
        <Splitter
          className=""
          style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
        >
          <Splitter.Panel defaultSize="23%" min="23%" max="40%">
            <SideBar />
          </Splitter.Panel>
          <Splitter.Panel>{children}</Splitter.Panel>
        </Splitter>
      ) : (
        <div style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
          {children}
        </div>
      )}
    </div>
  );
}

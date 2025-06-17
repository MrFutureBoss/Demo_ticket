import { Tag } from "antd";
import React from "react";
interface PcTagProps {
  pc_id: number | string;
}

export default function PcTag({ pc_id }: PcTagProps) {

  return (
    pc_id ? (
      <Tag color="blue">
        <p className="paragraph-bold-blue-style">PC-{pc_id}</p>
      </Tag>
    ) : (
      <Tag color="default">
        <p className="paragraph-bold-style">Not Found</p>
      </Tag>
    )
  );
}

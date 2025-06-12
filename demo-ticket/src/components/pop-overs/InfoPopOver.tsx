import { Popover } from "antd";
import Image from "next/image";
import React from "react";

const title = (
  item: {
    title: string;
    pcId: string;
    image: string;
    office: string;
    officeImage: string;
    updatedAt: number;
    status: string;
    statusImage: string;
  },
  image: string
) => {
  return (
    <div className="info_popover_title">
      <div className="d-flex align-items-center">
        <p className="paragraph-bold-style d-flex align-items-center">
          <Image
            src={item.statusImage}
            width={16}
            height={16}
            alt="Office"
            className=""
          />
          &nbsp;{item.status}
        </p>
      </div>
      <div className="d-flex align-items-center gap-2 mt-2">
        <Image src={image} width={24} height={24} alt="Image" className="" />
        <p className="action-bold-style">
          {item.pcId}:&nbsp;{item.title}
        </p>
      </div>
    </div>
  ); 
};

const content = (item: {
  title: string;
  pcId: string;
  image: string;
  office: string;
  officeImage: string;
  updatedAt: number;
  assignee: string;
  assigneeImage: string;
  reporter: string;
  reporterImage: string;
  status: string;
  statusImage: string;
}) => {
  return (
    <div className="info_popover_content">
      <div className="info_popover_content_header">
        <p className="paragraph-bold-style d-flex align-items-center mt-2">
          Assignee: &nbsp;
          <Image
            src={item.assigneeImage}
            width={16}
            height={16}
            alt="Office"
            className="image-rounded"
          />
          &nbsp;{item.assignee}
        </p>
        <p className="paragraph-bold-style d-flex align-items-center text-align-center mt-2">
          Reporter: &nbsp;
          <Image
            src={item.reporterImage}
            width={16}
            height={16}
            alt="Reporter"
            className="image-rounded"
          />
          &nbsp;{item.reporter}
        </p>
      </div>
      <div className="info_popover_content_body d-flex justify-content-end">
        <p className="description-normal-style">
          Updated {item.updatedAt}d ago
        </p>
      </div>
    </div>
  );
};

interface InfoPopOverProps {
  item: {
    title: string;
    pcId: string;
    image: string;
    office: string;
    officeImage: string;
    updatedAt: number;
    assignee: string;
    assigneeImage: string;
    reporter: string;
    reporterImage: string;
    status: string;
    statusImage: string;
  };
  children: React.ReactNode;
  image: string;
}

export default function InfoPopOver({
  item,
  children,
  image,
}: InfoPopOverProps) {
  return (
    <Popover
      placement="bottomRight"
      title={title(item, image)}
      content={content(item)}
      arrow={false}
      trigger="hover"
      className="info_popover"
    >
      <div className="inline-block">{children}</div>
    </Popover>
  );
}

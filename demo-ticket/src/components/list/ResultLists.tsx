import { List, Tag } from "antd";
import Image from "next/image";
import React from "react";
import InfoPopOver from "../pop-overs/InfoPopOver";

interface ResultListsProps {
  data: { title: string; pcId: string, office: string, officeImage: string, updatedAt: number, assignee: string, assigneeImage: string, reporter: string, reporterImage: string, status: string, statusImage: string }[];
  images: string[];
  rounded: boolean;
}

export default function ResultLists({
  data,
  images,
  rounded,
}: ResultListsProps) {
  return (
    <div className="search-result-list">
      <List
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item, index) => (
          <InfoPopOver item={{
            title: item.title,
            pcId: item.pcId,
            image: images[index],
            office: item.office,
            officeImage: item.officeImage,
            updatedAt: item.updatedAt,
            assignee: item.assignee,
            assigneeImage: item.assigneeImage,
            reporter: item.reporter,
            reporterImage: item.reporterImage,
            status: item.status,
            statusImage: item.statusImage
          }} image={images[index]}>
            <List.Item>
              <List.Item.Meta
                className="align-items-center"
                title={
                  <div className="d-flex gap-3 align-items-center">
                   <Image
                      src={images[index]}
                      width={45}
                      height={45}
                      alt="Office"
                      className={rounded ? "image-rounded" : "crop-image"}
                    />
                    <div className="">
                      <p className="paragraph-bold-style"><Tag color="blue">{item.pcId}</Tag>&nbsp;{item.title}</p>
                      <div className="d-flex gap-2">
                        <p className="description-normal-style">                 <Image
                      src={item.officeImage}
                      width={16}
                      height={16}
                      alt="Office"
                      className=""
                    />&nbsp;{item.office}
                    </p>
                        <p className="description-normal-style">•</p>
                        <p className="description-normal-style">Updated {item.updatedAt}d ago</p>
                      </div>
                    </div>
                  </div>
                }
              />
            </List.Item>
          </InfoPopOver>
        )}
      />
    </div>
  );
}

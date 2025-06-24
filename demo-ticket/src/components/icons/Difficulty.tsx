import { Tooltip } from "antd";
import Image from "next/image";
import React from "react";

interface DifficultyProps {
  difficulty: number;
  showTitle?: boolean;
}

export default function Difficulty({
  difficulty,
  showTitle = true,
}: DifficultyProps) {
  const item = renderDifficulty(difficulty);

  function renderDifficulty(difficulty: number) {
    switch (difficulty) {
      case 1:
        return { title: "Lowest", url: "/assets/images/low.svg" };
      case 2:
        return { title: "Low", url: "/assets/images/low.svg" };
      case 3:
        return { title: "Medium", url: "/assets/images/medium.svg" };
      case 4:
        return { title: "High", url: "/assets/images/high.svg" };
      case 5:
        return { title: "Highest", url: "/assets/images/highest.svg" };
      default:
        return { title: "Undefined", url: "/assets/images/kaban.svg" };
    }
  }

  return difficulty ? (
    <Tooltip title={item.title}>
      <div className="d-flex gap-2 align-items-center">
        <Image
          src={item.url}
          width={15}
          height={15}
          quality={50}
          alt={item.title}
        />
        <p className={`paragraph-bold-style ${showTitle ? "" : "d-none"}`}>
          {item.title}
        </p>
      </div>
    </Tooltip>
  ) : (
    <></>
  );
}

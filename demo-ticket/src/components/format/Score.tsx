import React from "react";
interface ScoreProps {
  rating: number;
}

const getColor = (rating: number) => {
  if (rating <= 2) return "text-danger fw-bold";
  if (rating <= 4) return "text-warning fw-bold";
  return "text-success fw-bold";
};

export default function Score({ rating }: ScoreProps) {
  return (
    <div className="d-flex align-items-center gap-1">
      <span className={getColor(rating)}>
        {rating}
      </span>
      <span className="paragraph-bold-style">/5</span>⭐    
      </div>
  );
}

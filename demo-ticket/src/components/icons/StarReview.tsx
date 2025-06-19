import React from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";

interface StarReviewProps {
  score: number;
}

export default function StarReview({ score }: StarReviewProps) {
  // Ensure score is between 0 and 5
  const normalizedScore = Math.min(Math.max(0, score), 5);

  return (
    <div className="d-flex align-items-center gap-1">
      {[...Array(5)].map((_, index) =>
        index < normalizedScore ? (
          <FaStar key={index} className="text-warning" size={20} />
        ) : (
          <CiStar key={index} className="text-secondary" size={25} />
        )
      )}
    </div>
  );
}

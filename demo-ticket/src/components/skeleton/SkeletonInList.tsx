import { Skeleton } from "antd";
import React from "react";

interface SkeletonInListProps {
  loading: boolean;
  children: React.ReactNode;
}

export default function SkeletonInList({
  loading,
  children,
}: SkeletonInListProps) {
  return (
    <Skeleton loading={loading} active avatar>
      {children}
    </Skeleton>
  );
}

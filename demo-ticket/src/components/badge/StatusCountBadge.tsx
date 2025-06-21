import { Badge } from 'antd';
import React from 'react'

interface StatusCountBadgeProps {
  count: number;
}

export default function StatusCountBadge({ count }: StatusCountBadgeProps) {
  const getBadgeColorBaseOnCount = (count: number) => {
    if (count > 0) {
      return 'green';
    }
    return 'gray';
  };

  return (
    <Badge count={count} color={getBadgeColorBaseOnCount(count)} showZero={false} />
  )
}

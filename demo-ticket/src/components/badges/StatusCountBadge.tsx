import React from 'react';
import { Badge } from 'antd';
import { useTicketsByStatus } from '@/hooks/useTicketsByStatus';

interface StatusCountBadgeProps {
  status: number;
}

export default function StatusCountBadge({ status }: StatusCountBadgeProps) {
  const { count, isLoading } = useTicketsByStatus(status);

  return (
    <Badge
      count={isLoading ? '...' : count}
      showZero
      style={{ 
        backgroundColor: count > 0 ? 'var(--color-link-active)' : 'var(--color-body)',
        marginLeft: '8px'
      }}
    />
  );
} 
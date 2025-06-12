import { Tag } from 'antd';
import React from 'react'

interface FilterTagProps {
    children: React.ReactNode;
}

export default function FilterTag({ children }: FilterTagProps) {
  return (
    <Tag color="var(--color-white-gray)" className="active">
        <span>{children}</span>
    </Tag>
  )
}

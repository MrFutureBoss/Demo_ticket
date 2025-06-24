import React from "react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "./TaskCard";
import Status from "@/components/icons/Status";
import type { Ticket } from '@/hooks/interfaces/ticket';

interface ColumnProps {
  status: number;
  tasks: Ticket[];
}

export default function Column({ tasks, status }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: status.toString(),
  });

  return (
    <div className="kanban-column">
      <div className="kanban-column__header">
        <Status status={status} />
      </div>
      <div ref={setNodeRef} className="kanban-column__content">
        <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
          <div className="task-list">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </SortableContext>
      </div>
    </div>
  );
}

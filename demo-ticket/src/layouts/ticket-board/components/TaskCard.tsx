import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Difficulty from "@/components/icons/Difficulty";
import TextAvatar from "@/components/avatars/TextAvatar";
import showLessWord from "@/utilities/format/showLessWord";
import type { Ticket } from '@/hooks/interfaces/ticket';

interface TaskCardProps {
  task: Ticket;
}

export default function TaskCard({ task }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const cardClassName = `task-card ${isDragging ? "task-card--dragging" : ""}`;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cardClassName}
    >
      <div className="task-card__header">
        <div className="left-content">
          <h3 className="task-card__title">{task.title}</h3>
          <div className="d-flex align-items-center justify-content-end">
            <TextAvatar
              fullname={task.fullname}
              employeeId={task.user_id}
              small={true}
            />
          </div>
        </div>
        <span
          className={`task-card__priority task-card__priority--${task.difficulty}`}
        >
          <Difficulty difficulty={task.difficulty} />
        </span>
      </div>
      <p className="task-card__description">{showLessWord(task.content, 100)}</p>
    </div>
  );
}

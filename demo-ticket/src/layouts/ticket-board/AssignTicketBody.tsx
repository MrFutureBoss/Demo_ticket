"use client";

import React, { useState } from "react";
import { Row, Col } from "antd";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Column from "./components/Column";
import TaskCard from "./components/TaskCard";
import useTickets from "@/hooks/useTickets";
// import type { Ticket } from '@/hooks/interfaces/ticket';

// Mock data structure
// interface Task {
//   id: string;
//   title: string;
//   content: string;
//   difficulty: number;
//   user_id: number;
//   fullname: string;
//   status: number;
// }

// const initialTasks: Task[] = [
//   {
//     id: "1",
//     title: "Setup Development Environment",
//     content: "Install necessary tools and dependencies",
//     difficulty: 1,
//     status: 0,
//     user_id: 1,
//     fullname: "John Doe",
//   },
//   {
//     id: "2",
//     title: "Create User Authentication",
//     content: "Implement login and registration",
//     difficulty: 1,
//     status: 2,
//     user_id: 1,
//     fullname: "John Doe",
//   },
//   {
//     id: "3",
//     title: "Design Database Schema",
//     content: "Plan and create database structure",
//     difficulty: 1,
//     status: 2,
//     user_id: 1,
//     fullname: "John Doe",
//   },
//   {
//     id: "4",
//     title: "Write API Documentation",
//     content: "Document all API endpoints",
//     difficulty: 1,
//     status: 0,
//     user_id: 1,
//     fullname: "John Doe",
//   },
//   {
//     id: "5",
//     title: "Unit Testing",
//     content: "Write and run unit tests",
//     difficulty: 1,
//     status: 3,
//     user_id: 1,
//     fullname: "John Doe",
//   },
// ];

export default function AssignTicketBody() {
  const { tickets, isLoading } = useTickets({ type: 'IT' });
  const [activeId, setActiveId] = useState<number | null>(null);

  // Configure sensors for drag detection
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Get active task being dragged
  const activeTask = tickets.find((task) => task.id === activeId);

  // Filter tasks by status
  const getTasks = (status: number) => {
    return tickets.filter((task) => task.status === status);
  };

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(Number(active.id));
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const activeTask = tickets.find((task) => task.id === Number(active.id));
    const newStatus = Number(over.id); // Column's id is the status

    if (!activeTask) {
      setActiveId(null);
      return;
    }

    // TODO: Call API to update task status
    console.log('Update task:', activeTask.id, 'to status:', newStatus);

    setActiveId(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="kanban-container">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Column tasks={getTasks(1)} status={1} />
          </Col>
          <Col span={6}>
            <Column tasks={getTasks(2)} status={2} />
          </Col>
          <Col span={6}>
            <Column tasks={getTasks(3)} status={3} />
          </Col>
          <Col span={6}>
            <Column tasks={getTasks(6)} status={6} />
          </Col>
        </Row>

        <DragOverlay>
          {activeId && activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

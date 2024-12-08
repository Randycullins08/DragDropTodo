import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import type { Task, Column as ColumnType, TaskStatus } from "./types";
import Column from "./components/Column";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do" },
  { id: "IN_PROGRESS", title: "In Progress" },
  { id: "DONE", title: "Done" },
];

const INITIAL_TASKS: Task[] = [
  {
    id: "1",
    title: "Research Project",
    description: "Gather requirements and create initial documentation",
    status: "TODO",
  },
  {
    id: "2",
    title: "Design System",
    description: "Create component library and design tokens",
    status: "TODO",
  },
  {
    id: "3",
    title: "API Integration",
    description: "Implement REST API endpoints",
    status: "IN_PROGRESS",
  },
  {
    id: "4",
    title: "Testing",
    description: "Write unit tests for core functionality",
    status: "DONE",
  },
];

export default function App() {
  const [tasksByStatus, setTasksByStatus] = useState<
    Record<TaskStatus, Task[]>
  >({
    TODO: INITIAL_TASKS.filter((task) => task.status === "TODO"),
    IN_PROGRESS: INITIAL_TASKS.filter((task) => task.status === "IN_PROGRESS"),
    DONE: INITIAL_TASKS.filter((task) => task.status === "DONE"),
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasksByStatus((prev) => {
      // Find the current status of the task
      const currentStatus = (Object.keys(prev) as TaskStatus[]).find((status) =>
        prev[status].some((task) => task.id === taskId)
      );

      // If the task is already in the target status or status not found, return previous state
      if (!currentStatus || currentStatus === newStatus) {
        return prev;
      }

      // Extract the task to be moved
      const taskToMove = prev[currentStatus].find((task) => task.id === taskId);

      if (!taskToMove) {
        return prev; // Fallback safety check
      }

      // Create the updated state
      return {
        ...prev,
        [currentStatus]: prev[currentStatus].filter(
          (task) => task.id !== taskId
        ), // Remove task from old status
        [newStatus]: [...prev[newStatus], { ...taskToMove, status: newStatus }], // Add task to new status
      };
    });
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-grayscale-900 p-4 text-white">
      <div className="flex gap-8">
        <DndContext onDragEnd={handleDragEnd}>
          {COLUMNS.map((column) => {
            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasksByStatus[column.id]}
              />
            );
          })}
        </DndContext>
      </div>
    </div>
  );
}

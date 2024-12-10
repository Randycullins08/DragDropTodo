import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import type { Task } from "./types";
import { INITIAL_TASKS } from "./data";
import Column from "./components/Column";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-grayscale-900 p-4 text-white">
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-8">
          <Column type="TODO" tasks={tasks} />
          <Column type="IN_PROGRESS" tasks={tasks} />
          <Column type="DONE" tasks={tasks} />
        </div>
      </DndContext>
    </div>
  );
}

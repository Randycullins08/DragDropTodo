import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import TaskForm from "./components/TaskForm";
import Column from "./components/Column";

import { INITIAL_TASKS } from "./data";
import type { Task } from "./types";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  function handleAddTask(title: string, description: string) {
    const newTask: Task = {
      id: "5",
      status: "TODO",
      title,
      description,
    };

    setTasks((prev) => [...prev, newTask]);
  }

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
    <div className="min-h-screen flex flex-col justify-start items-center bg-grayscale-900 p-4 text-white">
      <TaskForm handleAddTask={handleAddTask} />

      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex gap-8 justify-center w-full mt-8">
          <Column type="TODO" tasks={tasks} />
          <Column type="IN_PROGRESS" tasks={tasks} />
          <Column type="DONE" tasks={tasks} />
        </div>
      </DndContext>
    </div>
  );
}

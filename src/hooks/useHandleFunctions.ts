import { DragEndEvent } from "@dnd-kit/core";
import { useState } from "react";
import { v4 } from "uuid";

import { INITIAL_TASKS } from "../data";
import { Task, UseHandleFunctions } from "../types";

export const useHandleFunctions = (): UseHandleFunctions => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  function handleAddTask(title: string, description: string) {
    const newId = v4();

    const newTask: Task = {
      id: newId,
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

  return { tasks, handleAddTask, handleDragEnd };
};

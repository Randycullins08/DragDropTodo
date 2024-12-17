import { useState } from "react";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

import type { Task } from "./types";
import { INITIAL_TASKS } from "./data";
import Column from "./components/Column";

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  function handleChange(e: any) {
    const { name, value } = e.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onSubmit(e: any) {
    e.preventDefault();

    const newTask: Task = {
      id: "5",
      status: "TODO",
      title: input.title,
      description: input.description,
    };

    setTasks((prev) => [...prev, newTask]);
    setInput({
      title: "",
      description: "",
    });
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
    <div className="min-h-screen flex justify-center items-center bg-grayscale-900 p-4 text-white">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={input.title}
          onChange={handleChange}
        />

        <input
          type="text"
          name="description"
          placeholder="Description"
          value={input.description}
          onChange={handleChange}
        />
        <button>Submit Task</button>
      </form>

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

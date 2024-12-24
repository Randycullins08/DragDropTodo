import { DndContext } from "@dnd-kit/core";

import TaskForm from "./components/TaskForm";
import Column from "./components/Column";
import { useHandleFunctions } from "./hooks/useHandleFunctions";

export default function App() {
  const { tasks, handleAddTask, handleDragEnd } = useHandleFunctions();

  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-grayscale-900 p-4 text-white">
      <h1 className="m-4 items-center">Drag And Drop TODO</h1>
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

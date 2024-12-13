import { useDroppable } from "@dnd-kit/core";

import { ColumnProps } from "../types";
import TaskCard from "./TaskCard";
import { COLUMN_TITLES } from "../data";

export default function Column({ type, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: type,
  });

  const filteredTasks = tasks.filter((task) => task.status === type);

  return (
    <div className="flex w-80 flex-col rounded-lg bg-grayscale-800 p-4">
      <h2 className="mb-4 text-xl font-semibold text-primary-500">
        {COLUMN_TITLES[type]}
      </h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {filteredTasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
}

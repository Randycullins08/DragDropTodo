import { useDroppable } from "@dnd-kit/core";
import { Column as ColumnType, Task } from "../types";
import TaskCard from "./TaskCard";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
};

export default function Column({ column, tasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <div className="flex w-80 flex-col rounded-lg bg-grayscale-800 p-4">
      <h2 className="mb-4 text-xl font-semibold text-primary-500">
        {column.title}
      </h2>
      <div ref={setNodeRef} className="flex flex-1 flex-col gap-4">
        {tasks.map((task) => {
          return <TaskCard key={task.id} task={task} />;
        })}
      </div>
    </div>
  );
}

import React from "react";

interface TaskColumnProps {
  title: string;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ title }) => {
  return (
    <div className="bg-white shadow rounded-md p-4">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="min-h-[200px]">{/* Tasks will go here */}</div>
    </div>
  );
};

export default TaskColumn;

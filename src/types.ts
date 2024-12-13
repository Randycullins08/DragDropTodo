export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type Task = {
  id: string;
  status: TaskStatus;
  title: string;
  description: string;
};

export type Column = {
  id: TaskStatus;
  title: string;
};

export type ColumnProps = {
  type: TaskStatus;
  tasks: Task[];
};

export type TaskCardProps = {
  task: Task;
};

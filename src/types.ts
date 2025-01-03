import { DragEndEvent } from "@dnd-kit/core";
import { FormEvent } from "react";

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

export type TaskFormProps = {
  handleAddTask: (title: string, description: string) => void;
};

export interface FormProps extends React.HTMLProps<HTMLFormElement> {
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export interface UseHandleFunctions {
  tasks: Task[];
  handleAddTask: (title: string, description: string) => void;
  handleDragEnd: (event: DragEndEvent) => void;
}

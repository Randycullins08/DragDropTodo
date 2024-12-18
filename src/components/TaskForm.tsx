import { ChangeEvent, FormEvent, useState } from "react";

import { TaskFormProps } from "../types";

export default function TaskForm({ handleAddTask }: TaskFormProps) {
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    handleAddTask(input.title, input.description);

    setInput({
      title: "",
      description: "",
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={input.title}
        required
        onChange={handleChange}
      />

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={input.description}
        required
        onChange={handleChange}
      />
      <button>Submit Task</button>
    </form>
  );
}

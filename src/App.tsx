import TaskColumn from "./components/TaskColumn";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">
        Drag And Drop Application
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <TaskColumn title="Todo" />
        <TaskColumn title="In Progress" />
        <TaskColumn title="Completed" />
      </div>
    </div>
  );
}

export default App;

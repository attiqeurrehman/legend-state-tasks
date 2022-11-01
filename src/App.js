import { useRef } from "react";
import { observable } from "@legendapp/state";
import AddTask from "./AddTask.js";
import TaskList from "./TaskList.js";

const observableTasks = observable({
  tasks: [
    { id: 0, text: "Visit Kafka Museum", done: true },
    { id: 1, text: "Watch a puppet show", done: false },
    { id: 2, text: "Lennon Wall pic", done: false }
  ]
});

let nextId = 3;

export default function TaskApp() {
  const tasks = observableTasks.tasks;
  function handleAddTask(text) {
    tasks.push({
      type: "added",
      id: nextId++,
      text: text
    });
  }

  function handleChangeTask(taskIndex, task) {
    tasks.splice(taskIndex, 1, task);
  }

  function handleToggleTask(taskIndex) {
    tasks[taskIndex].done.set((d) => !d);
  }

  function handleChangeTextTask(taskIndex, text) {
    tasks[taskIndex].text.set((t) => text);
  }

  function handleDeleteTask(taskIndex) {
    tasks.splice(taskIndex, 1);
  }

  return (
    <>
      <h1>Prague itinerary {++useRef(0).current}</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onChangeTextTask={handleChangeTextTask}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

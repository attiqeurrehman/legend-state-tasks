import { useState } from "react";
import { getObservableIndex } from "@legendapp/state";
import { For, useSelector } from "@legendapp/state/react";

export default function TaskList({
  tasks,
  onChangeTask,
  onToggleTask,
  onChangeTextTask,
  onDeleteTask
}) {
  return (
    <ul>
      <For each={tasks}>
        {(task) => (
          <li key={task.id.peek()}>
            <Task
              task={task}
              onChange={onChangeTextTask}
              onToggle={onToggleTask}
              onDelete={onDeleteTask}
            />
          </li>
        )}
      </For>
    </ul>
  );
}

function Task({ task, onChange, onToggle, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const text = useSelector(task.text);
  const isDone = useSelector(task.done);

  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          value={text}
          onChange={(e) => {
            onChange(getObservableIndex(task), e.target.value);
          }}
        />
        <button onClick={() => setIsEditing(false)}>Save</button>
      </>
    );
  } else {
    taskContent = (
      <>
        {text}
        <button onClick={() => setIsEditing(true)}>Edit</button>
      </>
    );
  }
  return (
    <label>
      <input
        type="checkbox"
        checked={isDone}
        onChange={(e) => {
          onToggle(getObservableIndex(task));
        }}
      />
      {taskContent}
      <button onClick={() => onDelete(getObservableIndex(task))}>Delete</button>
    </label>
  );
}

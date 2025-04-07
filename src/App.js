import React, { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetch('/api/tasks')
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
  
    const res = await fetch('http://localhost:4000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    })
  
    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setTitle('');
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>📋 Task Tracker</h1>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>✅ {task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
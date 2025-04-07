import React, { useEffect, useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  // Uygulama yüklendiğinde API'den görevleri çek
  useEffect(() => {
    fetch('/api/tasks')
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error('Error fetching tasks:', err));
  }, []);

  // Yeni görev ekleme fonksiyonu
  const addTask = async () => {
    if (!title.trim()) return;

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        throw new Error('Error adding task');
      }

      const newTask = await res.json();
      setTasks([...tasks, newTask]);
      setTitle('');
    } catch (error) {
      console.error('Add task error:', error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📋 Task Tracker</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task"
      />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>✅ {task.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
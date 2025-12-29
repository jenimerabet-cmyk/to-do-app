import { useState, useEffect } from 'react';

const API = 'http://localhost:5000/api';

export default function App() {
  // Register state
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Token and tasks
  const [token, setToken] = useState('');
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) setToken(savedToken);
  }, []);

  const register = async () => {
    const res = await fetch(`${API}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: regUsername, email: regEmail, password: regPassword }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert('Registration failed: ' + (data.message || res.status));
      return;
    }

    alert('Registered successfully!');
    setRegUsername('');
    setRegEmail('');
    setRegPassword('');
  };

  const login = async () => {
    const res = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: loginEmail, password: loginPassword }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert('Login failed: ' + (data.message || res.status));
      return;
    }

    const data = await res.json();
    setToken(data.token);
    localStorage.setItem('token', data.token);
    alert('Logged in successfully!');
    setLoginEmail('');
    setLoginPassword('');
  };

  const getTasks = async () => {
    const res = await fetch(`${API}/tasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      alert('Failed to load tasks. Not authorized.');
      return;
    }

    const data = await res.json();
    setTasks(Array.isArray(data) ? data : []);
  };

  const createTask = async () => {
    if (!title) return alert('Title is required');

    const res = await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title }),
    });

    if (!res.ok) {
      alert('Failed to create task. Not authorized.');
      return;
    }

    setTitle('');
    getTasks();
  };

  const deleteTask = async (id) => {
    const res = await fetch(`${API}/tasks/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      alert('Failed to delete task. Not authorized.');
      return;
    }

    getTasks();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Todo App</h1>

      <h2>Register</h2>
      <input placeholder="Username" value={regUsername} onChange={(e) => setRegUsername(e.target.value)} />
      <br />
      <input placeholder="Email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} />
      <br />
      <button onClick={register}>Register</button>

      <h2>Login</h2>
      <input placeholder="Email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
      <br />
      <input type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
      <br />
      <button onClick={login}>Login</button>

      <h2>Create Task</h2>
      <input placeholder="Task title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <br />
      <button onClick={createTask}>Add Task</button>

      <h2>Tasks</h2>
      <button onClick={getTasks}>Load Tasks</button>

      <ul>
        {tasks.map((t) => (
          <li key={t._id}>
            {t.title}
            <button onClick={() => deleteTask(t._id)} style={{ marginLeft: 10 }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

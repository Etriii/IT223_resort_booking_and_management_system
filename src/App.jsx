// import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useState, useEffect } from 'react';
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [status, setStatus] = useState("Checking...");

  useEffect(() => {
    //  fetch("http://localhost:8000/connection_db_test.php")
    fetch("http://localhost:8000/?controller=User&action=getUsers")
      .then((response) => response.json())
      .then((data) => setStatus(data.message))
      .catch(() => setStatus("Error connecting to database"));
  }, []);

  return (
    <>
      <p>Status: {status}</p>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

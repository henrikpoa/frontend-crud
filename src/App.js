import { useEffect, useState } from 'react';
import './App.css';


const url = 'http://localhost:8080/users';

function App() {
  const [users, setUsers] = useState([]);

  // 1 - resgatando dados  
  useEffect(() =>{
    async function fetchData() {
      const res = await fetch(url);

      const data = await res.json();

      setUsers(data);
    };

    fetchData();
  }, []);
  
  return (
    <div className="App">
      <h1>Lista de Usuários</h1>
      <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.id} - {user.name}
        </li>
      ))}
      </ul>
    </div>
  );
};

export default App;

import { useEffect, useState } from 'react';
import './App.css';


const url = 'http://localhost:8080/users';

function App() {
  const [users, setUsers] = useState([]);

  const[name, setName] = useState("");
  const[email, setEmail] = useState("");
  const[password, setPassword] = useState("");
  const[phone, setPhone] = useState("");

  // 1 - resgatando dados  
  useEffect(() =>{
    async function fetchData() {
      const res = await fetch(url);

      const data = await res.json();

      setUsers(data);
    };

    fetchData();
  }, []);
  
  // add users
  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      name, email, password, phone,
    };

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user),
    });

    const addedUser = await res.json();

    setUsers((prevUsers) => [...prevUsers, addedUser]);

    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
  };

  return (
    <div className="App">
      <div className='add-user'><h1>Criar Usuários: </h1>
        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" value={name} name='name' onChange={(e)=> setName(e.target.value)}/>
          </label>
          <label>
            Email:
            <input type="email" value={email} name='email' onChange={(e)=> setEmail(e.target.value)}/>
          </label>
          <label>
            Password:
            <input type="current-password" value={password} name='password' onChange={(e)=> setPassword(e.target.value)}/>
          </label>
          <label>
            Telefone:
            <input type="number" value={phone} name='phone' onChange={(e)=> setPhone(e.target.value)}/>
          </label>
          <input type="submit" value="Criar" />
        </form>
      </div>
      <h1>Lista de Usuários</h1>
      <ul>
      {users.map((user) => (
        <li key={user.id}>
          {user.id} - {user.name} - {user.email} - {user.phone}
        </li>
      ))}
      </ul>
    </div>
  );
};

export default App;

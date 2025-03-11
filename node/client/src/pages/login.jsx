import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {

      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const navigate = useNavigate();

      const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/api/user/login', {email, password}, { withCredentials: true})
          console.log(response);
          localStorage.setItem('token', response.data.token)
          console.log(response.data.token);
          
          navigate('/dashboard')
        } catch (error) {
          console.error('Erreur de connexion', error);
          
          
        }
      }

      
    

    return (
      <div>
        <h1>Connexion</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Se connecter</button>
        </form>
      </div>
    );
  };
  



export default Login

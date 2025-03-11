import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const [email, setEmail] = useState('')
    const [pseudo, setPseudo] = useState('')
    const [password, setPassword] = useState('')
      const navigate = useNavigate();

      const handleSignup = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:3000/api/user/register', {pseudo, email, password}, { withCredentials: true })
          localStorage.setItem('token', response.data.token)          
          navigate('/dashboard')
        } catch (error) {
          console.error('Erreur de connexion', error);
          
          
        }
      }
                                                       

      
    

    return (
      <div>
        <h1>Connexion</h1>
        <form onSubmit={handleSignup}>
        <input
            type="text"
            placeholder="Pseudo"
            value={pseudo}
            onChange={(e) => setPseudo(e.target.value)}
          />          <input
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
          <button type="submit">S'incrire</button>
        </form>
      </div>
    );
  };


export default Signup

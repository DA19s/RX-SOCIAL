import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const chat = () => {


const [user, setUser] = useState([])
// const [newItem, setNewItem] = useState('')
   const navigate = useNavigate();
 


   useEffect(() => {
     axios.get('http://localhost:3000/api/chat/getUserChat', { withCredentials: true })
     .then(res => {
     setUser(res.data)
     
   })
  
   .catch(err => console.error("Erreur lors de l'appel API :", err))
}, [])

const handleUserClick = async (posterId) => {

    navigate(`/conv/${posterId}`);  

}; 

return (
    <div>
    <h1>Messages</h1>
    <ul>
      {user.map(user => (
        <li key={user._id}>
          <button onClick={() => handleUserClick(user.lastPseudo)} className="follow-button">{user.lastPseudo}:  {user.lastMessage}</button>
        </li>
      ))}
    </ul>

    </div>
)

}

export default chat
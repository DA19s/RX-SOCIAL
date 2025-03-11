import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const conv = () => {


//const [user, setUser] = useState([])
const [conv, setConv] = useState([])
// const [newItem, setNewItem] = useState('')
   const navigate = useNavigate();
 
    const { posterId } = useParams();


   useEffect(() => {
     axios.get(`http://localhost:3000/api/chat/conv/${posterId}`, { withCredentials: true })

     .then(res => {
        setConv(res.data)
     
   })
  
   .catch(err => console.error("Erreur lors de l'appel API :", err))
}, [])

const handleUserClick = async () => {

    try {
    
        const text = prompt(("Ajouter un com"));
       
        if (!text) return;

        const response = await axios.post(`http://localhost:3000/api/chat/sendMessage`, { receiverId: posterId, content: text }, { withCredentials: true });
  
        console.log('messagé:', response.data);
  
       } catch (error) {
           console.error('Erreur:', error);
       }
}; 

return (
    <div>
    <h1>Utilisateurs</h1>
    <ul>
      {conv.map(conv => (
        <li key={conv._id}>
          <button onClick={() => handleUserClick()} className="chat-button">{conv.senderPseudo}: {conv.content}</button>
        </li>
      ))}
    </ul>

    </div>
)

}

export default conv
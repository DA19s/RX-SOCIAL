import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const token = localStorage.getItem('token');

  
  
  const [comment, setComment] = useState([])
  const [items, setItems] = useState([])
  const [user, setUser] = useState([])
 // const [newItem, setNewItem] = useState('')
    const navigate = useNavigate();
  
    useEffect(() => {
      axios.get('http://localhost:3000/api/post')
      .then(res => {
      setItems(res.data)
      
    })
  
      .catch(err => console.error("Erreur lors de l'appel API :", err))
    }, [])
    
    useEffect(() => {
      axios.get('http://localhost:3000/api/user')
      .then(res => {
      setUser(res.data)
      
    })
  
      .catch(err => console.error("Erreur lors de l'appel API :", err))
    }, [])



    const handlePostClick = () => {
        navigate('/create-post')
    }
  

    const handleCommentClick = async (postId) => {

      const text = prompt(("Ajouter un com"));
       
      if (!text) return;
 
       try {
           const response = await axios.patch(`http://localhost:3000/api/post/comment-post/${postId}`, { text }, { withCredentials: true });
 
           console.log('Post créé:', response.data);
           console.log(token);
           
           navigate('/dashboard');
       } catch (error) {
           console.error('Erreur lors de la création du post:', error);
       }
  };

  const handleUserClick = async (posterId) => {

    navigate(`/user/${posterId}`);  

}; 

const handleChatClick = async () => {

  navigate(`/chat/`);  

};


  
    return (

      <div>     

        <button onClick={() => handleChatClick()} className="chat-button">chat</button>


        <h1>Utilisateurs</h1>
        <ul>
          {user.map(user => (
            <li key={user._id}>
              <button onClick={() => handleUserClick(user._id)} className="follow-button">{user.pseudo}</button>
            </li>
          ))}
        </ul>


        <h1>Posts</h1>
        <ul>
          {items.map(post => (
            <li key={post._id}>
              <p><strong>{post.posterId}</strong>: {post.message}  <button onClick={() => handleCommentClick(post._id)} className="comment-button">
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4v-16a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
  </svg>
</button></p>
              <h4>Commentaires</h4>
              
              {post.comments?.length > 0 ? (
                post.comments.map(comment => (
                  <p key={comment._id}><strong>{comment.commenterPseudo}</strong>: {comment.text}</p>
                ))
              ) : (
                <p>Aucun commentaire</p>
              )}
            </li>
          ))}
        </ul>
        <button onClick={handlePostClick}>Poster</button>
      </div>
    );

}

export default Dashboard
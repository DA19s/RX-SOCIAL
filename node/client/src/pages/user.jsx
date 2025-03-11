import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom';

const User = () => {
  const token = localStorage.getItem('token');

  const [comment, setComment] = useState([])
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState('')
    const navigate = useNavigate();

    const { posterId } = useParams();

    useEffect(() => {
      axios.get(`http://localhost:3000/api/post/${posterId}`, { withCredentials: true })
      .then(res => {
      setItems(res.data)
      
    })
  
      .catch(err => console.error("Erreur lors de l'appel API :", err))
    }, [])


    const handleCommentClick = async (postId) => {

      const text = prompt(("Ajouter un com"));
       
      if (!text) return;
 
       try {
        const response = await axios.patch(`http://localhost:3000/api/post/comment-post/${postId}`, { text }, { withCredentials: true });
 
           console.log('Post créé:', response.data);
       } catch (error) {
           console.error('Erreur lors de la création du post:', error);
       }
  };

  const handleFollowClick = async (posterId) => {

     try {
      const response = await axios.patch(`http://localhost:3000/api/user/follow/${posterId}`, {}, { withCredentials: true });

      console.log('followé:', response.data);

     } catch (error) {
         console.error('Erreur:', error);
     }
};



    return (

        <div>
  
          <button onClick={() => handleFollowClick(posterId)} className="follow<-button">Follow</button>

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
        </div>
      );
};

export default User;

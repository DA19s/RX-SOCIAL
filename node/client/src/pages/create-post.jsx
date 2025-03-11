import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            const response = await axios.post('http://localhost:3000/api/post', { message }, { withCredentials: true });

            console.log('Post créé:', response.data);
            navigate('/dashboard');
        } catch (error) {
            console.error('Erreur lors de la création du post:', error);
        }
    };

    return (
        <div>
            <h1>Créer un Post</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Écrivez votre message ici"
                />
                <button type="submit">Publier</button>
            </form>
        </div>
    );
};

export default CreatePost;

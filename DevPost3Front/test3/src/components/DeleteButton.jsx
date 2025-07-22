import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteArticle } from '../services/articles';
import './DeleteButton.css';

const DeleteButton = ({ articleId, onSuccess }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (!window.confirm('Вы уверены, что хотите удалить эту статью?')) return;
    
    setIsDeleting(true);
    setError(null);

    try {
      await deleteArticle(articleId);
      if (onSuccess) onSuccess();
      navigate('/articles'); // Перенаправление после удаления
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="delete-button-container">
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`delete-button ${isDeleting ? 'deleting' : ''}`}
      >
        {isDeleting ? 'Удаление...' : 'Удалить'}
      </button>
      {error && <p className="delete-error">{error}</p>}
    </div>
  );
};

export default DeleteButton;
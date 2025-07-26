import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createArticle } from '../services/articles';
import './CreateArticle.css';

const CreateArticle = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setValidationErrors({});

    try {
      const articleData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        author: formData.author.trim() || null
      };

      await createArticle(articleData);
      navigate('/articles');
    } catch (err) {
      console.error('Create article error:', err);
      
      if (err.response?.status === 400) {
        try {
          const errorData = await err.response.json();
          if (errorData.Errors) {
            setValidationErrors(errorData.Errors);
          }
          setError(errorData.Message || 'Ошибка валидации');
        } catch (parseError) {
          setError('Ошибка при обработке ответа сервера');
        }
      } else {
        setError(err.message || 'Произошла ошибка при создании статьи');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-article-container">
      <h1>Создать новую статью</h1>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="create-article-form">
        <div className="form-group">
          <label htmlFor="title">Заголовок *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            disabled={isSubmitting}
          />
          {validationErrors.Title && (
            <div className="validation-error">
              {validationErrors.Title.join(', ')}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Содержание *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows={10}
            disabled={isSubmitting}
          />
          {validationErrors.Content && (
            <div className="validation-error">
              {validationErrors.Content.join(', ')}
            </div>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Автор</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          {validationErrors.Author && (
            <div className="validation-error">
              {validationErrors.Author.join(', ')}
            </div>
          )}
        </div>
        
        <div className="form-actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className="submit-button"
          >
            {isSubmitting ? 'Создание...' : 'Создать статью'}
          </button>
          
          <button
            type="button"
            onClick={() => navigate('/articles')}
            disabled={isSubmitting}
            className="cancel-button"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateArticle;
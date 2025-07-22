import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateArticle.css';

function CreateArticle() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '',
    // image оставлено для будущей реализации, но не используется сейчас
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    setError('');

    try {
      // Подготовка данных для отправки (без изображения)
      const articleData = {
        title: formData.title,
        content: formData.content,
        author: formData.author
        // image пока не включаем
      };

      const response = await fetch('https://localhost:4000/articles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(articleData),
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании статьи');
      }

      navigate('/articles');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-article-container">
      <h2>Создать новую статью</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Заголовок*:</label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Содержание*:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Автор*:</label>
          <input
            id="author"
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
            required
          />
        </div>

        {/* Поле для изображения (закомментировано для будущего использования) */}
        {/*
        <div className="form-group">
          <label htmlFor="image">Изображение:</label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <p className="hint">Необязательное поле</p>
        </div>
        */}

        <div className="form-buttons">
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Создание...' : 'Создать статью'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/articles')}
            style={{ marginLeft: '12px' }}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateArticle;
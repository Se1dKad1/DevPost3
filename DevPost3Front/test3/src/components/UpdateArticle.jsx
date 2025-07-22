import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleById, updateArticle } from '../services/articles';
import './UpdateArticle.css';

const UpdateArticle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: '', // Добавлено поле автора
    imageUrl: ''
  });
  const [isLoading, setIsLoading] = useState({
    fetch: true,
    submit: false
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(id);
        setFormData({
          title: data.title,
          content: data.content,
          author: data.author || '', // Получаем автора с сервера
          imageUrl: data.imageUrl || ''
        });
      } catch (err) {
        setError(`Не удалось загрузить статью: ${err.message}`);
        console.error('Ошибка загрузки:', err);
      } finally {
        setIsLoading(prev => ({ ...prev, fetch: false }));
      }
    };
    
    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(prev => ({ ...prev, submit: true }));
  setError(null);

  try {
    const payload = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      author: formData.author.trim() || null,
      ...(formData.imageUrl.trim() && { imageUrl: formData.imageUrl.trim() })
    };

    // Валидация
    if (!payload.title || payload.title.length < 50) {
      throw new Error('Заголовок должен содержать минимум 50 символов');
    }

    if (!payload.content) {
      throw new Error('Содержание обязательно для заполнения');
    }

    const result = await updateArticle(id, payload);
    
    // Обработка успешного ответа
    if (result?.success || !result) {
      navigate(`/articles/${id}`, {
        state: { 
          success: true,
          message: 'Статья успешно обновлена'
        },
        replace: true
      });
    } else {
      // Если сервер вернул обновленную статью
      navigate(`/articles/${result.id || id}`, {
        state: { 
          success: true,
          article: result
        },
        replace: true
      });
    }
  } catch (err) {
    setError(err.message || 'Ошибка при сохранении изменений');
    console.error('Ошибка сохранения:', err);
  } finally {
    setIsLoading(prev => ({ ...prev, submit: false }));
  }
};

  if (isLoading.fetch) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Загрузка статьи...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Ошибка</h2>
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="update-article-container">
      <h1>Редактировать статью</h1>
      
      <form onSubmit={handleSubmit} className="update-article-form">
        <div className="form-group">
          <label htmlFor="title">Заголовок *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            disabled={isLoading.submit}
            minLength={50}
            maxLength={150}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="content">Содержание *</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            disabled={isLoading.submit}
            minLength={10}
            required
            rows={10}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="author">Автор</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            disabled={isLoading.submit}
            placeholder="Введите имя автора"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="imageUrl">URL изображения</label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            disabled={isLoading.submit}
            placeholder="https://example.com/image.jpg"
            pattern="https?://.+"
          />
          <small className="hint">Оставьте пустым, чтобы удалить изображение</small>
        </div>
        
        <div className="form-actions">
          <button
            type="submit"
            disabled={isLoading.submit}
            className={`submit-button ${isLoading.submit ? 'loading' : ''}`}
          >
            {isLoading.submit ? (
              <>
                <span className="spinner"></span>
                Сохранение...
              </>
            ) : (
              'Сохранить изменения'
            )}
          </button>
          
          <button
            type="button"
            onClick={() => navigate(-1)}
            disabled={isLoading.submit}
            className="cancel-button"
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateArticle;
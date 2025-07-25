import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleById, deleteArticle } from '../services/articles';
import { Link } from 'react-router-dom';
import './ReadArticle.css';

function ReadArticle() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const data = await getArticleById(id);
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Вы уверены, что хотите удалить эту статью?')) return;
    
    setIsDeleting(true);
    try {
      await deleteArticle(id);
      navigate('/articles');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) return <div className="loading">Загрузка статьи...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;
  if (!article) return <div>Статья не найдена</div>;

  return (
    <div className="article-page">
      {/* Кнопка "Назад" */}
      <button 
        className="back-button-fixed"
        onClick={() => navigate('/articles')}
      >
        ← Назад к списку
      </button>

      {/* Кнопки управления */}
      <div className="article-controls">
        <Link 
          to={`/articles/${id}/edit`}
          className="action-button edit-button"
        >
          Редактировать
        </Link>
        <button
          onClick={handleDelete}
          disabled={isDeleting}
          className={`action-button delete-button ${isDeleting ? 'deleting' : ''}`}
        >
          {isDeleting ? 'Удаление...' : 'Удалить'}
        </button>
      </div>

      {/* Контент статьи */}
      <div className="article-content-wrapper">
        <h1 className="article-title">{article.title}</h1>
        
        <div className="article-meta">
          <span>Автор: {article.author}</span>
          <span>Дата: {new Date(article.publishedDate).toLocaleDateString('ru-RU')}</span>
        </div>
        
        <div className="article-content">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ReadArticle;
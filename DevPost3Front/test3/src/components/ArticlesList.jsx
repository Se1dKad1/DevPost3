import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getArticles } from "../services/articles";
import "./ArticlesList.css";

function ArticlesList() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) return <div className="loading">Загрузка...</div>;
  if (error) return <div className="error">Ошибка: {error}</div>;

  return (
    <div className="articles-layout">
      <header className="articles-header">
        <h1>Статьи</h1>
        <Link to="/articles/create" className="create-article-button">
          Написать статью
        </Link>
      </header>

      <div className="articles-container">
        {articles.map(article => (
          <article 
            key={article.id} 
            className="article-card"
            onClick={() => navigate(`/articles/${article.id}`)}
          >
            <div className="article-image-container">
              {article.image ? (
                <img 
                  src={article.image} 
                  alt={article.title || "Изображение статьи"} 
                  loading="lazy"
                />
              ) : (
                <div className="image-placeholder" />
              )}
            </div>

            <div className="article-text-content">
              <h2 className="article-title" title={article.title}>
                {article.title || "Без названия"}
              </h2>

              <div className="article-author">
                {article.author || "Автор не указан"}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default ArticlesList;

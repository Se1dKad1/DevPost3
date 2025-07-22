import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ArticlesList from './components/ArticlesList';
import ReadArticle from './components/ReadArticle';
import CreateArticle from './components/CreateArticle';
import UpdateArticle from './components/UpdateArticle';
import DeleteButton from './components/DeleteButton';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/articles" replace />} />
        <Route path="/articles" element={<ArticlesList />} />
        <Route path="/articles/:id" element={<ReadArticle />} />
        <Route path="/articles/create" element={<CreateArticle />} />
        <Route path="/articles/:id/edit" element={<UpdateArticle />} />
        
        {/* Новый маршрут для страницы подтверждения удаления */}
        <Route 
          path="/articles/:id/delete" 
          element={
            <div className="delete-page">
              <h2>Удаление статьи</h2>
              <DeleteButton />
            </div>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
using DevPost3.Models;
using DevPost3.Repositories.Interfaces;
using DevPost3.Services.Interfaces;
using System.Runtime.InteropServices;

namespace DevPost3.Services.Implementations
{
    public class ArticleService : IArticleService
    {
        private readonly IArticleRepository _articleRepository;

        public ArticleService(IArticleRepository articleRepository)
        {
            _articleRepository = articleRepository;
        }

        public void Create(Article article)
        {
            _articleRepository.Create(article);
        }

        public void Update(Article article)
        {
            _articleRepository.Update(article);
        }

        public void Delete(int id)
        {
            _articleRepository.Delete(id);
        }

        public IEnumerable<Article> GetAll()
        {
            return _articleRepository.GetAll();
        }
        public Article GetById(int id)
        {
            return _articleRepository.GetById(id);
        }
    }
}
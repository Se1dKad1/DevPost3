using DevPost3.Data;
using DevPost3.Models;
using DevPost3.Repositories.Interfaces;

namespace DevPost3.Repositories.Implementations
{
    public class ArticleRepository : IArticleRepository
    {
        private readonly AppDbContext _context;

        public ArticleRepository(AppDbContext context)
        {
            _context = context;
        }

        public void Create(Article article)
        {
            _context.Articles.Add(article);
            _context.SaveChanges();
        }

        public void Update(Article article)
        {
            _context.Articles.Update(article);
            _context.SaveChanges();
        }

        public void Delete(int id)
        {
            _context.Articles.Remove(new Article { Id = id });
            _context.SaveChanges();
        }

        public IEnumerable<Article> GetAll()
        {
            var articles = _context.Articles.ToArray<Article>();
            return articles;
        }

        public Article GetById(int id)
        {
            var article = _context.Articles.FirstOrDefault(a => a.Id == id);
            return article ?? throw new KeyNotFoundException($"Article with ID {id} not found.");
        }
    }
}

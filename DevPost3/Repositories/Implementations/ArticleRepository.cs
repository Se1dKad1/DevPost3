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
    }
}

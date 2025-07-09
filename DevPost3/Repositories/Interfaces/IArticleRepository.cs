using DevPost3.Models;

namespace DevPost3.Repositories.Interfaces
{
    public interface IArticleRepository
    {
        void Create(Article article);
        void Update(Article article);
        void Delete(int id);
    }
}

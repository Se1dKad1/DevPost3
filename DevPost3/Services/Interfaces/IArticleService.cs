using DevPost3.Models;

namespace DevPost3.Services.Interfaces
{
    public interface IArticleService
    {
        void Create(Article article);
        void Update(Article article);
        void Delete(int id);
    }
}

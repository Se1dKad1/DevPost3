namespace DevPost3.DTOs
{
    public class ArticleDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public string PublishedDate { get; set; }
        public string Author { get; set; }
    }
}

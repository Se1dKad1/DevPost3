using System.ComponentModel.DataAnnotations;

namespace DevPost3.Models
{
    public class Article
    {
        public int Id { get; set; }
        [Required]
        [StringLength(150, MinimumLength = 70)]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; } = string.Empty;
        public DateTime PublishedDate { get; set; } = DateTime.UtcNow;
        public string Author { get; set; } = string.Empty;
    }
}

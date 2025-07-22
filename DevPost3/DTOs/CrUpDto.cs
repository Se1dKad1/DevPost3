using System.ComponentModel.DataAnnotations;

namespace DevPost3.DTOs
{
    public class CreateArticleDto
    {
        [Required(ErrorMessage = "Title is required")]
        [StringLength(150, MinimumLength = 50, ErrorMessage = "Title must be between 50 and 150 characters")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Content is required")]
        public string Content { get; set; }

        [StringLength(100, ErrorMessage = "Author name cannot exceed 100 characters")]
        public string? Author { get; set; }
    }

    public class UpdateArticleDto
    {
        [Required(ErrorMessage = "Title is required")]
        [StringLength(150, MinimumLength = 50, ErrorMessage = "Title must be between 50 and 150 characters")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Content is required")]
        public string Content { get; set; }

        [StringLength(100, ErrorMessage = "Author name cannot exceed 100 characters")]
        public string? Author { get; set; }
    }
}

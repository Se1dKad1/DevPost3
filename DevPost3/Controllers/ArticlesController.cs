using DevPost3.DTOs;
using DevPost3.Models;
using DevPost3.Services.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Diagnostics;
using System.ComponentModel.DataAnnotations;

namespace DevPost3.Controllers
{
    [EnableCors("AllowReactApp")]
    [ApiController]
    [Route("[controller]")]
    public class ArticlesController : ControllerBase
    {
        private readonly IArticleService _articleService;
        public ArticlesController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        [HttpPost]
        public ActionResult<ArticleDto> Create([FromBody] CreateArticleDto articleDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(new
                    {
                        Message = "Validation errors",
                        Errors = ModelState.ToDictionary(
                            kvp => kvp.Key,
                            kvp => kvp.Value.Errors.Select(e => e.ErrorMessage).ToArray()
                        )
                    });
                }

                var article = new Article
                {
                    Title = articleDto.Title,
                    Content = articleDto.Content,
                    Author = articleDto.Author ?? string.Empty,
                    PublishedDate = DateTime.UtcNow
                };

                _articleService.Create(article);

                var result = new ArticleDto()
                {
                    Id = article.Id,
                    Title = article.Title,
                    Content = article.Content,
                    PublishedDate = article.PublishedDate.ToString("dd-MM-yyyy HH:mm"),
                    Author = article.Author
                };

                return CreatedAtAction(nameof(GetById), new { id = article.Id }, result);
            }
            catch (ValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Message = "Internal server error", Details = ex.Message });
            }
        }

        [HttpPut("{id}")]
        public ActionResult<ArticleDto> Update(int id, [FromBody] UpdateArticleDto articleDto)
        {
            var existingArticle = _articleService.GetById(id);
            if (existingArticle == null) return NotFound();

            existingArticle.Title = articleDto.Title;
            existingArticle.Content = articleDto.Content;
            existingArticle.Author = articleDto.Author ?? string.Empty;

            _articleService.Update(existingArticle);

            return Ok(new ArticleDto
            {
                Id = existingArticle.Id,
                Title = existingArticle.Title,
                Content = existingArticle.Content,
                Author = existingArticle.Author,
                PublishedDate = existingArticle.PublishedDate.ToString("dd-MM-yyyy HH:mm")
            });
        }

        [HttpDelete("{id}")]
        public ActionResult<Article> Delete(int id)
        {
            _articleService.Delete(id);
            return Ok();
        }

        [HttpGet]
        public ActionResult<IEnumerable<Article>> GetAll()
        {
            var articles = _articleService.GetAll();
            return Ok(articles);
        }

        [HttpGet("{id}")]
        public ActionResult<Article> GetById(int id)
        {
            try
            {
                var article = _articleService.GetById(id);
                return Ok(article);
            }
            catch (KeyNotFoundException ex)
            {
                return NotFound(ex.Message);
            }
        }
    }
}

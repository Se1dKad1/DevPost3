﻿using DevPost3.DTOs;
using DevPost3.Models;
using DevPost3.Services.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Diagnostics;

namespace DevPost3.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ArticlesController : ControllerBase
    {
        private readonly IArticleService _articleService;
        public ArticlesController(IArticleService articleService)
        {
            _articleService = articleService;
        }

        [HttpPost]
        [Route("create")]
        public ActionResult<Article> Create(Article article)
        {
            _articleService.Create(article);

            var result = new ArticleDto()
            {
                Id = article.Id,
                Title = article.Title,
                Content = article.Content,
                PublishedDate = article.PublishedDate.ToString("yyyy-MM-dd HH:mm"),
                Author = article.Author
            };

            return Ok(result);
        }

        [HttpPut("update/{id}")]
        public ActionResult<Article> Update(int id, [FromBody] Article article)
        {
            article.Id = id;

            if (article.Id != id)
            {
                return BadRequest("Article ID mismatch.");
            }

            _articleService.Update(article);

            return Ok();
        }

        [HttpDelete("delete/{id}")]
        public ActionResult Delete(int id)
        {
            _articleService.Delete(id);
            return Ok();
        }
    }
}

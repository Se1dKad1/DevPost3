using DevPost3.Data;
using DevPost3.Repositories.Implementations;
using DevPost3.Repositories.Interfaces;
using DevPost3.Services.Implementations;
using DevPost3.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace DevPost3
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddControllers();

            builder.Services.AddOpenApi();

            builder.Services.AddScoped<IArticleService, ArticleService>();

            builder.Services.AddScoped<IArticleRepository, ArticleRepository>();

            builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp", builder =>
                {
                    builder.WithOrigins("http://localhost:5173")
                           .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials()
                           .SetIsOriginAllowed(_ => true);
                });
            });

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
                app.UseSwaggerUI(options =>
                {
                    options.SwaggerEndpoint("/openapi/v1.json", "api");
                });
            }


            app.UseCors("AllowReactApp");

            app.UseStaticFiles();

            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}

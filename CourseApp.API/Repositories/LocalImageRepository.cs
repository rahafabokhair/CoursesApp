
using CourseApp.API.Data;
using CourseApp.API.Repositories;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

namespace CourseApp.API.Repositories
{
    public class LocalImageRepository : IImageRepository
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly DBContext _dbContext;

        public LocalImageRepository(IWebHostEnvironment webHostEnvironment,
            IHttpContextAccessor httpContextAccessor,
            DBContext dbContext)
        {
            _webHostEnvironment = webHostEnvironment;
            _httpContextAccessor = httpContextAccessor;
            _dbContext = dbContext;
        }
        public async Task<string> Upload(IFormFile file)
        {
            var localFilePath = Path.Combine(_webHostEnvironment.ContentRootPath, "Images",
                $"{file.FileName}");
            using var stream = new FileStream(localFilePath, FileMode.Create);
            await file.CopyToAsync(stream);
            var httpContAcc = _httpContextAccessor.HttpContext.Request;
            var urlFilePath = $"{httpContAcc.Scheme}://{httpContAcc.Host}/Images/{file.FileName}";
            
            return urlFilePath;

        }
    }
}

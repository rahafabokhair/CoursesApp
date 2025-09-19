using static System.Net.Mime.MediaTypeNames;

namespace CourseApp.API.Repositories
{
    public interface IImageRepository
    {
       Task<string> Upload(IFormFile file);
    }
}

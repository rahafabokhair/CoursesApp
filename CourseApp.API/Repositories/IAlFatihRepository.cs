using CourseApp.API.Helpers;
using CourseApp.API.Model.Domain;

namespace CourseApp.API.Repositories
{
    public interface IAlFatihRepository
    {
        void Add<T>(T entity) where T : class;
        void Delete<T>(T entity) where T : class;
        Task<bool> SaveAll();

       
        Task<PagedList<Course>> getAllCourses(CourseParams courseParams);
        Task<IEnumerable<CourseCategory>> getCoursesCategories();
        Task<Course> GetCoursePerId(int id);
        Task<PagedList<Course>> GetCoursesForUser(int userId, CourseParams courseParams);
        Task<bool> CheckCourseExist(int courseId, int userId);
    }
}

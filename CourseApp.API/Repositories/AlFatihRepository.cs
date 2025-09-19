using CourseApp.API.Data;
using CourseApp.API.Helpers;

using CourseApp.API.Model.Domain;
using CourseApp.API.Repositories;
using Microsoft.EntityFrameworkCore;
using static CourseApp.API.Model.DTO.CoursesForListDto;

namespace CourseApp.API.Repositories
{
    public class AlFatihRepository : IAlFatihRepository
    {
        private readonly DBContext _context;

        public AlFatihRepository(DBContext dbContext)
        {
            _context = dbContext;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<PagedList<Course>> getAllCourses(CourseParams courseParams)
        {
           var courses =  _context.Courses.Include(c => c.Schedules).AsQueryable();
            courses = courses.Where(c => c.CourseCategoryId == courseParams.CourseCategoryId);
            return await PagedList<Course>.CreateAsync(courses, courseParams.PageNumber, courseParams.PageSize);
        }

        public async Task<Course> GetCoursePerId(int id)
        {
            return await _context.Courses.Include(c => c.Schedules).FirstOrDefaultAsync(c => c.Id == id);
        }

        public async Task<IEnumerable<CourseCategory>> getCoursesCategories()
        {
            return await _context.CourseCategories.ToListAsync();
        }

        public async Task<PagedList<Course>> GetCoursesForUser(int userId, CourseParams courseParams)
        {

            var myCourses = _context.UserCourses
             .Where(uc => uc.UserId == userId)
             .Include(uc => uc.Course)
             .Select(uc => uc.Course);
            return await PagedList<Course>.CreateAsync(myCourses, courseParams.PageNumber, courseParams.PageSize);

        }
        public async Task<bool> CheckCourseExist(int courseId, int userId)
        {
            var exists = await _context.UserCourses.AnyAsync(uc => uc.UserId == userId && uc.CourseId == courseId);

            if (exists)
                return true;
            return false;

        }
        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}

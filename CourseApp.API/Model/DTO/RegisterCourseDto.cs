using CourseApp.API.Model.Domain;

namespace CourseApp.API.Model.DTO
{
    public class RegisterCourseDto
    {
        public int UserId { get; set; }

        public int CourseId { get; set; }

        public DateTime RegisteredAt { get; set; }
        public RegisterCourseDto()
        {
            RegisteredAt = DateTime.Now;

        }
    }
}

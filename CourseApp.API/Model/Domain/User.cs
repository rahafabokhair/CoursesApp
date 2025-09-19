
using CourseApp.API.Model.Domain;

namespace CourseApp.API.Model.Domain
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public string? Gender { get; set; }  // Nullable string
        public DateTime DateOfBirth { get; set; } // Nullable DateTime
        public string PhotoUrl { get; set; }
         public ICollection<UserCourse> UserCourses { get; set; }

    }
}

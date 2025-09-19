using System.ComponentModel.DataAnnotations;

namespace CourseApp.API.Model.DTO
{
    public class UserForRegisterDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "you must specify password between 4 and 8")] 
        public string password { get; set; }

        public string? Gender { get; set; }  // Nullable string
        public DateTime DateOfBirth { get; set; } // Nullable DateTime
        public string PhotoUrl { get; set; }

        public int ClassOrderId { get; set; }
    }
}

using CourseApp.API.Model.Domain;

namespace CourseApp.API.Model.DTO
{
    public class CoursesForDetailsDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int studentAgeFrom { get; set; }
        public int studentAgeTo { get; set; }
        public string Level { get; set; }
        public string Description { get; set; }
        public int SeatsNumber { get; set; }
        //public string PhotoUrl { get; set; }
        public string Price { get; set; }
        public string LessonDuration { get; set; }
        public int LessonNumber { get; set; }
        public bool License { get; set; }
        public int CourseCategoryId { get; set; }

        //public string TeacherName { get; set; }

        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public string Duration { get; set; }
        public List<CourseScheduleDto> Schedules { get; set; }
        public class CourseScheduleDto
        {
            public string Day { get; set; }
            public string StartTime { get; set; }   // format: "09:00"
            public string EndTime { get; set; }     // format: "11:00"
        }
    }
}

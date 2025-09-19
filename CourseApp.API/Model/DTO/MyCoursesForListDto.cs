using CourseApp.API.Model.Domain;

namespace CourseApp.API.Model.DTO
{
    public class MyCoursesForListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Level { get; set; }
        public int SeatsNumber { get; set; }
        public string PhotoUrl { get; set; }
        public int CourseCategoryId { get; set; }
        //public DateTime StartDate { get; set; }
        //public DateTime EndDate { get; set; }
        //public string Duration { get; set; }
        // public List<CourseScheduleDto> Schedules { get; set; }
        //public class CourseScheduleDto
        //{
        //    public string Day { get; set; }
        //    public string StartTime { get; set; }   // format: "09:00"
        //    public string EndTime { get; set; }     // format: "11:00"
        //}
    }
}

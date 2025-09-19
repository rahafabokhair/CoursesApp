namespace CourseApp.API.Model.Domain
{
    public class CourseSchedule
    {
        public int Id { get; set; }
        public DayOfWeek Day { get; set; }

        // optional: start/end times
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        public int CourseId { get; set; }
        public Course Course { get; set; }
    }
}

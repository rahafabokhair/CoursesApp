namespace CourseApp.API.Model.Domain
{
    public class Course
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int studentAgeFrom { get; set; }
        public int studentAgeTo { get; set; }
        public string Level { get; set; }
        public string Description { get; set; }
        public int SeatsNumber { get; set; }
        public string PhotoUrl { get; set; }
        public string Price { get; set; }
        public string LessonDuration { get; set; }
        //public string CourseDuration { get; set; }
        public int LessonNumber { get; set; }
        public bool License { get; set; }
        public int CourseCategoryId { get; set; }
        public CourseCategory CourseCategory { get; set; }
        public string TeacherName { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public ICollection<CourseSchedule> Schedules { get; set; }
        public ICollection<UserCourse> UserCourses { get; set; }
       

        public (int Months, int Days) GetDurationInMonthsAndDays()
        {
            int months = ((EndDate.Year - StartDate.Year) * 12) + EndDate.Month - StartDate.Month;

            int days = EndDate.Day - StartDate.Day;
            if (days < 0)
            {
                months--; // borrow one month
                var prevMonth = EndDate.AddMonths(-1);
                days += DateTime.DaysInMonth(prevMonth.Year, prevMonth.Month);
            }

            return (months, days);
        }
    }
}

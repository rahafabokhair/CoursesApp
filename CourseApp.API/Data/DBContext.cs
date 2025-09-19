using CourseApp.API.Model.Domain;
using Microsoft.EntityFrameworkCore;
namespace CourseApp.API.Data
{
    public class DBContext : DbContext
    {
        public DBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        { }
        public DbSet<User> Users { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseCategory> CourseCategories { get; set; }
        public DbSet<CourseSchedule> CourseSchedule { get; set; }
        public DbSet<UserCourse> UserCourses { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /////usercourse relation
            modelBuilder.Entity<UserCourse>()
            .HasKey(uc => new { uc.UserId, uc.CourseId });

            modelBuilder.Entity<UserCourse>()
                .HasOne(uc => uc.User)
                .WithMany(u => u.UserCourses)
                .HasForeignKey(uc => uc.UserId).OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<UserCourse>()
                .HasOne(uc => uc.Course)
                .WithMany(c => c.UserCourses)
                .HasForeignKey(uc => uc.CourseId).OnDelete(DeleteBehavior.Restrict);
        }
    }
}

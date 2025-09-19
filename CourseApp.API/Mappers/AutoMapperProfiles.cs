using AutoMapper;
using CourseApp.API.Model.Domain;
using CourseApp.API.Model.DTO;
using static CourseApp.API.Model.DTO.CoursesForDetailsDto;

namespace CourseApp.API.Mappers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>().ReverseMap();

            CreateMap<User, UserForRegisterDto>().ReverseMap();
            CreateMap<RegisterCourseDto, UserCourse>().ReverseMap();
            CreateMap<CoursesForListDto, Course>().ReverseMap();

            CreateMap<CoursesForDetailsDto, Course>().ReverseMap()
             .ForMember(dest => dest.Duration,
              opt => opt.MapFrom(src =>
                  $"{src.GetDurationInMonthsAndDays().Months} شهر {src.GetDurationInMonthsAndDays().Days} يوم"))
             .ForMember(dest => dest.Schedules, opt =>
               opt.MapFrom(src => src.Schedules));


            CreateMap<MyCoursesForListDto, Course>().ReverseMap();
            CreateMap<MyCoursesForDetailsDto, Course>().ReverseMap();

            CreateMap<CourseSchedule, CourseScheduleDto>()
            .ForMember(dest => dest.Day, opt =>
                opt.MapFrom(src => src.Day.ToString()))
            .ForMember(dest => dest.StartTime, opt =>
                opt.MapFrom(src => src.StartTime.ToString(@"hh\:mm")))
            .ForMember(dest => dest.EndTime, opt =>
                opt.MapFrom(src => src.EndTime.ToString(@"hh\:mm")));
        }


    }

}

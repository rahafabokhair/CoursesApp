using AutoMapper;
using CourseApp.API.Helpers;

using CourseApp.API.Model.Domain;
using CourseApp.API.Model.DTO;

using CourseApp.API.Helper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using CourseApp.API.Repositories;

namespace CourseApp.API.Controllers
{
    [Authorize]
    //[Route("api/[controller]")]
    [Route("api/user/{userId}/[controller]")]
    [ApiController]
    public class MyCoursesController : ControllerBase
    {
        private readonly IAlFatihRepository _repo;
        private readonly IMapper _mapper;

        public MyCoursesController(IAlFatihRepository alFatihRepository, IMapper mapper)
        {
            _repo = alFatihRepository;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "GetCourses")]
        public async Task<IActionResult> getMyCoursePerId(int userId, int id)
        {
            //ensure the userId is correct and exsist
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var courseFromRepo = await _repo.GetCoursePerId(id);
            var course = _mapper.Map<MyCoursesForDetailsDto>(courseFromRepo);
            if (course == null)
            {
                return NotFound();
            }
            return Ok(course);
        }

        [HttpGet]
        public async Task<IActionResult> GetCoursesForUser(int userId, [FromQuery] CourseParams courseParams)
        {
            //ensure the userId is correct and exsist
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var coursefromRepo = await _repo.GetCoursesForUser(userId, courseParams);
            var courses = _mapper.Map<IEnumerable<MyCoursesForListDto>>(coursefromRepo);
            Response.AddPagination(coursefromRepo.CurrentPage, coursefromRepo.PageSize, coursefromRepo.TotalCount, coursefromRepo.TotalPages);
            return Ok(courses);

        }

        [HttpPost]
        [Route("subscribe/{courseId}")]
        public async Task<IActionResult> subscribeCourse(int userId, [FromRoute] int courseId)
        {

            //ensure the userId is correct and exsist
            if (userId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }
            var registerCourseDto = new RegisterCourseDto();
            registerCourseDto.UserId = userId;
            registerCourseDto.CourseId = courseId;

            if (await _repo.CheckCourseExist(registerCourseDto.CourseId, userId))
            {
                return BadRequest("Already registered in this course.");
            }

            var courseToAdd = _mapper.Map<UserCourse>(registerCourseDto);
            _repo.Add(courseToAdd);

            if (await _repo.SaveAll())
            {
                return Ok();
            }
            return BadRequest("problem subscribing this course");
        }
    }
}

using AutoMapper;
using Azure;
using CourseApp.API.Helpers;

using CourseApp.API.Model.Domain;
using CourseApp.API.Model.DTO;
using CourseApp.API.Repositories;
using CourseApp.API.Helpers;
using Microsoft.AspNetCore.Mvc;
using CourseApp.API.Helper;

namespace CourseApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoursesController : ControllerBase
    {
        private readonly IAlFatihRepository _alFatihRepo;
        private readonly IMapper _mapper;

        public CoursesController(IAlFatihRepository alFatihRepository, IMapper mapper)
        {
            _alFatihRepo = alFatihRepository;
            _mapper = mapper;

        }

        [HttpGet]
        public async Task<IActionResult> GetAllCourses([FromQuery] CourseParams courseParams)
        {
            
            var courses =await _alFatihRepo.getAllCourses(courseParams);
            var coursesToReturn = _mapper.Map<IEnumerable<CoursesForListDto>>(courses);
            Response.AddPagination(courses.CurrentPage, courses.PageSize, courses.TotalCount, courses.TotalPages);
            return Ok(coursesToReturn);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetCourse([FromRoute] int id)
        {
            var course = await _alFatihRepo.GetCoursePerId(id);
            if (course == null)
            {
                return NotFound();
            }
            var courseToReturn = _mapper.Map<CoursesForDetailsDto>(course);
            return Ok(courseToReturn);
        }

        [HttpGet("category")]

        public async Task<IActionResult> getCoursesCategories()
        {
            var coursesCategory =await _alFatihRepo.getCoursesCategories();
            return Ok(coursesCategory);
        }
    }
}

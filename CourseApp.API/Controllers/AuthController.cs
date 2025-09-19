using AutoMapper;
using CourseApp.API.Model.Domain;
using CourseApp.API.Model.DTO;
using CourseApp.API.Repositories;
using CourseApp.API.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CourseApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _repo;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository repo,IMapper mapper)
        {
            _repo = repo;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("Register")]
        public async Task<IActionResult> register(UserForRegisterDto userForRegisterDto)
        {

            userForRegisterDto.Username = userForRegisterDto.Username.ToLower();
            if (await _repo.UserExist(userForRegisterDto.Username))
            {
                return BadRequest("user name already exist");
            }

            var userToCreate = _mapper.Map<User>(userForRegisterDto);

            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.password);
            return StatusCode(201);

        }

        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> login(LoginRequestDto loginRequestDto)
        {
            loginRequestDto.Username = loginRequestDto.Username.ToLower();

            var userFromRepo = await _repo.Login(loginRequestDto.Username, loginRequestDto.Password);
            if (userFromRepo == null)
            {
                throw new UnauthorizedAccessException("Invalid username or password.");
            }
            var currentUser = new User
            {
                Id = userFromRepo.Id,
                Username = userFromRepo.Username,
            };
            //return token
            //create Token
            var jwtToken = _repo.CreateJWTToken(currentUser);

            var user = _mapper.Map<UserForListDto>(userFromRepo);
            return Ok(new
            {
                token = jwtToken,
                user

            });

        }


    }
}


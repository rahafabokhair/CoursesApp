using CourseApp.API.Model.Domain;
using CourseApp.API.Model.Domain;
using Microsoft.AspNetCore.Mvc;

namespace CourseApp.API.Repositories
{
    public interface IAuthRepository
    {
        Task<User> Register(User user,string password);
        Task<User> Login(string username, string password);
        Task<bool> UserExist(string username);
        string CreateJWTToken(User user);
    }
}

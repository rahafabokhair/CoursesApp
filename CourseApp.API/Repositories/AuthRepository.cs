using CourseApp.API.Data;
using CourseApp.API.Model.Domain;

using CourseApp.API.Model.Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CourseApp.API.Repositories
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DBContext _context;
        private readonly IConfiguration _config;

        public AuthRepository(DBContext dbContext, IConfiguration configuration)
        {
            _context = dbContext;
            _config = configuration;
        }

        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _context.Users.AddAsync(user);
            await _context.SaveChangesAsync();
            return user;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash,
        out byte[] passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash =
                hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
           ;

        }


        public async Task<bool> UserExist(string username)
        {
            if (await _context.Users.AnyAsync(x => x.Username == username))
            {
                return true;
            }
            return false;
        }
        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[]
        passwordSalt)
        {
            using (var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt))
            {
                var computedHash =
                hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                    { return false; }
                }
            }
            return true;
        }
        public async Task<User> Login(string username, string password)
        {

            var user = await _context.Users.FirstOrDefaultAsync(x => x.Username == username);

            if (user == null || !VerifyPasswordHash(password, user!.PasswordHash, user!.PasswordSalt))
            {//create token
                return null;
            }
            return user;

        }

        public string CreateJWTToken(User user)
        {
            //build token
            //create variable to store claims
            var claims = new[]{
                new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
                new Claim (ClaimTypes.Name,user.Username)
                };
            //create Key to sign our token and store it in app setting file
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));

            //To hash the key
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // Created security token descriptor :containes cliams ,expiering date for token,and the signing cradintial
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            // created token handler
            var tokenHandler = new JwtSecurityTokenHandler();

            //create token and pass it to token descriptor
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);


        }

    }
}

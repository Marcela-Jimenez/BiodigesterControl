using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Backend.Services;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly string? _secretKey;

        public LoginController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _secretKey = config.GetSection("secretKey")?.ToString();
        }

            [HttpPost]
        public async Task<ActionResult> login(Login credentials)
        {
            string ePassword = Encript.GetSHA256(credentials.Password);
            User? user = await _context.Users.SingleOrDefaultAsync(x=>
            x.IdEmail==credentials.Email && x.Password==ePassword);
            if (user == null)
            {
                return Ok(new {message="Usuario o Contraseña Inválidos"});
            }
            string token = genereteToken(user);
            return Ok(new{ message = "Ok", token =token });
        }
        private string genereteToken(User user)
        {
            var claims = new[]
            {
                new Claim(ClaimTypes.Email, user.IdEmail),
                new Claim(ClaimTypes.Name, user.Name),
                //new Claim(ClaimTypes.Role, user.IdRol),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

            var securityToken = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(5),
                    signingCredentials: cred
                );
            string token = new JwtSecurityTokenHandler().WriteToken(securityToken);
            return token;
        }

    }
}

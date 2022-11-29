using Backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Backend.Controllers
{
    [Route("api/[controller]")]
    //[Authorize]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UsersController(AppDbContext context, IConfiguration config)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> getUsers()
        {
            List<User> users = await _context.Users.ToListAsync();
            return Ok(users);
        }

        [HttpPost]
        public async Task<ActionResult> createUser(User user)
        {
            try
            {
                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();
                return Ok(new { State="Success", Message = "Usuario Creado" });
            }
            catch(Exception ex)
            {
                return Ok(new { State="Error", Message = "Ocurrio un error al crear el usuario" });
            }
            
            
        }
    }
}

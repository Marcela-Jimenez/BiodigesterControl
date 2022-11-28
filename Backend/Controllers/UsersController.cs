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
    }
}

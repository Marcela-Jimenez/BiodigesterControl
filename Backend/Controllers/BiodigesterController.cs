using Backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BiodigesterController : ControllerBase
    {
        private readonly AppDbContext _context;
        public BiodigesterController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> getBiodigesters()
        {
            List<Biodigester> biodigesters = await _context.Biodigesters.ToListAsync();
            return Ok(biodigesters);
        }

        [HttpPost]
        public async Task<ActionResult> addBiodigesters(Biodigester biodigester)
        {
            try
            {
                await _context.Biodigesters.AddAsync(biodigester);
                await _context.SaveChangesAsync();
                return Ok(new { Status = "Success", Id = biodigester.Id });
            }
            catch (Exception ex)
            {
                return Ok(new
                {
                    Status = "Failend"
                });
            }
        }


        [HttpGet("{id}")]
        public async Task<ActionResult> getBiodigesters(int id)
        {
            Biodigester? biodigester = await _context.Biodigesters.FindAsync(id);
            if (biodigester == null)
            {
                return Ok(new { Message = "Not Found" });
            };
            return Ok(biodigester);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> putBiodigester(int id, Biodigester biodigester)
        {
            if (id != biodigester.Id)
            {
                return Ok(new { Message = "Not Found" });
            };
            try
            {
                _context.Entry(biodigester).State = EntityState.Modified;
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Successful" });
            }
            catch (Exception ex)
            {
                return Ok(new { Message = "Excepetion" });
            }
        }
    }
}

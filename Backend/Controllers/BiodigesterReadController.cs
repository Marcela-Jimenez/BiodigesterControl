using Backend.Models;
using Backend.Models.SignalR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BiodigesterReadController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IHubContext<BroadCastHub, IHubClient> _hubContext;
        public BiodigesterReadController(AppDbContext context, IHubContext<BroadCastHub, IHubClient> hubContext)
        {
            _context = context;
            _hubContext = hubContext;
        }

        [HttpPost]
        public async Task<ActionResult> addRead(ReadBiodigester read)
        {
            try
            {
                //await _context.ReadBiodigesters.AddAsync(read);
                //await _context.SaveChangesAsync();
                await _hubContext.Clients.All.getReads(read);
                return Ok(new { Status = "Success", Message = "Agregado correctamente" });
            }catch(Exception ex)
            {
                return Ok(new { Status="Failend", Message = "Error al procesar la solicitud" });
            }
        }
    }
}

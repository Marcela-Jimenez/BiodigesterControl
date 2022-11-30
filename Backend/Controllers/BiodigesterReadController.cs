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
        private static List<ReadBiodigester> readsBiodigesterPerSecond=new List<ReadBiodigester>();
        private static List<ReadBiodigester> readsBiodigesterPerMinute = new List<ReadBiodigester>();
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
                readsBiodigesterPerSecond.Add(read);
                List<ReadBiodigester> readsSecond = readsBiodigesterPerSecond.FindAll(x => x.Id == read.Id);
                if (readsSecond.Count >= 60)
                {
                    addReads(new List<ReadBiodigester>(readsSecond));
                    readsBiodigesterPerSecond.RemoveAll(x => x.Id == read.Id);
                }

                await _hubContext.Clients.All.getReads(read);
                return Ok(new { Status = "Success", Message = "Agregado correctamente" });
            }
            catch (Exception ex)
            {
                return Ok(new { Status = "Failend", Message = "Error al procesar la solicitud" });
            }
        }

        private async Task addReads(List<ReadBiodigester> reads)
        {
            
                readsBiodigesterPerMinute.Add(calcReads(reads));
                List<ReadBiodigester> readsMinute = readsBiodigesterPerMinute.FindAll(x => x.Id == reads[0].Id);
                if (readsMinute.Count >= 60)
                {
                    await _context.ReadBiodigesters.AddAsync(calcReads(readsMinute));
                    await _context.SaveChangesAsync();
                    readsBiodigesterPerMinute.RemoveAll(x => x.Id == reads[0].Id);
                }
            
        }

        private ReadBiodigester calcReads(List<ReadBiodigester> reads)
        {
            double acuTemp = 0;
            double acuHumedity = 0;
            double acuAirQuality = 0;
            double acuGas = 0;
            double acuCO = 0;
            foreach (ReadBiodigester readBio in reads)
            {
                acuTemp += readBio.Temperature;
                acuAirQuality += readBio.AirQuality;
                acuHumedity += readBio.Humidety;
                acuGas += readBio.Gas;
                acuCO += readBio.CarbonMonoxid;
            }
            return new ReadBiodigester {
                Id=0,
                DateRead = DateTime.Now,
                AirQuality = (int)(acuAirQuality / reads.Count),
                CarbonMonoxid = (int)(acuCO / reads.Count),
                Gas = (int)(acuGas / reads.Count),
                Humidety = (int)(acuHumedity / reads.Count),
                Temperature= (int)(acuTemp / reads.Count)
            };

        }

        [HttpGet]
        public async Task<ActionResult> activarReloj()
        {
            //Descomentar esto es desatar a satan (Bombardea SignalR enviando valores aleotorios con el fin de hacer una prueba de estres)
            //reloj();
            return Ok("Ok");
        }
        private async Task reloj()
        {
            for (int i = 0; i < 60*60*2; i++)
            {
                Random rand = new Random();
                ReadBiodigester read = new ReadBiodigester
                {
                    Id = 0,
                    AirQuality = rand.Next(100),
                    CarbonMonoxid = rand.Next(100),
                    Gas = rand.Next(100),
                    Humidety = rand.Next(100),
                    Temperature = rand.Next(100),
                    DateRead = DateTime.Now
                };
                await addRead(read);
                await Task.Delay(20);
            }
        }
    }
}

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
            double acuRelHumedity = 0;
            double acuInTemp = 0;
            double acuOutTemp = 0;
            double acuPHBiol = 0;
            double acuPresion = 0;
            double acuMiliVoltios = 0;
            
            foreach (ReadBiodigester readBio in reads)
            {
                acuRelHumedity += readBio.RelativeHumidety;
                acuInTemp += readBio.InsideTemperature;
                acuOutTemp += readBio.OutsideTemperature;
                acuPHBiol += readBio.PHBiol;
                acuPresion += readBio.Presion;
                acuMiliVoltios += readBio.MiliVoltios;
            }
            return new ReadBiodigester {
                DateRead = DateTime.Now,
                RelativeHumidety = (int)(acuRelHumedity / reads.Count),
                InsideTemperature = (int)(acuInTemp / reads.Count),
                OutsideTemperature = (int)(acuOutTemp / reads.Count),
                PHBiol = (int)(acuPHBiol / reads.Count),
                Presion= (int)(acuPresion / reads.Count),
                MiliVoltios = (int)(acuMiliVoltios / reads.Count)
            };

        }

        [HttpGet]
        public async Task<ActionResult> activarReloj()
        {
            reloj();
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
                    DateRead = DateTime.Now,
                    RelativeHumidety = rand.Next(100),
                    InsideTemperature = rand.Next(100),
                    OutsideTemperature = rand.Next(100),
                    PHBiol = rand.Next(100),
                    Presion= rand.Next(100),
                    MiliVoltios = rand.Next(100)
                };
                await addRead(read);
                await Task.Delay(5000);
            }
        }
    }
}

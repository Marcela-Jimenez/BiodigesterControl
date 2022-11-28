using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("read_biodigester")]
	public class ReadBiodigester
	{
		[Column("id_token")]
		public string IdToken { get; set; }
		[Column("date_read")]
		public DateTime DateRead { get; set; }
		[Column("humidety")]
		public double Humidety { get; set; }
		[Column("temperature")]
		public double Temperature { get; set; }
		[Column("air_quality")]
		public int AirQuality { get; set; }
		[Column("gas")]
		public int Gas { get; set; }
		[Column("carbon_monoxid")]
		public int CarbonMonoxid { get; set; }
	}
}

using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
	[Table("biodigester")]
	public class Biodigester
	{
		[Column("id_token")]
		public string IdToken { get; set; }
		[Column("u_agri_environmental")]
		public string UAgriEnvironmental { get; set; }
		[Column("temp_point")]
		public int TempPoint { get; set; }
		[Column("light")]
		public bool Light { get; set; }
		[Column("fan")]
		public bool Fan { get; set; }
		[Column("proportional_gain")]
		public double ProportionalGain { get; set; }
		[Column("integral_time")]
		public double IntegralTime { get; set; }
		[Column("derivative_time")]
		public double DerivativeTime { get; set; }
	}
}

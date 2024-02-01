using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("read_biodigester")]
	public class ReadBiodigester
	{
        [Column("id_bio")]
        public int? Id { get; set; }
        [Column("date_read")]
        public DateTime DateRead { get; set; } = new DateTime();
        [Column("relative_humidety")]
        public double RelativeHumidety { get; set; }
        [Column("inside_temperature")]
        public double InsideTemperature { get; set; }
        [Column("outside_temperature")]
        public double OutsideTemperature { get; set; }
        [Column("ph_biol")]
        public double PHBiol { get; set; }
        [Column("presion")]
        public double Presion { get; set; }
        [Column("MiliVoltios")]
        public double MiliVoltios { get; set; }
    }
}

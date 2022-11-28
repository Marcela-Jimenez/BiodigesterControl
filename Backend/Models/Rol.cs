using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("rol")]
    public class Rol
    {
        [Column("id")]
        public int id { get; set; }
        [Column("name")]
        public string name { get; set; }
    }
}

using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("rol")]
    public class Rol
    {
        [Column("id")]
        public int Id { get; set; }
        [Column("name")]
        public string Name { get; set; }
    }
}

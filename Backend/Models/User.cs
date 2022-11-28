using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("users")]
    public class User
    {
        [Column("id_email")]
        public string IdEmail {get;set;}

        [Column("password")]
        public string Password {get;set;}

        [Column("id_rol")]
        public int IdRol {get;set;}

	    [Column("name")]
        public string Name { get; set; }
    }
}

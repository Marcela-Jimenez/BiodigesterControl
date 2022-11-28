using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("user_biodigester")]
    public class UserBiodigester
    {
        [Column("id_email")]
        public string IdEmail { get; set; }
        [Column("id_token")]
        public string IdToken { get; set; }

    }
}

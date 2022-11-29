using Microsoft.EntityFrameworkCore;

namespace Backend.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Biodigester> Biodigesters { get; set; }
        public DbSet<ReadBiodigester> ReadBiodigesters { get; set; }
        public DbSet<Rol> Roles { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserBiodigester> UserBiodigesters { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>((options) =>
            {
                options.HasKey(x => x.IdEmail);
            });
            modelBuilder.Entity<Biodigester>((options) =>
            {
                options.HasKey(x => x.Id);
            });
            modelBuilder.Entity<Rol>((options) =>
            {
                options.HasKey(x => x.Id);
            });
            modelBuilder.Entity<UserBiodigester>((options) =>
            {
                options.HasKey(x => new { x.IdEmail, x.Id });
            });
        }
    }
}

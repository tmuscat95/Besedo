using Besedo.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Besedo.API.Data
{
    public class BesedoContext : DbContext
    {
        public DbSet<User> User { get; set; }


        public BesedoContext(DbContextOptions<BesedoContext> DbContextOptions) : base(DbContextOptions)
        {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>((entity) =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Name);
                entity.Property(e => e.Email);
                entity.Property(e => e.Surname);
                entity.Property(e => e.Ip);
            });
        }
    }
}

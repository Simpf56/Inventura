using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data
{
    public class InventorijaContext : DbContext
    {
        public InventorijaContext(DbContextOptions<InventorijaContext> options) : base(options)
        {

        }

        public DbSet<Kupac> Kupci { get; set; }

        public DbSet<Nabavljac> Nabavljaci { get; set; }
    }
}

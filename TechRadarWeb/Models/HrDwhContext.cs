using Microsoft.EntityFrameworkCore;

namespace TechRadarWeb.Models
{
  public class HrDwhContext : DbContext
  {

    public DbSet<Tech> TechsDbSet { get; set; }


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      if (!optionsBuilder.IsConfigured)
        optionsBuilder.UseSqlServer(@"Server=192.168.235.75;Database=iHR_DWH;User Id=tcm;Password=tcm@12345");
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
    }
  }
}

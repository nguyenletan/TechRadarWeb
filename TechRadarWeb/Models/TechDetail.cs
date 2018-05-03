using System.ComponentModel.DataAnnotations;

namespace TechRadarWeb.Models
{
  public class TechDetail
  {
    [Key]
    public long RowNumber { get; set; }

    public string Name { get; set; }
    public string Type { get; set; }
    public string Description { get; set; }

    public string NashTechCategory { get; set; }

    public string Status { get; set; }

    public string MaturityLevels { get; set; }

    public string Location { get; set; }

    public string StaffCode { get; set; }

    public string StaffName { get; set; }

    public string Seniority { get; set; }

    public string Experience { get; set; }

    public int IsAvailable { get; set; }

  }
}

using System.ComponentModel.DataAnnotations;

namespace TechRadarWeb.Models
{
    public class Tech
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

        public int TotalResoures { get; set; }

        public int TotalBench { get; set; }
    }
}
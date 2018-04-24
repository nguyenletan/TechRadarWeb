using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using TechRadarWeb.Models;
using Microsoft.EntityFrameworkCore;
using System.Data.SqlClient;
using Newtonsoft.Json;


namespace TechRadarWeb.Pages
{
  public class IndexModel : PageModel
  {
    public void OnGet()
    {
      using (var context = new HrDwhContext())
      {
        context.Database.SetCommandTimeout(300);
        var techList = context.TechsDbSet.FromSql("EXECUTE TCM.TMS.tcm.usp_getSkillSet").AsNoTracking().ToList();
        ViewData["NashTechRadarData"] = JsonConvert.SerializeObject(techList);
      }
    }
  }
}

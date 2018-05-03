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
    public void OnGetAsync()
    {
      using (var context = new HrDwhContext())
      {
        context.Database.SetCommandTimeout(900);
        var task1 = context.TechsDbSet.FromSql("EXECUTE TCM.TMS.tcm.usp_getSkillSet").AsNoTracking().ToListAsync();
        var task2 = context.DetailTechsDbSet.FromSql("EXECUTE TCM.TMS.tcm.usp_getSkillSet3").AsNoTracking().ToListAsync();

        Task.WhenAll(task1, task2);
        var techList = task1.Result;
        var techDetailList = task2.Result;

        ViewData["NashTechRadarData"] = JsonConvert.SerializeObject(techList);
        ViewData["NashTechRadarDetailData"] = JsonConvert.SerializeObject(techDetailList);
      }
    }
  }
}

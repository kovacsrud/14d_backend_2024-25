using KutyaAPI.mvc.model;
using KutyaAPI.mvc.modelview;
using Microsoft.AspNetCore.Mvc;

namespace KutyaAPI.Controllers
{
    [ApiController]
    public class KutyaController : Controller
    {
        private KutyaModelData kutyaData = new KutyaModelData();

        [HttpGet("/api/kutyak")]
        public IActionResult GetKutyak()
        {
            try
            {
                return Ok(
                   
                   kutyaData.context.Set<Kutya>().Select(i => new{ i.Id,i.Fajta.Nev,i.Fajtaid,i.Nev.Kutyanev,i.Nevid,i.Eletkor,i.Utolsoell }).ToList()
                
                );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

using KutyaAPI.mvc.model;
using KutyaAPI.mvc.modelview;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace KutyaAPI.Controllers
{
    [ApiController]
    public class KutyanevController : Controller
    {
        private KutyaModelData kutyaData= new KutyaModelData();

        [HttpGet("/api/kutyanevek")]
        public IActionResult GetKutyanevek()
        {
            try
            {
                return Ok(
                    //Kiszelektáljuk azokat az adatokat, amelyeket ki akarunk szolgálni
                   kutyaData.context.Set<Kutyanevek>().Select(i => new { i.Id, i.Kutyanev }).ToList()
                   //kutyaData.Kutyanevek -> A kapcsolatok miatt hibát okoz!
                );
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);                
            }
        }
        [HttpPost("/api/kutyanevek")]
        public IActionResult PostKutyanev(dynamic data)
        {
            try
            {
                var ujKutyanev=JsonSerializer.Deserialize<Kutyanevek>(data.ToString());
                kutyaData.context.Set<Kutyanevek>().Add(ujKutyanev);
                kutyaData.context.SaveChanges();
                return StatusCode(201, "Adat beszúrva!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("/api/kutyanevek")]
        public IActionResult PatchKutyanev(dynamic data)
        {
            try
            {
                var modositKutyanev = JsonSerializer.Deserialize<Kutyanevek>(data.ToString());
                var kutyanev = kutyaData.context.Set<Kutyanevek>().Find(modositKutyanev.Id);

                if (kutyanev == null) {
                    return NotFound();
                }

                kutyanev.Kutyanev = modositKutyanev.Kutyanev;
                kutyaData.context.SaveChanges();

                return StatusCode(200, "Módosítva!");

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);                
            }
        }

        [HttpDelete("/api/kutyanevek/{id}")]
        public IActionResult DeleteKutyanev(int id)
        {
            try
            {
                var torlendo = kutyaData.context.Set<Kutyanevek>().FirstOrDefault(x=>x.Id==id);
                if (torlendo == null) {
                    return NotFound();
                }

                kutyaData.context.Set<Kutyanevek>().Remove(torlendo);
                kutyaData.context.SaveChanges();

                return StatusCode(200, "Törölve!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);                
            }
        }
    }
}

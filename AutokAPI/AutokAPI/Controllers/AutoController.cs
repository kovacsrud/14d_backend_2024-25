using AutokAPI.mvvm.model;
using AutokAPI.mvvm.viewmodel;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace AutokAPI.Controllers
{
    [ApiController]
    public class AutoController : Controller
    {
        private static AutoViewModel autoViewModel=new AutoViewModel();
        private List<Auto> Autok = autoViewModel.Autok;

        [HttpGet("/autok")]
        public IActionResult GetAutok()
        {
            try
            {
                return Ok(Autok);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);                
            }
            
        }

        [HttpPost("/autok")]
        public IActionResult PostAutok(dynamic data)
        {
            try
            {
                var ujAdat = JsonSerializer.Deserialize<Auto>(data.ToString());
                Autok.Add(ujAdat);
                return StatusCode(201,"Adat beszúrva!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPatch("/autok")]
        public IActionResult PatchAutok(dynamic data) {

            try
            {
                var adat = JsonSerializer.Deserialize<Auto>(data.ToString());
                var modositando = Autok.Find(x => x.Id == adat.Id);
                if (modositando!=null)
                {
                    modositando.Marka = adat.Marka;
                    modositando.Tipus = adat.Tipus;
                    modositando.Rendszam = adat.Rendszam;
                    modositando.GyartasiEv = adat.GyartasiEv;
                    modositando.Szin = adat.Szin;
                } else
                {
                    return BadRequest("Az adat nem található!");
                }

                

                return StatusCode(200, "Adat módosítva!");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [HttpDelete("/autok/{id}")]
        public IActionResult DeleteAuto(int id)
        {
            try
            {
                var torlendo=Autok.Find(x => x.Id == id);
                if (torlendo != null) {
                    Autok.Remove(torlendo);
                    return StatusCode(200, "Adat törölve!");
                } else
                {
                    return BadRequest("Az adat nem található!");
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}

using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controller
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class Stavka_NarudzbeController : ControllerBase
    {

        private readonly InventorijaContext _context;

        public Stavka_NarudzbeController(InventorijaContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Stavke_Narudzbe);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpGet]
        [Route("{sifra:int}")]
        public IActionResult GetBySifra(int sifra)
        {
            try
            {
                var s = _context.Stavke_Narudzbe.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                return Ok(s);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPost]
        public IActionResult Post(Stavka_Narudzbe stavka_narudzbe)
        {
            try
            {
                _context.Stavke_Narudzbe.Add(stavka_narudzbe);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, stavka_narudzbe);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Stavka_Narudzbe stavka_narudzbe)
        {
            try
            {
                var s = _context.Stavke_Narudzbe.Find(sifra);

                if (s == null)
                {
                    return NotFound();
                }

                s.Kolicina= stavka_narudzbe.Kolicina;
                s.Cijena = stavka_narudzbe.Cijena;
                s.Proizvod = stavka_narudzbe.Proizvod;
                s.Narudzba = stavka_narudzbe.Narudzba;

                _context.Stavke_Narudzbe.Update(s);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno promjenjno" });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            try
            {
                var s = _context.Stavke_Narudzbe.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Stavke_Narudzbe.Remove(s);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

    }
}

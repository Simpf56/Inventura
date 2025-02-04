using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Inventorija.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class InventorijaController : ControllerBase
    {

        private readonly InventorijaContext _context;

        public InventorijaController(InventorijaContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Kupci);
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
                var s = _context.Kupci.Find(sifra);
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
        public IActionResult Post(Kupac kupac)
        {
            try
            {
                _context.Kupci.Add(kupac);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, kupac);
            }
            catch (Exception e)
            {
                return BadRequest(e);    
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Kupac kupac)
        {
            try
            {
                var s = _context.Kupci.Find(sifra);

                if (s == null)
                {
                    return NotFound();
                }
                
                s.Ime = kupac.Ime;
                s.Prezime = kupac.Prezime;
                s.Br_tel = kupac.Br_tel;
                s.Adresa = kupac.Adresa;
                s.Datum_rod = kupac.Datum_rod;

                _context.Kupci.Update(s);
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
                var s = _context.Kupci.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Kupci.Remove(s);
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

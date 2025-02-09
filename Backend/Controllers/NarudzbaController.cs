using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class NarudzbaController : ControllerBase
    {

        private readonly InventorijaContext _context;

        public NarudzbaController(InventorijaContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Narudzbe);
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
                var s = _context.Narudzbe.Find(sifra);
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
        public IActionResult Post(Narudzba narudzba)
        {
            try
            {
                _context.Narudzbe.Add(narudzba);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, narudzba);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Narudzba narudzba)
        {
            try
            {
                var s = _context.Narudzbe.Find(sifra);

                if (s == null)
                {
                    return NotFound();
                }

                s.Ukupan_iznos = narudzba.Ukupan_iznos;
                s.Datum = narudzba.Datum;
                s.Status = narudzba.Status;

                _context.Narudzbe.Update(s);
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
                var s = _context.Narudzbe.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Narudzbe.Remove(s);
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

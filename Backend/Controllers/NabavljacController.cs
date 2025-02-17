using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class NabavljacController : ControllerBase
    {

        private readonly InventorijaContext _context;

        public NabavljacController(InventorijaContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Nabavljaci);
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
                var s = _context.Nabavljaci.Find(sifra);
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
        public IActionResult Post(Nabavljac nabavljac)
        {
            try
            {
                _context.Nabavljaci.Add(nabavljac);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, nabavljac);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Nabavljac nabavljac)
        {
            try
            {
                var s = _context.Nabavljaci.Find(sifra);

                if (s == null)
                {
                    return NotFound();
                }

                s.Ime = nabavljac.Ime;
                s.Prezime = nabavljac.Prezime;
                s.Naziv = nabavljac.Naziv;
                s.Kontakt = nabavljac.Br_tel;
                s.Br_tel = nabavljac.Br_tel;

                _context.Nabavljaci.Update(s);
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
                var s = _context.Nabavljaci.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Nabavljaci.Remove(s);
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
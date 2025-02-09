using Backend.Data;
using Backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class ProizvodController : ControllerBase
    {

        private readonly InventorijaContext _context;

        public ProizvodController(InventorijaContext context)
        {
            _context = context;
        }


        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Proizvodi);
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
                var s = _context.Proizvodi.Find(sifra);
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
        public IActionResult Post(Proizvod proizvod)
        {
            try
            {
                _context.Proizvodi.Add(proizvod);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, proizvod);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        public IActionResult Put(int sifra, Proizvod proizvod)
        {
            try
            {
                var s = _context.Proizvodi.Find(sifra);

                if (s == null)
                {
                    return NotFound();
                }

                s.Naziv = proizvod.Naziv;
                s.Cijena = proizvod.Cijena;
                s.Nabavljac = proizvod.Nabavljac;

                _context.Proizvodi.Update(s);
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
                var s = _context.Proizvodi.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Proizvodi.Remove(s);
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

using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Swashbuckle.AspNetCore.Annotations;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    
    public class ProizvodController(InventorijaContext context, IMapper mapper) : InventorijaController(context, mapper)
    {

        [HttpGet]
        [SwaggerOperation(Summary = "Ruta koja dohvaća sve proizvode", Description = "Vraća listu svih proizvoda.")]
        [SwaggerResponse(200, "Uspješno dohvaćeni proizvodi", typeof(List<ProizvodDTORead>))]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public ActionResult<List<ProizvodDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<ProizvodDTORead>>(_context.Proizvodi.Include(g => g.Nabavljac)));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpGet]
        [Route("{sifra:int}")]
        [SwaggerOperation(Summary = "Dohvati proizvod po šifri", Description = "Vraća proizvod prema zadanoj šifri.")]
        [SwaggerResponse(200, "Uspješno dohvaćen proizvod", typeof(ProizvodDTORead))]
        [SwaggerResponse(404, "Proizvod nije pronađen")]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public ActionResult<ProizvodDTORead> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Proizvod? e;
            try
            {
                e = _context.Proizvodi.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Proizvod ne postoji u bazi" });
            }

            return Ok(_mapper.Map<ProizvodDTORead>(e));
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Dodaj novi proizvod", Description = "Dodaje novi proizvod u bazu podataka.")]
        [SwaggerResponse(201, "Uspješno dodan proizvod", typeof(ProizvodDTORead))]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public IActionResult Post(ProizvodDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            var nabavljac = _context.Nabavljaci.Find(dto.NabavljacSifra);
            if (nabavljac == null)
            {
                return NotFound(new { poruka = "Nabavljac ne postoji u bazi" });
            }

            try
            {
                var e = mapper.Map<Proizvod>(dto);
                e.Nabavljac = nabavljac;
                _context.Proizvodi.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<ProizvodDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        [SwaggerOperation(Summary = "Ažuriraj proizvod", Description = "Ažurira podatke postojećeg proizvoda prema zadanoj šifri.")]
        [SwaggerResponse(200, "Uspješno ažuriran proizvod")]
        [SwaggerResponse(404, "Proizvod nije pronađen")]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public IActionResult Put(int sifra, ProizvodDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Proizvod? e;
                try
                {
                    e = _context.Proizvodi.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Proizvod ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);

                _context.Proizvodi.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promijenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpDelete]
        [Route("{sifra:int}")]
        [SwaggerOperation(Summary = "Obriši proizvod", Description = "Briše proizvod prema zadanoj šifri.")]
        [SwaggerResponse(200, "Uspješno obrisan proizvod")]
        [SwaggerResponse(404, "Proizvod nije pronađen")]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Proizvod? e;
                try
                {
                    e = _context.Proizvodi.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Proizvod ne postoji u bazi" });
                }
                _context.Proizvodi.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }
    }
}

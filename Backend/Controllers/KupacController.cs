using AutoMapper;
using Backend.Data;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Swashbuckle.AspNetCore.Annotations;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class KupacController(InventorijaContext context, IMapper mapper) : InventorijaController(context, mapper)
    {

        [HttpGet]
        [SwaggerOperation(Summary = "Ruta koja dohvaća sve kupce", Description = "Vraća listu svih kupaca.")]
        [SwaggerResponse(200, "Uspješno dohvaćeni kupci", typeof(List<KupacDTORead>))]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public ActionResult<List<KupacDTORead>> Get()        
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<KupacDTORead>>(_context.Kupci.ToList()));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }

        [HttpGet]
        [Route("{sifra:int}")]
        [SwaggerOperation(Summary = "Dohvati kupca po šifri", Description = "Vraća kupca prema zadanoj šifri.")]
        [SwaggerResponse(200, "Uspješno dohvaćen kupac", typeof(KupacDTORead))]
        [SwaggerResponse(404, "Kupac nije pronađen")]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public ActionResult<KupacDTORead> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Kupac? e;
            try
            {
                e = _context.Kupci.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Kupac ne postoji u bazi" });
            }

            return Ok(_mapper.Map<KupacDTORead>(e));
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Dodaj novog kupca", Description = "Dodaje novog kupca u bazu podataka.")]
        [SwaggerResponse(201, "Uspješno dodan kupac", typeof(KupacDTORead))]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public IActionResult Post(KupacDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = mapper.Map<Kupac>(dto);
                _context.Kupci.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<KupacDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        [SwaggerOperation(Summary = "Ažuriraj kupca", Description = "Ažurira podatke postojećeg kupca prema zadanoj šifri.")]
        [SwaggerResponse(200, "Uspješno ažuriran kupac")]
        [SwaggerResponse(404, "Kupac nije pronađen")]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public IActionResult Put(int sifra, KupacDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Kupac? e;
                try
                {
                    e = _context.Kupci.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Kupac ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);

                _context.Kupci.Update(e);
                _context.SaveChanges();

                return Ok(new { poruka = "Uspješno promjenjeno" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }


        [HttpDelete]
        [Route("{sifra:int}")]
        [SwaggerOperation(Summary = "Obriši kupca", Description = "Briše kupca prema zadanoj šifri.")]
        [SwaggerResponse(200, "Uspješno obrisan kupac")]
        [SwaggerResponse(404, "Kupac nije pronađen")]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Kupac? e;
                try
                {
                    e = _context.Kupci.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Kupac ne postoji u bazi");
                }
                _context.Kupci.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }


        [HttpGet]
        [Route("trazi")]
        [SwaggerOperation(Summary = "Traži kupca", Description = "Pretražuje kupce prema upisanim slovima.")]
        [SwaggerResponse(200, "Uspješno dohvaćen kupac", typeof(List<KupacDTORead>))]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public ActionResult<List<KupacDTORead>> Trazi(string uvjet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var kupci = _context.Kupci.Where(k => k.Ime.Contains(uvjet) || k.Prezime.Contains(uvjet)).ToList();
                return Ok(_mapper.Map<List<KupacDTORead>>(kupci));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }


        }

    }

}


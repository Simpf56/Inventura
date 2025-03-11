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
    public class NabavljacController(InventorijaContext context, IMapper mapper) : InventorijaController(context, mapper)
    {

        [HttpGet]
        [SwaggerOperation(Summary = "Ruta koja dohvaća sve nabavljače", Description = "Vraća listu svih nabavljača.")]
        [SwaggerResponse(200, "Uspješno dohvaćeni nabavljači", typeof(List<NabavljacDTORead>))]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public ActionResult<List<NabavljacDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<NabavljacDTORead>>(_context.Nabavljaci));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }

        }

        [HttpGet]
        [Route("{sifra:int}")]
        [SwaggerOperation(Summary = "Dohvati nabavljača po šifri", Description = "Vraća nabavljača prema zadanoj šifri.")]
        [SwaggerResponse(200, "Uspješno dohvaćen nabavljač", typeof(NabavljacDTORead))]
        [SwaggerResponse(404, "Nabavljač nije pronađen")]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public ActionResult<NabavljacDTORead> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Nabavljac? e;
            try
            {
                e = _context.Nabavljaci.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Nabavljač ne postoji u bazi" });
            }

            return Ok(_mapper.Map<NabavljacDTORead>(e));
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Dodaj novog nabavljača", Description = "Dodaje novog nabavljača u bazu podataka.")]
        [SwaggerResponse(201, "Uspješno dodan nabavljač", typeof(NabavljacDTORead))]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public IActionResult Post(NabavljacDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = mapper.Map<Nabavljac>(dto);
                _context.Nabavljaci.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<NabavljacDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        [SwaggerOperation(Summary = "Ažuriraj nabavljača", Description = "Ažurira podatke postojećeg nabavljača prema zadanoj šifri.")]
        [SwaggerResponse(200, "Uspješno ažuriran nabavljač")]
        [SwaggerResponse(404, "Nabavljač nije pronađen")]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public IActionResult Put(int sifra, NabavljacDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Nabavljac? e;
                try
                {
                    e = _context.Nabavljaci.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Nabavljač ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);

                _context.Nabavljaci.Update(e);
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
        [SwaggerOperation(Summary = "Obriši nabavljača", Description = "Briše nabavljača prema zadanoj šifri.")]
        [SwaggerResponse(200, "Uspješno obrisan nabavljač")]
        [SwaggerResponse(404, "Nabavljač nije pronađen")]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Nabavljac? e;
                try
                {
                    e = _context.Nabavljaci.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound("Nabavljač ne postoji u bazi");
                }
                _context.Nabavljaci.Remove(e);
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
        [SwaggerOperation(Summary = "Traži nabavljaća", Description = "Pretražuje nabavljaće prema upisanim slovima.")]
        [SwaggerResponse(200, "Uspješno dohvaćen nabavljać", typeof(List<NabavljacDTORead>))]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public ActionResult<List<NabavljacDTORead>> Trazi(string uvjet)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var nabavljaci = _context.Nabavljaci.Where(k => k.Naziv.Contains(uvjet)).ToList();
                return Ok(_mapper.Map<List<NabavljacDTORead>>(nabavljaci));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }


        }

    }

}
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
    public class NarudzbaController(InventorijaContext context, IMapper mapper) : InventorijaController(context, mapper)
    {

        [HttpGet]
        [SwaggerOperation(Summary = "Ruta koja dohvaća sve narudžbe", Description = "Vraća listu svih narudžbi.")]
        [SwaggerResponse(200, "Uspješno dohvaćene narudžbe", typeof(List<NarudzbaDTORead>))]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public ActionResult<List<NarudzbaDTORead>> Get()
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                return Ok(_mapper.Map<List<NarudzbaDTORead>>(_context.Narudzbe.Include(n=>n.Kupac).ToList()));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpGet]
        [Route("{sifra:int}")]
        [SwaggerOperation(Summary = "Dohvati narudžbu po šifri", Description = "Vraća narudžbu prema zadanoj šifri.")]
        [SwaggerResponse(200, "Uspješno dohvaćena narudžba", typeof(NarudzbaDTORead))]
        [SwaggerResponse(404, "Narudžba nije pronađena")]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public ActionResult<NarudzbaDTORead> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Narudzba? e;
            try
            {
                e = _context.Narudzbe.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Narudžba ne postoji u bazi" });
            }

            return Ok(_mapper.Map<NarudzbaDTORead>(e));
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Dodaj novu narudžbu", Description = "Dodaje novu narudžbu u bazu podataka.")]
        [SwaggerResponse(201, "Uspješno dodana narudžba", typeof(NarudzbaDTORead))]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public IActionResult Post(NarudzbaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }

            Kupac? es;
            try
            {
                es = _context.Kupci.Find(dto.KupacSifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (es == null)
            {
                return NotFound(new { poruka = "Kupac ne postoji u bazi" });
            }


            try
            {
                var e = mapper.Map<Narudzba>(dto);
                e.Kupac = es;
                _context.Narudzbe.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<NarudzbaDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        [SwaggerOperation(Summary = "Ažuriraj narudžbu", Description = "Ažurira podatke postojeće narudžbe prema zadanoj šifri.")]
        [SwaggerResponse(200, "Uspješno ažurirana narudžba")]
        [SwaggerResponse(404, "Narudžba nije pronađena")]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public IActionResult Put(int sifra, NarudzbaDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Narudzba? e;
                try
                {
                    e = _context.Narudzbe.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Narudžba ne postoji u bazi" });
                }

                e = _mapper.Map(dto, e);

                _context.Narudzbe.Update(e);
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
        [SwaggerOperation(Summary = "Obriši narudžbu", Description = "Briše narudžbu prema zadanoj šifri.")]
        [SwaggerResponse(200, "Uspješno obrisana narudžba")]
        [SwaggerResponse(404, "Narudžba nije pronađena")]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Narudzba? e;
                try
                {
                    e = _context.Narudzbe.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Narudžba ne postoji u bazi" });
                }
                _context.Narudzbe.Remove(e);
                _context.SaveChanges();
                return Ok(new { poruka = "Uspješno obrisano" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }


        [HttpGet]
        [Route("{sifraNarudzbe:int}/stavke")]
        [SwaggerOperation(Summary = "Dohvati stavku u narudžbi", Description = "Vraća stavku u narudžbi prema zadanoj šifri narudžbe.")]
        [SwaggerResponse(200, "Uspješno dohvaćena stavka narudžbe", typeof(List<Stavka_NarudzbeDTORead>))]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public ActionResult<List<Stavka_NarudzbeDTORead>> GetStavke(int sifraNarudzbe)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var stavke = _context.Stavke_Narudzbe
                .Include(s => s.Proizvod)
                .Include(s => s.Narudzba)
                .Where(s => s.Narudzba.Sifra == sifraNarudzbe)
                .ToList();

            
                return Ok(_mapper.Map<List<Stavka_NarudzbeDTORead>>(stavke));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }
    }
}


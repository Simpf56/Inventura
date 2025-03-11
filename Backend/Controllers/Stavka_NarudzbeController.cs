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
    public class Stavka_NarudzbeController(InventorijaContext context, IMapper mapper) : InventorijaController(context, mapper)
    {

        [HttpGet]
        [SwaggerOperation(Summary = "Ruta koja dohvaća sve stavke narudžbe", Description = "Vraća listu svih stavki narudžbe.")]
        [SwaggerResponse(200, "Uspješno dohvaćene stavke narudžbi", typeof(List<Stavka_NarudzbeDTORead>))]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public ActionResult<List<Stavka_NarudzbeDTORead>> Get()
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
                .ToList();

                if (stavke == null || !stavke.Any())
                {
                    return Ok(_mapper.Map<List<Stavka_NarudzbeDTORead>>(_context.Stavke_Narudzbe.Include(g => g.Proizvod).Include(g => g.Narudzba)));
                }
                return Ok(_mapper.Map<List<Stavka_NarudzbeDTORead>>(stavke));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpGet]
        [Route("{sifra:int}")]
        [SwaggerOperation(Summary = "Dohvati stavku narudžbe po šifri", Description = "Vraća stavku narudžbe prema zadanoj šifri.")]
        [SwaggerResponse(200, "Uspješno dohvaćena stavka narudžbe", typeof(Stavka_NarudzbeDTORead))]
        [SwaggerResponse(404, "Stavka narudžbe nije pronađena")]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public ActionResult<Stavka_NarudzbeDTORead> GetBySifra(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            Stavka_Narudzbe? e;
            try
            {
                e = _context.Stavke_Narudzbe.Find(sifra);
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
            if (e == null)
            {
                return NotFound(new { poruka = "Stavka narudžbe ne postoji u bazi" });
            }

            return Ok(_mapper.Map<Stavka_NarudzbeDTORead>(e));
        }

        [HttpPost]
        [SwaggerOperation(Summary = "Dodaj novu stavku narudžbe", Description = "Dodaje novu stavku narudžbe u bazu podataka.")]
        [SwaggerResponse(201, "Uspješno dodana stavka narudžbe", typeof(Stavka_NarudzbeDTORead))]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public IActionResult Post(Stavka_NarudzbeDTOInsertUpdate dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                var e = mapper.Map<Stavka_Narudzbe>(dto);
                _context.Stavke_Narudzbe.Add(e);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, _mapper.Map<Stavka_NarudzbeDTORead>(e));
            }
            catch (Exception ex)
            {
                return BadRequest(new { poruka = ex.Message });
            }
        }

        [HttpPut]
        [Route("{sifra:int}")]
        [Produces("application/json")]
        [SwaggerOperation(Summary = "Ažuriraj stavku narudžbe", Description = "Ažurira podatke postojeće stavke narudžbe prema zadanoj šifri.")]
        [SwaggerResponse(200, "Uspješno ažurirana stavka narudžbe")]
        [SwaggerResponse(404, "Stavka narudžbe nije pronađena")]
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

                // Mapiranje DTO na entitet, postavljanje Kupca putem KupacSifra
                e = _mapper.Map(dto, e);

                // Provjera dolaznog DTO-a
                Console.WriteLine($"KupacSifra (nakon mapiranja): {e.Kupac?.Sifra}");

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
        [SwaggerOperation(Summary = "Obriši stavku narudžbe", Description = "Briše stavku narudžbe prema zadanoj šifri.")]
        [SwaggerResponse(200, "Uspješno obrisana stavka narudžbe")]
        [SwaggerResponse(404, "Stavka narudžbe nije pronađena")]
        [SwaggerResponse(400, "Neispravan zahtjev")]
        public IActionResult Delete(int sifra)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { poruka = ModelState });
            }
            try
            {
                Stavka_Narudzbe? e;
                try
                {
                    e = _context.Stavke_Narudzbe.Find(sifra);
                }
                catch (Exception ex)
                {
                    return BadRequest(new { poruka = ex.Message });
                }
                if (e == null)
                {
                    return NotFound(new { poruka = "Stavka narudžbe ne postoji u bazi" });
                }
                _context.Stavke_Narudzbe.Remove(e);
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


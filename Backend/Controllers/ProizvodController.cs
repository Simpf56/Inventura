using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

[Route("api/[controller]")]
[ApiController]
public class ProizvodController : ControllerBase
{
    private static List<Proizvodi> proizvodi = new List<Proizvodi>
    {
        new Proizvodi { Sifra = 1, Naziv = "Laptop", Cijena = 1200.50m, Nabavljaci = 1 },
        new Proizvodi { Sifra = 2, Naziv = "Monitor", Cijena = 300.75m, Nabavljaci = 2 }
    };

    [HttpGet]
    public ActionResult<IEnumerable<Proizvodi>> GetProizvodi()
    {
        return Ok(proizvodi);
    }
}

using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Nabavljac : Entitet
    {
        public string Ime { get; set; } = "";
        public string Prezime { get; set; } = "";
        public string Naziv { get; set; } = "";
        public string Kontakt { get; set; } = "";
        public string Br_tel { get; set; } = "";

        
        public ICollection<Proizvod> Proizvodi { get; } = [];

    }
}

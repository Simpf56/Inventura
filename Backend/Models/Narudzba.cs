using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Narudzba : Entitet
    {
        public decimal Ukupan_iznos { get; set; }
        public DateOnly Datum { get; set; }
        public string Status { get; set; } = "";

        [ForeignKey("kupac")]
        public int? KupacSifra { get; set; }
        public Kupac? Kupac { get; set; }

        public ICollection<Stavka_Narudzbe> Stavke_Narudzbe { get; } = [];


    }
}

using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Proizvod : Entitet
    {
        public string Naziv { get; set; }
        public decimal Cijena { get; set; }
        
        [ForeignKey("nabavljac")]
        public Nabavljac Nabavljac { get; set; }

        public ICollection<Stavka_Narudzbe> Stavke_Narudzbe { get; } = [];

    }
}

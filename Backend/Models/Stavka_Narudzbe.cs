using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Stavka_Narudzbe : Entitet
    {
        public int Kolicina { get; set; }
        public decimal Cijena { get; set; }
        [ForeignKey("proizvod")]
        public Proizvod Proizvod { get; set; }

        [ForeignKey("narudzba")]
        public Narudzba Narudzba { get; set; }
    }
}

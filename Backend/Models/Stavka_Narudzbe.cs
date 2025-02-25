using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Stavka_Narudzbe : Entitet
    {
        public int Kolicina { get; set; }
        public decimal Cijena { get; set; }

        [ForeignKey("proizvod")]
        [Column("proizvod")]
        public int? ProizvodSifra { get; set; }
        public Proizvod Proizvod { get; set; }


        [ForeignKey("narudzba")]
        [Column("narudzba")]
        public int? NarudzbaSifra { get; set; }
        public Narudzba Narudzba { get; set; }
    }
}

using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    public class Stavka_Narudzbe : Entitet
    {
        public int Kolicina { get; set; }
        public decimal Cijena { get; set; }
        public int ProizvodSifra { get; set; }
        public Proizvod Proizvod { get; set; }

        public int NarudzbaSifra { get; set; }
        public Narudzba Narudzba { get; set; }
    }
}

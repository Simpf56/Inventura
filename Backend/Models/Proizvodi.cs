namespace Backend.Models
{
    public class Proizvodi: Entitet
    {
        public string Naziv { get; set; }
        public decimal Cijena { get; set; }
        public int Nabavljaci { get; set; }
    }
}

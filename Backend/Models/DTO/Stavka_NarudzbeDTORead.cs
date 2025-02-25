using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    public record Stavka_NarudzbeDTORead(
        int Sifra,
        int? Kolicina,
        decimal? Cijena,
        string? ProizvodNaziv,
        string? NarudzbaNaziv
        );
}

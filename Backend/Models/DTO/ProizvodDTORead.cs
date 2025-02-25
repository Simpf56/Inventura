namespace Backend.Models.DTO
{
    public record ProizvodDTORead(
        int Sifra,
        string? Naziv,
        decimal? Cijena,
        string NabavljacNaziv
        );
}

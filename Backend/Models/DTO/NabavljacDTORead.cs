namespace Backend.Models.DTO
{
    public record NabavljacDTORead(
    int Sifra,
    string? Ime,
    string? Prezime,
    string? Naziv,
    string? Kontakt,
    string? Br_tel
        );
}

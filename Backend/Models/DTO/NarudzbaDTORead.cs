namespace Backend.Models.DTO
{
    public record NarudzbaDTORead(
    int Sifra,
    int? Ukupan_iznos,
    DateOnly? Datum, 
    string? Status, 
    string? KupacPrezime
    );
}

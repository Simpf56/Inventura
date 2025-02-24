namespace Backend.Models.DTO
{
    public record NarudzbaDTORead(
    int Sifra,
    decimal? Ukupan_iznos,
    DateOnly? Datum, 
    string? Status, 
    int? KupacSifra
    );
}

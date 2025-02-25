namespace Backend.Models.DTO
{
    public record KupacDTORead(
    int Sifra,
    string? Ime, 
    string? Prezime, 
    string? Br_tel,
    string? Adresa,
    DateOnly? Datum_rod
        );
}



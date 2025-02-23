namespace Backend.Models.DTO
{
    public record KupacDTORead(
        int Sifra,
        Ime? string,
        Prezime? string,
        Br_tel string,
        Adresa string,
        Datum_rod DateOnly);
}


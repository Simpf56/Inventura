using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    public record NarudzbaDTOInsertUpdate
    (
        [Range(0, 10000, ErrorMessage = "Vrijednost {0} mora biti između {1} i {2}")]
        decimal Ukupan_iznos,
        DateOnly Datum,
        string Status,
        int KupacSifra
    );
}

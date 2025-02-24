using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    public record KupacDTOInsertUpdate(
        [Required(ErrorMessage = "Ime obavezno")]
        string Ime,
        [Required(ErrorMessage = "Prezime obavezno")]
        string Prezime,
        [Required(ErrorMessage = "Broj telefona obavezan")]
        string Br_tel,
        [Required(ErrorMessage = "Adresa obavezna")]
        string Adresa,
        [Required(ErrorMessage = "Datum rođenja obavezan")]        
        DateOnly Datum_rod
        );
}

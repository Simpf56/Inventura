using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    public record NabavljacDTOInsertUpdate(
        [Required(ErrorMessage = "Ime obavezno")]
        string Ime,
        [Required(ErrorMessage = "Prezime obavezno")]
        string Prezime,
        [Required(ErrorMessage = "Naziv obavezan")]
        string Naziv,
        [Required(ErrorMessage = "Adresa obavezna")]
        string Adresa
        );
}


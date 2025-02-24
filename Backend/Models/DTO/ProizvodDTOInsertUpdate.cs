using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    public record ProizvodDTOInsertUpdate(
        [Required(ErrorMessage = "Naziv obavezan")]
        string Naziv,
        [Range(0, 10000, ErrorMessage = "Vrijednost {0} mora biti između {1} i {2}")]
        decimal Cijena,
        int NabavljacSifra
        );
}

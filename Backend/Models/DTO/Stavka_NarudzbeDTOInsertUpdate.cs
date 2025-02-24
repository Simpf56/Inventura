using System.ComponentModel.DataAnnotations;

namespace Backend.Models.DTO
{
    public record Stavka_NarudzbeDTOInsertUpdate(
        [Range(1, 10000, ErrorMessage = "{0} mora biti između {1} i {2}")]
        [Required(ErrorMessage = "Najveći broj stavki obavezan")]
        int Kolicina,
        [Range(0, 10000, ErrorMessage = "Vrijednost {0} mora biti između {1} i {2}")]
        decimal Cijena,
        int ProizvodSifra,
        int NarudzbaSifra
        );
}

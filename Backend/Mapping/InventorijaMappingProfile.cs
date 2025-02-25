using AutoMapper;
using Backend.Models;
using Backend.Models.DTO;
namespace Backend.Mapping
{
    public class InventorijaMappingProfile : Profile
    {
        public InventorijaMappingProfile()
        {
            CreateMap<Kupac, KupacDTORead>();
            CreateMap<KupacDTOInsertUpdate, Kupac>();

            CreateMap<Nabavljac, NabavljacDTORead>();
            CreateMap<NabavljacDTOInsertUpdate, Nabavljac>();

            CreateMap<Narudzba, NarudzbaDTORead>()
                .ForCtorParam(
                    "KupacPrezime",
                    opt => opt.MapFrom(src => src.Kupac.Prezime)
                );
            CreateMap<NarudzbaDTOInsertUpdate, Narudzba>();

            CreateMap<Proizvod, ProizvodDTORead>();
            CreateMap<ProizvodDTOInsertUpdate, Proizvod>();

            CreateMap<Stavka_Narudzbe, Stavka_NarudzbeDTORead>()
                .ForMember(dest => dest.Cijena, opt => opt.MapFrom(src => src.Cijena.ToString("F2")))
                .ForMember(dest => dest.ProizvodNaziv, opt => opt.MapFrom(src => src.Proizvod!.Sifra))
                .ForMember(dest => dest.NarudzbaNaziv, opt => opt.MapFrom(src => src.Narudzba!.Sifra));
            CreateMap<Stavka_NarudzbeDTOInsertUpdate, Stavka_Narudzbe>();

        }
    }
}

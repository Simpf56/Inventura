﻿using AutoMapper;
using Backend.Models;
using Backend.Models.DTO;
using Microsoft.EntityFrameworkCore;
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
                    opt => opt.MapFrom(src => src.Kupac.Prezime != null ? src.Kupac.Prezime : "Nepoznato")
                );
            CreateMap<NarudzbaDTOInsertUpdate, Narudzba>();

            CreateMap<Proizvod, ProizvodDTORead>()
                .ForCtorParam(
                "NabavljacNaziv",
                opt => opt.MapFrom(src => src.Nabavljac != null ? src.Nabavljac.Naziv : "Nepoznato")
                );
            CreateMap<ProizvodDTOInsertUpdate, Proizvod>();

            CreateMap<Stavka_Narudzbe, Stavka_NarudzbeDTORead>()
                .ForCtorParam(
                    "Cijena",
                    opt => opt.MapFrom(src => src.Cijena.ToString("F2"))
                )
                .ForCtorParam(
                    "ProizvodNaziv",
                    opt => opt.MapFrom(src => src.Proizvod.Naziv)
                )
                .ForCtorParam(
                    "NarudzbaNaziv",
                    opt => opt.MapFrom(src => src.Narudzba.Sifra)
                );
            CreateMap<Stavka_NarudzbeDTOInsertUpdate, Stavka_Narudzbe>();

        }
    }
}

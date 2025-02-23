using Backend.Models;
namespace Backend.Mapping
{
    public class InventorijaMappingProfile
    {
        CreateMap<Kupac, KupacDTORead>();
            CreateMap<SmjerDTOInsertUpdate, Smjer>();

            CreateMap<Nabavljac, NabavljacDTORead>();
            CreateMap<NabavljacDTOInsertUpdate, Nabavljac>();
    }
}

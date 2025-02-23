using AutoMapper;
using Backend.Data;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    public abstract class InventorijaController : ControllerBase
    {

        protected readonly InventorijaContext _context;

        protected readonly IMapper _mapper;
        
        public InventorijaController(InventorijaContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
    }
}

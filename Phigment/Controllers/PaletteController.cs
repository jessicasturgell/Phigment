using Microsoft.AspNetCore.Mvc;
using Phigment.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Phigment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaletteController : ControllerBase
    {
        private readonly IPaletteRepository _paletteRepository;
        public PaletteController(IPaletteRepository paletteRepository)
        {
            _paletteRepository = paletteRepository;
        }

        // GET: api/<PaletteController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_paletteRepository.GetAll());
        }
    }
}

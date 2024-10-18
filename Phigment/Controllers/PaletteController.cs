using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Phigment.Models;
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
        public IActionResult GetAll()
        {
            return Ok(_paletteRepository.GetAll());
        }

        // GET: api/<PaletteController>/GetAllByUserId/5
        [HttpGet("GetAllByUserId/{userId}")]
        public IActionResult GetAllByUserId(int userId)
        {
            var palettes = _paletteRepository.GetAllByUserId(userId);
            if (palettes == null)
            {
                return NotFound();
            }
            return Ok(palettes);
        }

        // GET: api/<PaletteController>/GetAllByUserId/5
        [HttpGet("GetAllByUserIdWithSwatches/{id}")]
        public IActionResult GetAllByUserIdWithSwatches(int id)
        {
            var palettes = _paletteRepository.GetAllByUserIdWithSwatches(id);
            if (palettes == null)
            {
                return NotFound();
            }
            return Ok(palettes);
        }

        // GET: api/<PaletteController>/GetAllUserProfilePalettesByUserIdWithSwatches/5
        [HttpGet("GetAllUserProfilePalettesByUserIdWithSwatches/{id}")]
        public IActionResult GetAllUserProfilePalettesByUserIdWithSwatches(int id)
        {
            var palettes = _paletteRepository.GetAllUserProfilePalettesByUserIdWithSwatches(id);
            if (palettes == null)
            {
                return NotFound();
            }
            return Ok(palettes);
        }

        // GET: api/<PaletteController>/GetAllByProjectId/5
        [HttpGet("GetAllByProjectIdWithSwatches/{id}")]
        public IActionResult GetAllByProjectIdWithSwatches(int id)
        {
            var palettes = _paletteRepository.GetAllByProjectIdWithSwatches(id);
            if (palettes == null)
            {
                return NotFound();
            }
            return Ok(palettes);
        }

        // GET: api/<PaletteController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var palette = _paletteRepository.GetById(id);

            if (palette == null)
            {
                return NotFound();
            }
            return Ok(palette);
        }

        // GET: api/<PaletteController>/GetByIdWithSwatches/5
        [HttpGet("GetByIdWithSwatches/{id}")]
        public IActionResult GetByIdWithSwatches(int id)
        {
            var palette = _paletteRepository.GetByPaletteIdWithSwatches(id);

            if (palette == null)
            {
                return NotFound();
            }
            return Ok(palette);
        }

        // POST api/<PaletteController>
        [HttpPost]
        public IActionResult Palette(Palette palette)
        {
            _paletteRepository.Add(palette);
            return CreatedAtAction("GetById", new { id = palette.Id }, palette);
        }

        // PUT api/<PaletteController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Palette palette)
        {
            if (id != palette.Id)
            {
                return BadRequest();
            }

            _paletteRepository.Update(palette);
            return NoContent();
        }

        // DELETE api/<PaletteController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _paletteRepository.Delete(id);
            return NoContent();
        }
    }
}

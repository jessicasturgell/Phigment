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

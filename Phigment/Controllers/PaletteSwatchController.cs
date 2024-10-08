using Microsoft.AspNetCore.Mvc;
using Phigment.Models;
using Phigment.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Phigment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaletteSwatchController : ControllerBase
    {
        private readonly IPaletteSwatchRepository _paletteSwatchRepository;
        public PaletteSwatchController(IPaletteSwatchRepository paletteSwatchRepository)
        {
            _paletteSwatchRepository = paletteSwatchRepository;
        }

        // GET: api/<PaletteSwatchController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_paletteSwatchRepository.GetAll());
        }

        // GET api/<PaletteSwatchController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var paletteSwatch = _paletteSwatchRepository.GetById(id);

            if (paletteSwatch == null)
            {
                return NotFound();
            }
            return Ok(paletteSwatch);
        }

        // POST api/<PaletteSwatchController>
        [HttpPost]
        public IActionResult PaletteSwatch(PaletteSwatch paletteSwatch)
        {
            _paletteSwatchRepository.Add(paletteSwatch);
            return CreatedAtAction("Get", new { id = paletteSwatch.Id }, paletteSwatch);
        }

        // PUT api/<PaletteSwatchController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, PaletteSwatch paletteSwatch)
        {
            if (id != paletteSwatch.Id)
            {
                return BadRequest();
            }

            _paletteSwatchRepository.Update(paletteSwatch);
            return NoContent();
        }

        // DELETE api/<PaletteSwatchController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _paletteSwatchRepository.Delete(id);
            return NoContent();
        }
    }
}

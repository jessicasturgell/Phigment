using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using Phigment.Models;
using Phigment.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Phigment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SwatchController : ControllerBase
    {
        private readonly ISwatchRepository _swatchRepository;
        public SwatchController(ISwatchRepository swatchRepository)
        {
            _swatchRepository = swatchRepository;
        }

        // GET: api/<SwatchController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_swatchRepository.GetAll());
        }

        // GET: api/<SwatchController>/GetAllByUserId/5
        [HttpGet("GetAllByUserId/{userId}")]
        public IActionResult GetAllByUserId(int userId)
        {
            var swatches = _swatchRepository.GetAllByUserId(userId);
            if (swatches == null)
            {
                return NotFound();
            }
            return Ok(swatches);
        }

        // GET api/<SwatchController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var swatch = _swatchRepository.GetById(id);

            if (swatch == null)
            {
                return NotFound();
            }
            return Ok(swatch);
        }

        // POST api/<SwatchController>
        [HttpPost]
        public IActionResult Swatch(Swatch swatch)
        {
            _swatchRepository.Add(swatch);
            return CreatedAtAction("Get", new { id = swatch.Id }, swatch);
        }

        // PUT api/<SwatchController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Swatch swatch)
        {
            if (id != swatch.Id)
            {
                return BadRequest();
            }

            _swatchRepository.Update(swatch);
            return NoContent();
        }

        // DELETE api/<SwatchController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _swatchRepository.Delete(id);
            return NoContent();
        }

        // GET: api/<SwatchController>/GetByPaletteId/5
        [HttpGet("GetByPaletteId/{id}")]
        public IActionResult GetByPaletteId(int id)
        {
            var swatches = _swatchRepository.GetByPaletteId(id);
            if (swatches == null)
            {
                return NotFound();
            }
            return Ok(swatches);
        }
    }
}

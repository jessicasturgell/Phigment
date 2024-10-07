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

        // DELETE api/<SwatchController>/5
    }
}

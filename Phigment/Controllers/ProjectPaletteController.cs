using Microsoft.AspNetCore.Mvc;
using Phigment.Models;
using Phigment.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Phigment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectPaletteController : ControllerBase
    {
        private readonly IProjectPaletteRepository _projectPaletteRepository;
        public ProjectPaletteController(IProjectPaletteRepository projectPaletteRepository)
        {
            _projectPaletteRepository = projectPaletteRepository;
        }

        // GET: api/<ProjectPaletteController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ProjectPaletteController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var projectPalette = _projectPaletteRepository.GetById(id);

            if (projectPalette == null)
            {
                return NotFound();
            }
            return Ok(projectPalette);
        }

        // POST api/<ProjectPaletteController>
        [HttpPost]
        public IActionResult Post(ProjectPalette projectPalette)
        {
            _projectPaletteRepository.Add(projectPalette);
            return CreatedAtAction("Get", new { id = projectPalette.Id }, projectPalette);
        }

        // PUT api/<ProjectPaletteController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProjectPaletteController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _projectPaletteRepository.Delete(id);
            return NoContent();
        }
    }
}

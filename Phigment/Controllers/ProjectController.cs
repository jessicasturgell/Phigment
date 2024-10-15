using Microsoft.AspNetCore.Mvc;
using Phigment.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Phigment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepository;
        public ProjectController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        // GET: api/<ProjectController>
        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_projectRepository.GetAll());
        }

        // GET api/<ProjectController>/GetAllByUserId/5
        [HttpGet("GetAllByUserId/{id}")]
        public IActionResult GetAllByUserId(int id)
        {
            var projects = _projectRepository.GetAllByUserId(id);
            if (projects == null)
            {
                return NotFound();
            }
            return Ok(projects);
        }

        // GET api/<ProjectController>/5

        // POST api/<ProjectController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<ProjectController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<ProjectController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

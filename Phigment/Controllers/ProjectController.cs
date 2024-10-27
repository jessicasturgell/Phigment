using Microsoft.AspNetCore.Mvc;
using Phigment.Models;
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

        // GET: api/<ProjectController>/GetAllUserProfileProjectByUserId/5
        [HttpGet("GetAllUserProfileProjectsByUserId/{id}")]
        public IActionResult GetAllUserProfileProjectByUserId(int id)
        {
            var projects = _projectRepository.GetAllUserProfileProjectsByUserId(id);
            if (projects == null)
            {
                return NotFound();
            }
            return Ok(projects);
        }

        // GET api/<ProjectController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var project = _projectRepository.GetById(id);

            if (project == null)
            {
                return NotFound();
            }
            return Ok(project);
        }

        // POST api/<ProjectController>
        [HttpPost]
        public IActionResult Post(Project project)
        {
            project.Notes = "";
            project.IsPublic = false;
            _projectRepository.Add(project);
            return CreatedAtAction("Get", new { id = project.Id }, project);
        }

        // PUT api/<ProjectController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            _projectRepository.Update(project);
            return NoContent();
        }

        // DELETE api/<ProjectController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _projectRepository.Delete(id);
            return NoContent();
        }
    }
}

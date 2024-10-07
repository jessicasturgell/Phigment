using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Phigment.Models;
using Phigment.Repositories;

namespace Phigment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;
        public UserController (IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_userRepository.GetAll());
        }

        [HttpGet("GetUserByDisplayName")]
        public IActionResult GetByDisplayName(string displayName)
        {
            var user = _userRepository.GetUserByDisplayName(displayName);

            if (displayName == null || user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        [HttpPost]
        public IActionResult Post(User user)
        {
            _userRepository.Add(user);
            return CreatedAtAction("Get", new { id = user.Id }, user);
        }
    }
}

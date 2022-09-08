using Besedo.API.Data.Repos;
using Besedo.API.DTOs;
using Besedo.API.Exceptions;
using Besedo.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Besedo.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {

        private readonly ILogger<UsersController> logger;
        private readonly IUsersRepo usersRepo;

        public UsersController(ILogger<UsersController> logger, IUsersRepo usersRepo)
        {
            this.logger = logger;
            this.usersRepo = usersRepo;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            try
            {
                return Ok(await usersRepo.GetUsers());
            }
            catch (Exception e)
            {
                logger.LogError(e.Message);
                return StatusCode(StatusCodes.Status500InternalServerError, e.Message);
            }

        }
        [HttpPut]
        public async Task<IActionResult> Put(User user)
        {
            try
            {
                await usersRepo.UpdateUser(user);
                logger.LogInformation($"User with ID {user.Id} updated.");
                return Ok();
            }
            catch (BesedoException e)
            {
                logger.LogError(e.Message);
                return StatusCode(e.StatusCode, e.Message);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await usersRepo.DeleteUser(id);
                logger.LogInformation($"User with ID {id} deleted.");
                return StatusCode(StatusCodes.Status204NoContent);
            }
            catch (BesedoException e)
            {
                logger.LogError(e.Message);
                return StatusCode(e.StatusCode, e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(UserDto userDto)
        {
            try
            {
                var newUser = await usersRepo.CreateUser(userDto);
                logger.LogInformation($"User with ID {newUser.Id} created.");
                return Ok(newUser);
            }
            catch (BesedoException e)
            {
                logger.LogError(e.Message);
                return StatusCode(e.StatusCode, e.Message);
            }
        }

    }
}
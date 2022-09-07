using Besedo.API.Data.Repos;
using Besedo.API.DTOs;
using Besedo.API.Exceptions;
using Besedo.API.Models;
using Microsoft.AspNetCore.Mvc;

namespace Besedo.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepo usersRepo;

        public UsersController(IUsersRepo usersRepo)
        {
            this.usersRepo = usersRepo;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> Get()
        {
            try
            {
                return Ok(await usersRepo.GetUsers());
            }
            catch (BesedoException e)
            {
                return StatusCode(e.StatusCode, e.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put(User user)
        {
            try
            {
                await usersRepo.UpdateUser(user);
                return Ok();
            }
            catch (BesedoException e)
            {
                return StatusCode(e.StatusCode, e.Message);
            }
        }

        [HttpDelete]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                await usersRepo.DeleteUser(id);
                return StatusCode(StatusCodes.Status204NoContent);
            }
            catch (BesedoException e)
            {
                return StatusCode(e.StatusCode, e.Message);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create(UserDto userDto)
        {
            try
            {
                var newUser = await usersRepo.CreateUser(userDto);
                return CreatedAtRoute("/api/create",newUser);
            }
            catch (BesedoException e)
            {
                return StatusCode(e.StatusCode, e.Message);
            }
        }
    }
}
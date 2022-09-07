using Besedo.API.DTOs;
using Besedo.API.Exceptions;
using Besedo.API.Models;
using Microsoft.EntityFrameworkCore;

namespace Besedo.API.Data.Repos
{
    public class UsersRepo : IUsersRepo
    {
        private readonly BesedoContext besedoContext;
        public UsersRepo(BesedoContext besedoContext)
        {
            this.besedoContext = besedoContext;
        }
        public async Task<User> CreateUser(UserDto userDto)
        {
            try
            {
                var newUser = new User() { Name = userDto.Name, Email = userDto.Email, Ip = userDto.Ip, Surname = userDto.Surname };
                await besedoContext.AddAsync(newUser);
                await besedoContext.SaveChangesAsync();
                return newUser;
            }
            catch (BesedoException e)
            {
                throw e;
            }
            catch (Exception e)
            {
                throw new BesedoException(StatusCodes.Status500InternalServerError, e.Message);
            }
        }

        public async Task DeleteUser(int id)
        {
            try
            {
                var userToDelete = await besedoContext.User.Where(u => u.Id == id).SingleOrDefaultAsync();
                if (userToDelete == null)
                {
                    throw new BesedoException(StatusCodes.Status404NotFound, "User not found");
                }

                besedoContext.User.Remove(userToDelete);
                await besedoContext.SaveChangesAsync();
            }
            catch (BesedoException e)
            {
                throw e;
            }
            catch (Exception e)
            {
                throw new BesedoException(StatusCodes.Status500InternalServerError, e.Message);

            }
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            try
            {
                return await besedoContext.User.Select(u => u).ToListAsync();
            }
            catch (Exception e)
            {
                throw new BesedoException(StatusCodes.Status500InternalServerError, e.Message);
            }

        }

        public async Task UpdateUser(User user)
        {
            try
            {

                var userToBeUpdated = besedoContext.User.Where(u => u.Id == user.Id).Select(u => u).SingleOrDefault();
                if (userToBeUpdated == null)
                    throw new BesedoException(StatusCodes.Status404NotFound, "User not found");

                userToBeUpdated.Email = user.Email;
                userToBeUpdated.Name = user.Name;
                userToBeUpdated.Surname = user.Surname;
                userToBeUpdated.Ip = user.Ip;
                await besedoContext.SaveChangesAsync();
            }
            catch (BesedoException e)
            {
                throw e;
            }
            catch (Exception e)
            {
                throw new BesedoException(StatusCodes.Status500InternalServerError, e.Message);
            }
        }
    }
}

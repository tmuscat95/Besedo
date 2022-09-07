using Besedo.API.DTOs;
using Besedo.API.Models;

namespace Besedo.API.Data.Repos
{
    public interface IUsersRepo
    {
        Task<IEnumerable<User>> GetUsers();
        Task<User> CreateUser(UserDto userDto);

        Task UpdateUser(User user);

        Task DeleteUser(int id);
    }
}

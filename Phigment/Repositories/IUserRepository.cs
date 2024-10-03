using Phigment.Models;

namespace Phigment.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAll();
        public User GetUserByDisplayName(string displayName);
    }
}
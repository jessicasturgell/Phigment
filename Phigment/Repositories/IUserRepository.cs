using Phigment.Models;

namespace Phigment.Repositories
{
    public interface IUserRepository
    {
        List<User> GetAll();
        public User GetById(int id);
        public User GetUserByDisplayName(string displayName);
        public void Add(User user);
        public void Update(User user);
        public void Delete(int id);
    }
}
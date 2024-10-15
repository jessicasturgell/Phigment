using Phigment.Models;

namespace Phigment.Repositories
{
    public interface IProjectRepository
    {
        List<Project> GetAll();
        List<Project> GetAllByUserId(int id);
    }
}
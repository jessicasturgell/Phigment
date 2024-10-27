using Phigment.Models;

namespace Phigment.Repositories
{
    public interface IProjectRepository
    {
        List<Project> GetAll();
        List<Project> GetAllByUserId(int id);
        public void Add(Project project);
        public Project GetById(int id);
        public void Delete(int id);
        public void Update(Project project);
        public List<Project> GetAllUserProfileProjectsByUserId(int id);
    }
}
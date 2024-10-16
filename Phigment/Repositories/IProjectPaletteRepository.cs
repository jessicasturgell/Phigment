using Phigment.Models;

namespace Phigment.Repositories
{
    public interface IProjectPaletteRepository
    {
        void Add(ProjectPalette projectPalette);
        ProjectPalette GetById(int id);
        public void Delete(int id);
    }
}
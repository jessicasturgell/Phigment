using Phigment.Models;

namespace Phigment.Repositories
{
    public interface IPaletteRepository
    {
        List<Palette> GetAll();
        public Palette GetById(int id);
        public void Add (Palette palette);
    }
}
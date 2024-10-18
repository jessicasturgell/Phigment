using Phigment.Models;

namespace Phigment.Repositories
{
    public interface IPaletteRepository
    {
        List<Palette> GetAll();
        public List<Palette> GetAllByUserId(int userId);
        public Palette GetById(int id);
        public void Add (Palette palette);
        public void Update(Palette palette);
        public void Delete(int id);
        public List<Palette> GetAllByUserIdWithSwatches(int id);
        public Palette GetByPaletteIdWithSwatches(int id);
        public List<Palette> GetAllByProjectIdWithSwatches(int id);
        public List<Palette> GetAllUserProfilePalettesByUserIdWithSwatches(int userId);
    }
}
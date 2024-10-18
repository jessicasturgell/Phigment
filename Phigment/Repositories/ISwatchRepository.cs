using Phigment.Models;

namespace Phigment.Repositories
{
    public interface ISwatchRepository
    {
        List<Swatch> GetAll();
        public List<Swatch> GetAllByUserId(int userId);
        public Swatch GetById(int id);
        public void Add(Swatch swatch);
        public void Update(Swatch swatch);
        public void Delete(int id);
        public List<Swatch> GetByPaletteId(int id);
    }
}
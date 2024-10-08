using Phigment.Models;

namespace Phigment.Repositories
{
    public interface ISwatchRepository
    {
        List<Swatch> GetAll();
        public Swatch GetById(int id);
        public void Add(Swatch swatch);
        public void Update(Swatch swatch);
        public void Delete(int id);
    }
}
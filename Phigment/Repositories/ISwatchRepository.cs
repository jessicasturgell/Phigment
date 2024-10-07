using Phigment.Models;

namespace Phigment.Repositories
{
    public interface ISwatchRepository
    {
        List<Swatch> GetAll();
        public Swatch GetById(int id);
        public void Add(Swatch swatch);
    }
}
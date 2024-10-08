using Phigment.Models;

namespace Phigment.Repositories
{
    public interface IPaletteSwatchRepository
    {
        void Add(PaletteSwatch paletteSwatch);
        void Delete(int id);
        List<PaletteSwatch> GetAll();
        PaletteSwatch GetById(int id);
        void Update(PaletteSwatch paletteSwatch);
    }
}
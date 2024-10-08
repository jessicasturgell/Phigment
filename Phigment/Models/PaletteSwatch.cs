namespace Phigment.Models
{
    public class PaletteSwatch
    {
        public int Id { get; set; }
        public int PaletteId { get; set; }
        public Palette? Palette { get; set; }
        public int SwatchId { get; set; }
        public Swatch? Swatch { get; set; }
    }
}

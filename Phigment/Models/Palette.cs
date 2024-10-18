namespace Phigment.Models
{
    public class Palette
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public bool IsPublic { get; set; }
        public List<Swatch>? Swatches { get; set; }
        public int ProjectPaletteId { get; set; }
    }
}

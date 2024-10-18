namespace Phigment.Models
{
    public class Swatch
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Name { get; set; }
        public string? HEX { get; set; }
        public string? RGB { get; set; }
        public string? HSL { get; set; }
        public PaletteSwatch? PaletteSwatch { get; set; }
    }
}

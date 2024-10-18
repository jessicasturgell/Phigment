namespace Phigment.Models
{
    public class Project
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string? Name { get; set; }
        public string? Blurb { get; set; }
        public string? Notes { get; set; }
        public bool IsPublic { get; set; }
        public List<Palette>? Palettes { get; set; }
    }
}

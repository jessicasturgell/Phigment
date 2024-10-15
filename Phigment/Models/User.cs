namespace Phigment.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? DisplayName { get; set; }
        public DateTime JoinDateTime { get; set; }
        public string? Bio { get; set; }
        public string? Image { get; set; }
    }
}

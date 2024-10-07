using Phigment.Models;
using Phigment.Utils;

namespace Phigment.Repositories
{
    public class PaletteRepository : BaseRepository, IPaletteRepository
    {
        public PaletteRepository(IConfiguration configuration) : base(configuration) { }
        public List<Palette> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserId, [Name], IsPublic
                        FROM Palette
";
                    var reader = cmd.ExecuteReader();

                    var palettes = new List<Palette>();
                    while (reader.Read())
                    {
                        palettes.Add(new Palette()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            IsPublic = DbUtils.GetBoolean(reader, "IsPublic"),
                        });
                    }
                    reader.Close();

                    return palettes;
                }
            }
        }
    }
}

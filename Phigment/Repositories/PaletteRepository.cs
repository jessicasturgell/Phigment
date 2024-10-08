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
        public Palette GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserId, [Name], IsPublic
                        FROM Palette
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Palette palette = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        palette = new Palette()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            IsPublic = DbUtils.GetBoolean(reader, "IsPublic")
                        };
                    }
                    reader.Close();

                    return palette;
                }
            }
        }
        public void Add(Palette palette)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Palette (UserId, [Name], IsPublic)
                                        OUTPUT INSERTED.ID
                                        VALUES (@userId, @name, @isPublic)";
                    DbUtils.AddParameter(cmd, "@userId", palette.UserId);
                    DbUtils.AddParameter(cmd, "@name", palette.Name);
                    DbUtils.AddParameter(cmd, "@isPublic", palette.IsPublic);

                    palette.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Palette palette)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Palette
                           SET UserId = @userId,
                               Name = @name,
                               IsPublic = @isPublic
                         WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@userId", palette.UserId);
                    DbUtils.AddParameter(cmd, "@name", palette.Name);
                    DbUtils.AddParameter(cmd, "@isPublic", palette.IsPublic);
                    DbUtils.AddParameter(cmd, "@id", palette.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM Palette WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

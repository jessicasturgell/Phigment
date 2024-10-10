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

        public List<Palette> GetAllByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserId, [Name], IsPublic
                        FROM Palette
                        WHERE UserId = @userId
";
                    cmd.Parameters.AddWithValue("@userId", userId);

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
        public List<Palette> GetAllByUserIdWithSwatches(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT ps.Id, ps.PaletteId, p.UserId, p.[Name] AS 'PaletteName', p.IsPublic, ps.SwatchId, s.[Name] AS 'SwatchName', s.HEX, s.RGB, s.HSL
                        FROM PaletteSwatch ps
                        LEFT JOIN Palette p
                        ON p.Id = ps.PaletteId
                        LEFT JOIN Swatch s
                        ON s.Id = ps.SwatchId
                        WHERE p.UserId = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    var reader = cmd.ExecuteReader();

                    var palettes = new List<Palette>();
                    while (reader.Read())
                    {
                        var paletteId = DbUtils.GetInt(reader, "PaletteId");

                        var existingPalette = palettes.FirstOrDefault(p => p.Id == paletteId);
                        if (existingPalette == null)
                        {
                            existingPalette = new Palette
                            {
                                Id = paletteId,
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Name = DbUtils.GetString(reader, "PaletteName"),
                                IsPublic = DbUtils.GetBoolean(reader, "IsPublic"),
                                Swatches = new List<Swatch>()
                            };

                        palettes.Add(existingPalette);

                        };

                        if (DbUtils.IsNotDbNull(reader, "SwatchId"))
                        {
                            existingPalette?.Swatches?.Add(new Swatch()
                            {
                                Id = DbUtils.GetInt(reader, "SwatchId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Name = DbUtils.GetString(reader, "SwatchName"),
                                HEX = DbUtils.GetString(reader, "HEX"),
                                RGB = DbUtils.GetString(reader, "RGB"),
                                HSL = DbUtils.GetString(reader, "HSL")
                            });
                        }
                    }

                    reader.Close();

                    return palettes;
                }
            }
        }
    }
}

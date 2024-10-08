using Phigment.Models;
using Phigment.Utils;

namespace Phigment.Repositories
{
    public class PaletteSwatchRepository : BaseRepository, IPaletteSwatchRepository
    {
        public PaletteSwatchRepository(IConfiguration configuration) : base(configuration) { }
        public List<PaletteSwatch> GetAll()
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
                        ON s.Id = ps.SwatchId";
                    var reader = cmd.ExecuteReader();

                    var paletteSwatches = new List<PaletteSwatch>();
                    while (reader.Read())
                    {
                        paletteSwatches.Add(new PaletteSwatch()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PaletteId = DbUtils.GetInt(reader, "PaletteId"),
                            Palette = new Palette()
                            {
                                Id = DbUtils.GetInt(reader, "PaletteId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Name = DbUtils.GetString(reader, "PaletteName"),
                                IsPublic = DbUtils.GetBoolean(reader, "IsPublic"),
                            },
                            SwatchId = DbUtils.GetInt(reader, "SwatchId"),
                            Swatch = new Swatch()
                            {
                                Id = DbUtils.GetInt(reader, "SwatchId"),
                                Name = DbUtils.GetString(reader, "SwatchName"),
                                HEX = DbUtils.GetString(reader, "HEX"),
                                RGB = DbUtils.GetString(reader, "RGB"),
                                HSL = DbUtils.GetString(reader, "HSL"),
                            }
                        });
                    }
                    reader.Close();

                    return paletteSwatches;
                }
            }
        }
        public PaletteSwatch GetById(int id)
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
                        WHERE ps.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    PaletteSwatch paletteSwatch = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        paletteSwatch = new PaletteSwatch()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            PaletteId = DbUtils.GetInt(reader, "PaletteId"),
                            Palette = new Palette()
                            {
                                Id = DbUtils.GetInt(reader, "PaletteId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Name = DbUtils.GetString(reader, "PaletteName"),
                                IsPublic = DbUtils.GetBoolean(reader, "IsPublic"),
                            },
                            SwatchId = DbUtils.GetInt(reader, "SwatchId"),
                            Swatch = new Swatch()
                            {
                                Id = DbUtils.GetInt(reader, "SwatchId"),
                                Name = DbUtils.GetString(reader, "SwatchName"),
                                HEX = DbUtils.GetString(reader, "HEX"),
                                RGB = DbUtils.GetString(reader, "RGB"),
                                HSL = DbUtils.GetString(reader, "HSL"),
                            }
                        };
                    }
                    reader.Close();

                    return paletteSwatch;
                }
            }
        }

        public void Add(PaletteSwatch paletteSwatch)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO PaletteSwatch (PaletteId, SwatchId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@paletteId, @swatchId)";
                    DbUtils.AddParameter(cmd, "@paletteId", paletteSwatch.PaletteId);
                    DbUtils.AddParameter(cmd, "@swatchId", paletteSwatch.SwatchId);

                    paletteSwatch.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(PaletteSwatch paletteSwatch)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE PaletteSwatch
                           SET PaletteId = @paletteId,
                               SwatchId = @swatchId
                         WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@paletteId", paletteSwatch.PaletteId);
                    DbUtils.AddParameter(cmd, "@swatchId", paletteSwatch.SwatchId);
                    DbUtils.AddParameter(cmd, "@id", paletteSwatch.Id);

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
                    cmd.CommandText = @"DELETE FROM PaletteSwatch WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

using Microsoft.Extensions.Hosting;
using Phigment.Models;
using Phigment.Utils;

namespace Phigment.Repositories
{
    public class SwatchRepository : BaseRepository, ISwatchRepository
    {
        public SwatchRepository(IConfiguration configuration) : base(configuration) { }
        public List<Swatch> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserId, [Name], HEX, RGB, HSL
                        FROM Swatch
";
                    var reader = cmd.ExecuteReader();

                    var swatches = new List<Swatch>();
                    while (reader.Read())
                    {
                        swatches.Add(new Swatch()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            HEX = DbUtils.GetString(reader, "HEX"),
                            RGB = DbUtils.GetString(reader, "RGB"),
                            HSL = DbUtils.GetString(reader, "HSL"),
                        });
                    }
                    reader.Close();

                    return swatches;
                }
            }
        }
        public Swatch GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserId, [Name], HEX, RGB, HSL
                        FROM Swatch
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Swatch swatch = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        swatch = new Swatch()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            HEX = DbUtils.GetString(reader, "HEX"),
                            RGB = DbUtils.GetString(reader, "RGB"),
                            HSL = DbUtils.GetString(reader, "HSL")
                        };
                    }
                    reader.Close();

                    return swatch;
                }
            }
        }

        public void Add(Swatch swatch)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Swatch (UserId, [Name], HEX, RGB, HSL)
                                        OUTPUT INSERTED.ID
                                        VALUES (@userId, @name, @hex, @rgb, @hsl)";
                    DbUtils.AddParameter(cmd, "@userId", swatch.UserId);
                    DbUtils.AddParameter(cmd, "@name", swatch.Name);
                    DbUtils.AddParameter(cmd, "@hex", swatch.HEX);
                    DbUtils.AddParameter(cmd, "@rgb", swatch.RGB);
                    DbUtils.AddParameter(cmd, "@hsl", swatch.HSL);

                    swatch.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Swatch swatch)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Swatch
                           SET UserId = @userId,
                               Name = @name,
                               HEX = @hex,
                               RGB = @rgb,
                               HSL = @hsl
                         WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@userId", swatch.UserId);
                    DbUtils.AddParameter(cmd, "@name", swatch.Name);
                    DbUtils.AddParameter(cmd, "@hex", swatch.HEX);
                    DbUtils.AddParameter(cmd, "@rgb", swatch.RGB);
                    DbUtils.AddParameter(cmd, "@hsl", swatch.HSL);
                    DbUtils.AddParameter(cmd, "@id", swatch.Id);

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
                    cmd.CommandText = @"DELETE FROM Swatch WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

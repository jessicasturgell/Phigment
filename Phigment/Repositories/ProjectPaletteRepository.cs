using Phigment.Models;
using Phigment.Utils;

namespace Phigment.Repositories
{
    public class ProjectPaletteRepository : BaseRepository, IProjectPaletteRepository
    {
        public ProjectPaletteRepository(IConfiguration configuration) : base(configuration) { }
        public void Add(ProjectPalette projectPalette)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO ProjectPalette (ProjectId, PaletteId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@projectId, @paletteId)";
                    DbUtils.AddParameter(cmd, "@projectId", projectPalette.ProjectId);
                    DbUtils.AddParameter(cmd, "@paletteId", projectPalette.PaletteId);

                    projectPalette.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public ProjectPalette GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, ProjectId, PaletteId
                        FROM ProjectPalette
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    ProjectPalette projectPalette = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        projectPalette = new ProjectPalette()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ProjectId = DbUtils.GetInt(reader, "ProjectId"),
                            PaletteId = DbUtils.GetInt(reader, "PaletteId"),
                        };
                    }
                    reader.Close();

                    return projectPalette;
                }
            }
        }
    }
}

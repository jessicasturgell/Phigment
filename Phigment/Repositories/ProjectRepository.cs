using Phigment.Models;
using Phigment.Utils;

namespace Phigment.Repositories
{
    public class ProjectRepository : BaseRepository, IProjectRepository
    {
        public ProjectRepository(IConfiguration configuration) : base(configuration) { }
        public List<Project> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, UserId, [Name], Blurb, Notes, IsPublic
                    FROM Project";
                    var reader = cmd.ExecuteReader();

                    var projects = new List<Project>();
                    while (reader.Read())
                    {
                        projects.Add(new Project()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Blurb = DbUtils.GetString(reader, "Blurb"),
                            Notes = DbUtils.GetString(reader, "Notes"),
                            IsPublic = DbUtils.GetBoolean(reader, "IsPublic"),
                        });
                    }
                    reader.Close();

                    return projects;
                }
            }
        }
        public List<Project> GetAllByUserId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, UserId, [Name], Blurb, Notes, IsPublic
                    FROM Project
                    WHERE UserId = @id";

                    cmd.Parameters.AddWithValue("@id", id);

                    var reader = cmd.ExecuteReader();

                    var projects = new List<Project>();
                    while (reader.Read())
                    {
                        projects.Add(new Project()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Blurb = DbUtils.GetString(reader, "Blurb"),
                            Notes = DbUtils.GetString(reader, "Notes"),
                            IsPublic = DbUtils.GetBoolean(reader, "IsPublic"),
                        });
                    }
                    reader.Close();

                    return projects;
                }
            }
        }
    }
}

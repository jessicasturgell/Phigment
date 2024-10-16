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
        public void Add(Project project)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO Project (UserId, [Name], Blurb, Notes, IsPublic)
                                        OUTPUT INSERTED.ID
                                        VALUES (@userId, @name, @blurb, @notes, @isPublic)";
                    DbUtils.AddParameter(cmd, "@userId", project.UserId);
                    DbUtils.AddParameter(cmd, "@name", project.Name);
                    DbUtils.AddParameter(cmd, "@blurb", project.Blurb);
                    DbUtils.AddParameter(cmd, "@notes", project.Notes);
                    DbUtils.AddParameter(cmd, "@isPublic", project.IsPublic);

                    project.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public Project GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, UserId, [Name], Blurb, Notes, IsPublic
                        FROM Project
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    Project project = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        project = new Project()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Blurb = DbUtils.GetString(reader, "Blurb"),
                            Notes = DbUtils.GetString(reader, "Notes"),
                            IsPublic = DbUtils.GetBoolean(reader, "IsPublic")
                        };
                    }
                    reader.Close();

                    return project;
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
                    cmd.CommandText = @"DELETE FROM Project WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Update(Project project)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Project
                           SET UserId = @userId,
                               Name = @name,
                               Blurb = @blurb,
                               Notes = @notes,
                               IsPublic = @isPublic
                         WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@userId", project.UserId);
                    DbUtils.AddParameter(cmd, "@name", project.Name);
                    DbUtils.AddParameter(cmd, "@blurb", project.Blurb);
                    DbUtils.AddParameter(cmd, "@notes", project.Notes);
                    DbUtils.AddParameter(cmd, "@isPublic", project.IsPublic);
                    DbUtils.AddParameter(cmd, "@id", project.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

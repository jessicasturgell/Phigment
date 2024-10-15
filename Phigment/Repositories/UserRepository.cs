using Phigment.Utils;
using Phigment.Models;

namespace Phigment.Repositories
{
    public class UserRepository : BaseRepository, IUserRepository
    {
        public UserRepository(IConfiguration configuration) : base(configuration) { }
        public List<User> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, DisplayName, JoinDateTime, Bio, [Image]
                        FROM [User]
";
                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();
                    while (reader.Read())
                    {
                        users.Add(new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            JoinDateTime = DbUtils.GetDateTime(reader, "JoinDateTime"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                            Image = DbUtils.GetString(reader, "Image")
                        });
                    }
                    reader.Close();

                    return users;
                }
            }
        }

        public User GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, DisplayName, JoinDateTime, Bio, [Image]
                        FROM [User]
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    User user = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            JoinDateTime = DbUtils.GetDateTime(reader, "JoinDateTime"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                            Image = DbUtils.GetString(reader, "Image")
                        };
                    }
                    reader.Close();

                    return user;
                }
            }
        }

        public User GetUserByDisplayName(string displayName)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT Id, DisplayName, JoinDateTime, Bio, [Image]
                        FROM [User]
                        WHERE DisplayName = @displayName";

                    DbUtils.AddParameter(cmd, "@displayName", displayName);

                    User user = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        user = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            JoinDateTime = DbUtils.GetDateTime(reader, "JoinDateTime"),
                            Bio = DbUtils.GetString(reader, "Bio"),
                            Image = DbUtils.GetString(reader, "Image")
                        };
                    }

                    reader.Close();

                    return user;
                }
            }
        }
        public void Add(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                            INSERT INTO [User] (DisplayName, JoinDateTime, Bio, [Image])
                            OUTPUT INSERTED.ID
                            VALUES (@displayName, @joinDateTime, @bio, @image)
    ";

                    DbUtils.AddParameter(cmd, "@displayName", user.DisplayName);
                    DbUtils.AddParameter(cmd, "@joinDateTime", user.JoinDateTime);
                    DbUtils.AddParameter(cmd, "@bio", user.Bio);
                    DbUtils.AddParameter(cmd, "@image", user.Image);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(User user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE [User]
                           SET DisplayName = @displayName,
                               JoinDateTime = @joinDateTime,
                               Bio = @bio,
                               [Image] = @image
                         WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@displayName", user.DisplayName);
                    DbUtils.AddParameter(cmd, "@joinDateTime", user.JoinDateTime);
                    DbUtils.AddParameter(cmd, "@bio", user.Bio);
                    DbUtils.AddParameter(cmd, "@id", user.Id);
                    DbUtils.AddParameter(cmd, "@image", user.Image);

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
                    cmd.CommandText = @"DELETE FROM [User] WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

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
                        SELECT Id, DisplayName
                        FROM [User]
";
                    var reader = cmd.ExecuteReader();

                    var users = new List<User>();
                    while (reader.Read())
                    {
                        users.Add(new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName")
                        });
                    }
                    reader.Close();

                    return users;
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
                        SELECT Id, DisplayName
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
                            DisplayName = DbUtils.GetString(reader, "DisplayName")
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
                            INSERT INTO [User] (DisplayName)
                            OUTPUT INSERTED.ID
                            VALUES (@displayName)
    ";

                    DbUtils.AddParameter(cmd, "@displayName", user.DisplayName);

                    user.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}

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
    }
}

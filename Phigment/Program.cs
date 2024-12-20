
using Phigment.Repositories;

namespace Phigment
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddTransient<IUserRepository, UserRepository>();
            builder.Services.AddTransient<IPaletteRepository, PaletteRepository>();
            builder.Services.AddTransient<ISwatchRepository, SwatchRepository>();
            builder.Services.AddTransient<IPaletteSwatchRepository, PaletteSwatchRepository>();
            builder.Services.AddTransient<IProjectRepository, ProjectRepository>();
            builder.Services.AddTransient<IProjectPaletteRepository, ProjectPaletteRepository>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseCors(options =>
                {
                    options.AllowAnyOrigin();
                    options.AllowAnyMethod();
                    options.AllowAnyHeader();
                });
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}

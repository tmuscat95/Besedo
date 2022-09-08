using Besedo.API.Data;
using Besedo.API.Data.Repos;
using Besedo.API.Models;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<BesedoContext>(options => options.UseInMemoryDatabase("Besedo"));
builder.Services.AddScoped<IUsersRepo, UsersRepo>();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<BesedoContext>();
    context.Database.EnsureCreated();

    using (StreamReader file = File.OpenText(@"./Data/" + "MOCK_DATA.json"))
    {
        string s = file.ReadToEnd();

        List<User>? movies = JsonConvert.DeserializeObject<List<User>>(s);

        if (movies != null)
            context.User.AddRange(movies);

        context.SaveChanges();

        var x = context.User.Select(x => x).ToList();
    }
}


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

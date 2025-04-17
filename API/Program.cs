using Application.Activities.Queries;
using Application.Core;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
//Adding CORS
builder.Services.AddCors();

//Adding mediator
builder.Services.AddMediatR(x =>
    x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>());

//Adding automapper
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

var app = builder.Build();

// Configure the HTTP request pipeline
//Setting up CORS options
app.UseCors(x => x.WithOrigins("http://localhost:3000","https://localhost:3000").AllowAnyMethod().AllowAnyHeader());

app.MapControllers();

await using var scope = app.Services.CreateAsyncScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();
    await context.Database.MigrateAsync();
    await DBInitializer.SeedData(context);
}
catch(System.Exception e)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(e, "An error occured during migration cuz");
}

app.Run();


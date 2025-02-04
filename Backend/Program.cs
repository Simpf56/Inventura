using Backend.Data;
using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<InventorijaContext> (options => { options.UseSqlServer(builder.Configuration.GetConnectionString("InventorijaContext")); 
});

//builder.Services.AddDbContext<InventorijaContext>(options =>
//    options.UseSqlServer(
//        builder.Configuration.GetConnectionString("InventorijaContext"),
//        sqlOptions => sqlOptions.EnableRetryOnFailure())
//);
builder.Services.AddCors(o => {

    o.AddPolicy("CorsPolicy", builder =>
    {
    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.

app.MapOpenApi();


app.UseHttpsRedirection();

app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI(o =>
{
    o.EnableTryItOutByDefault();
    o.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
});

app.MapControllers();
app.UseCors("CorsPolicy");

app.Run();


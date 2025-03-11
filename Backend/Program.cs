using Backend.Data;
using Backend.Mapping;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using Microsoft.OpenApi.Models;
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

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Inventorija API", Version = "v1" });
    c.EnableAnnotations(); // Omogućava `[SwaggerOperation]`
});

builder.Services.AddAutoMapper(typeof(InventorijaMappingProfile));

var app = builder.Build();

// Configure the HTTP request pipeline.

app.MapOpenApi();


app.UseHttpsRedirection();

//app.UseAuthorization();

app.UseSwagger();
app.UseSwaggerUI(o =>
{
    o.EnableTryItOutByDefault();
    o.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
});

app.MapControllers();
app.UseCors("CorsPolicy");

// za potrebe produkcije
app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");

app.Run();


using Backend.Models;
using Backend.Models.SignalR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
string corsConfig = "_CorsConfig";
// Add services to the container.
var secretKey = builder.Configuration.GetSection("secretKey").ToString();
/*
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});*/


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration.GetConnectionString("devConnection"));
});
builder.Services.AddSignalR();
builder.Services.AddCors(options =>
{
    options.AddPolicy(corsConfig, policy =>
    {
        policy.AllowCredentials();
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
        policy.WithOrigins("http://localhost:5173");
        //policy.AllowAnyOrigin();
    });
});



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

/*app.UseAuthentication();*/
app.UseAuthorization();

app.UseCors(corsConfig);

app.UseRouting();

app.UseEndpoints(endpoint => {
    endpoint.MapHub<BroadCastHub>("/api/hubReadBiodigester");
});

app.UseEndpoints(enpoint =>
{
    enpoint.MapControllers();
});

app.Run();

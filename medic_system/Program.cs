using medic_system.Models;
using medic_system.Services;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System.IO;

var builder = WebApplication.CreateBuilder(args);

// Verificar y crear la carpeta Logs si no existe
var logDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Logs");
if (!Directory.Exists(logDirectory))
{
    Directory.CreateDirectory(logDirectory);
}

// Configurar Serilog
Log.Logger = new LoggerConfiguration()
    .WriteTo.Console()
    .WriteTo.File(Path.Combine(logDirectory, "app-.log"), rollingInterval: RollingInterval.Day)
    .CreateLogger();

builder.Host.UseSerilog(); // Usar Serilog como el proveedor de logging

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddDbContext<medical_systemContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CadenaSQL")));
builder.Services.AddRazorPages().AddRazorRuntimeCompilation();

// Registrar IHttpContextAccessor
builder.Services.AddHttpContextAccessor();

// Registrar el servicio de autenticaci�n
builder.Services.AddScoped<AutenticationService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<PatientService>();
builder.Services.AddScoped<CatalogService>();
builder.Services.AddScoped<AppointmentService>();
builder.Services.AddScoped<ConsultationService>();
builder.Services.AddLogging(); ;

// Configurar y habilitar sesiones
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Configura el tiempo de espera de la sesi�n
    options.Cookie.HttpOnly = true; // Configura las cookies solo para HTTP
    options.Cookie.IsEssential = true; // Marca la cookie como esencial
});





var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

// Habilitar el uso de sesiones
app.UseSession();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Access}/{action=Login}/{id?}");

IWebHostEnvironment env = app.Environment;
Rotativa.AspNetCore.RotativaConfiguration.Setup(env.WebRootPath, "Rotativa/Windows");

app.Run();

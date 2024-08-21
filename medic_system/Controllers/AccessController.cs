﻿using medic_system.Models;
using medic_system.Services;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace medic_system.Controllers
{
    public class AccessController : Controller
    {
        private readonly AutenticationService _autenticationService;

        public AccessController(AutenticationService autenticationService)
        {
            _autenticationService = autenticationService;
        }

        [HttpGet]
        public IActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Login(Usuario loginRequest)
        {
            if (loginRequest == null || string.IsNullOrEmpty(loginRequest.LoginUsuario) || string.IsNullOrEmpty(loginRequest.ClaveUsuario))
            {
                ModelState.AddModelError("", "El nombre de usuario y la contraseña son requeridos.");
                return View(loginRequest);
            }

            var user = await _autenticationService.ValidateUser(loginRequest.LoginUsuario, loginRequest.ClaveUsuario);

            if (user == null)
            {
                ModelState.AddModelError("", "Nombre de usuario o contraseña incorrectos.");
                return View(loginRequest);
            }

            // Redirigir a la página principal o a otra acción después de un inicio de sesión exitoso
            return RedirectToAction("Index", "Home");
        }


        [HttpGet]
        public IActionResult CheckSession()
        {
            if (HttpContext.Session.GetInt32("UsuarioId") == null)
            {
                return Json(false); // La sesión ha expirado
            }
            return Json(true); // La sesión sigue activa
        }
    }
}

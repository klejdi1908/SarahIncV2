using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SarahIncV2.DbModels;
using SarahIncV2.Helpers;
using SarahIncV2.Models;
using System;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace SarahIncV2.Controllers
{
    public class HomeController : Controller
    {
        // GET: /Home/Index
        [AllowAnonymous]
        public ActionResult Index()
        {
            var model = new LoginViewModel();
            ViewBag.ReturnUrl = HttpContext.Request.Path.ToString();

            return View(model);
        }

        // POST: /Home/Index
        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> Index(LoginViewModel model, string returnUrl)
        {
            if (ModelState.IsValid)
            {
                var hashedPassword = "";
                var userId = 0;
                var role = "";

                using (var dbContext = new SarahIncContext())
                {
                    var pass = (from u in dbContext.User
                                where u.Username == model.UserName
                                select u).FirstOrDefault();

                    if (pass != null && !pass.Lockedout)
                    {
                        hashedPassword = pass.Password;
                        UserData.RoleId = pass.RoleId;
                        role = pass.RoleId == Constants.RoleGuest ? "Guest" : pass.RoleId == Constants.RoleUser ? "User" : "Admin";
                        userId = pass.UserId;
                    }
                }

                var validPassword = !string.IsNullOrEmpty(hashedPassword) && UserData.ValidatePassword(model.Password, hashedPassword);

                if (validPassword)
                {
                    var claims = new[] { new Claim(ClaimTypes.Name, model.UserName),
                        new Claim(ClaimTypes.Role, role) };

                    var claimsIdentity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationScheme);
                    var authProperties = new AuthenticationProperties{ IsPersistent = model.RememberMe };

                    await HttpContext.SignInAsync(
                        CookieAuthenticationDefaults.AuthenticationScheme,
                        new ClaimsPrincipal(claimsIdentity), authProperties);

                    HttpContext.Session.SetString("Role", role);
                    HttpContext.Session.SetInt32("UserId", userId);

                    using (var dbContext = new SarahIncContext())
                    {
                        var aud = new Audit();
                        dbContext.Audit.Add(aud);
                        aud.TableType = Constants.AuditTableTypeUser;
                        aud.ActionType = Constants.AuditActionTypeLoginSuccess;
                        aud.DateTime = DateTime.Now;
                        aud.ActionId = userId;
                        dbContext.SaveChanges();
                    }

                    return RedirectToAction("Index", "Admin");
                }
                else if (hashedPassword != "")
                {
                    using (var dbContext = new SarahIncContext())
                    {
                        var aud = new Audit();
                        dbContext.Audit.Add(aud);
                        aud.TableType = Constants.AuditTableTypeUser;
                        aud.ActionType = Constants.AuditActionTypeLoginFail;
                        aud.DateTime = DateTime.Now;
                        aud.ActionId = userId;
                        dbContext.SaveChanges();

                        var lockoutCheck = (from a in dbContext.Audit
                                            where
                                                a.ActionId == userId && a.TableType == Constants.AuditTableTypeUser &&
                                                a.ActionType == Constants.AuditActionTypeLoginFail
                                                && a.DateTime > DateTime.UtcNow.AddMinutes(-15)
                                            select a);

                        if (lockoutCheck.Count() > 3)
                        {
                            var user = (from u in dbContext.User
                                        where u.UserId == userId
                                        select u).First();

                            user.Lockedout = true;
                            dbContext.SaveChanges();
                        }
                    }
                }
            }

            // If we got this far, something failed, redisplay form
            ModelState.AddModelError("", "Incorrect username, password or this account has been locked out.");
            UserData.RoleId = -1;

            return View(model);
        }

        // POST: /Home/Logout
        public async Task<ActionResult> Logout()
        {
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);

            return Redirect("~/");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

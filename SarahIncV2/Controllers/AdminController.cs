using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SarahIncV2.DbModels;
using SarahIncV2.Helpers;
using SarahIncV2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;

namespace SarahIncV2.Controllers
{
    public class AdminController : Controller
    {
        private readonly IMapper _mapper;

        public AdminController(IMapper mapper)
        {
            _mapper = mapper;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult AlertOffice([FromBody]AlertOfficeModel aom)
        {
            //SendEmail("james@jkcde.com", "Please print out Form ID " + aom.FormId, "Form " + aom.FormId + " for " + aom.Childname + " is ready for printing.");
            //SendEmail("besa@jkcde.com", "Please print out Form ID " + aom.FormId, "Form " + aom.FormId + " for " + aom.Childname + " is ready for printing.");
            SendEmail("cpecca@sarah-inc.org", "Please print out Form ID " + aom.FormId, "Form " + aom.FormId + " for " + aom.Childname + " is ready for printing.");
            SendEmail("mobrien@sarah-inc.org", "Please print out Form ID " + aom.FormId, "Form " + aom.FormId + " for " + aom.Childname + " is ready for printing.");

            return Json(new { Success = true, Message = "Alert Sent" });
        }

        public JsonResult ChangePassword([FromBody] ChangePasswordModel cpm)
        {
            SendPassword(cpm.email, cpm.newPass);

            using (var dbContext = new SarahIncContext())
            {
                var user = (from u in dbContext.User
                    where u.UserId == cpm.userId
                    select u).First();

                user.Password = UserData.CreateHash(cpm.newPass);

                dbContext.SaveChanges();
            }

            return Json(true);
        }

        public JsonResult DeleteForm([FromBody]int tempId)
        {
            using (var dbContext = new SarahIncContext())
            {
                var curForm = (from f in dbContext.Form
                    where f.TempId == tempId
                    select f).FirstOrDefault();

                if (curForm == null) return Json(false);
                dbContext.Form.Remove(curForm);
                dbContext.SaveChanges();
            }
            // Delete the current form. Also return any validation errors.
            return Json(true);
        }

        public JsonResult DeleteUser([FromBody]int userId)
        {
            using (var dbContext = new SarahIncContext())
            {
                var curUser = (from u in dbContext.User
                    where u.UserId == userId
                    select u).FirstOrDefault();

                if (curUser == null) return Json(false);
                dbContext.User.Remove(curUser);
                dbContext.SaveChanges();
            }
            return Json(true);
        }

        public JsonResult EmailReport(int tempId, string targets)
        {
            var targetList = targets.Split(';').Length > 0 ? targets.Split(';').ToList() : new List<string> { targets };
            var tLen = targetList.Count;

            for (var x = 0; x < tLen; ++x)
            {
                using (var sarahDb = new SarahIncContext())
                {
                    var user = sarahDb.User.FirstOrDefault(f => f.Email == targetList[x]);

                    if (user != null)
                    {
                        AdminController.SendEmail(targetList[x], "Here is a copy of an evaluation or assessment report", "Test Report");
                    }
                }
            }

            return Json(new { Success = true, Message = "Report Sent" });
        }

        public JsonResult GetFormsBase()
        {
            var dbUserId = HttpContext.Session.GetInt32("UserId");
            var modelForms = new List<TempFormModel>();

            using (var dbContext = new SarahIncContext())
            {
                var forms = (from f in dbContext.Form
                             orderby f.CreatedOn descending
                             select f);

                if (forms.Any())
                {
                    var formsList = forms.ToList();

                    foreach (var form in formsList)
                    {
                        var timeDiff = DateTime.Now - form.LastSaved.Value;

                        var b = DateTime.Now;
                        var c = form.LastSaved.Value;


                        if (form.Status || timeDiff.TotalMinutes < 3)
                        {
                            if (timeDiff.TotalMinutes < 3 && dbUserId != form.LastUserId)
                            {
                                continue;
                            }
                        }

                        var user = (from u in dbContext.User
                                    where u.UserId == form.LastUserId
                                    select u).First();

                        if (timeDiff.TotalDays > 14 && !form.Status)
                        {
                            SendEmail(user.Email, "Form overdue", "It has been over two weeks since you last accessed a form regarding " + form.Firstname + " " + form.Lastname + ". Please finish it at your convenience.");
                            form.LastSaved = DateTime.Now;
                            dbContext.SaveChanges();
                        }

                        var mf = new TempFormModel
                        {
                            TempId = form.TempId,
                            MagicNo = form.MagicNo,
                            Firstname = form.Firstname,
                            Lastname = form.Lastname,
                            Dob = form.Dob,
                            EvalDate = form.EvalDate,
                            Status = form.Status,
                            LastSaved = form.LastSaved,
                            LastUserId = form.LastUserId,
                            LastUser = user.Firstname + " " + user.Lastname,
                            CreatedOn = form.CreatedOn,
                            ReportReady = form.ReportReady,
                            ReportPrinted = form.ReportPrinted
                        };

                        modelForms.Add(mf);
                    }
                }
            }

            return Json(modelForms);
        }

        public JsonResult GetUsersBase()
        {
            var dbUserId = HttpContext.Session.GetInt32("UserId");
            var role = HttpContext.Session.GetString("Role");
            var modelUsers = new List<UserModel>();

            using (var dbContext = new SarahIncContext())
            {
                var users = (dbContext.User.Select(u => u));

                if (users.Any())
                {
                    foreach (var user in users)
                    {
                        if (user.UserId == dbUserId || role == Constants.RoleAdminStr)
                        {
                            var mu = new UserModel(_mapper)
                            {
                                UserId = user.UserId,
                                RoleValue = user.RoleId - 1,
                                RoleName = (from r in dbContext.Role
                                    where r.RoleId == user.RoleId
                                    select r.Rolename).First(),
                                Username = user.Username,
                                Firstname = user.Firstname,
                                Lastname = user.Lastname,
                                Email = user.Email,
                                Title = user.Title,
                                Lockedout = user.Lockedout,
                                LockedoutStr = user.Lockedout ? "Locked Out" : "OK"
                            };

                            modelUsers.Add(mu);
                        }
                    }
                }
            }

            return Json(modelUsers);
        }

        public static void SendEmail(string toAddress, string subject, string body)
        {
            var message = new MailMessage("administrator@sarah-inc.org", toAddress, subject, body);
            var client = new SmtpClient("smtp.office365.com", 587)
            {
                EnableSsl = true,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("smtprelay@sarah-inc.org", "SIrel@y16$")
            };

            try
            {
                client.Send(message);
            }
            catch (SmtpException e)
            {
                var error = e.StatusCode;
            }
        }

        public void SendPassword(string email, string newPassword)
        {
            SendEmail(email, "Your New Password from Sarah, Inc.", string.Format("Your password has been generated or reset.  Your new password is {0}",
                newPassword));
        }

        [HttpPost]
        public JsonResult UpsertForm([FromBody] TempFormModel tfm)
        {
            using (var dbContext = new SarahIncContext())
            {
                var curForm = (from f in dbContext.Form
                    where f.TempId == tfm.TempId
                    select f).FirstOrDefault();

                if (curForm == null) return Json(false);

                var fm = new FormModel(_mapper);

                _mapper.Map(tfm, fm);
                _mapper.Map(fm, curForm);
                dbContext.SaveChanges();

                return Json(true);
            }
        }

        [HttpPost]
        public JsonResult UpsertUser([FromBody] UserModel um)
        {
            using (var dbContext = new SarahIncContext())
            {
                var curUser = (from u in dbContext.User
                    where u.UserId == um.UserId
                    select u).FirstOrDefault();
                um.MapUser();
                if (curUser == null)
                {
                    curUser = new User();
                    dbContext.User.Add(curUser);
                    _mapper.Map(um, curUser);
                    curUser.Password = UserData.CreateHash(um.NewPass);
                }
                else
                {
                    um.Password = curUser.Password;
                    _mapper.Map(um, curUser);
                }

                dbContext.SaveChanges();

                return Json(curUser.UserId);
            }
        }
    }

    public class AlertOfficeModel
    {
        public int FormId { get; set; }
        public string Childname { get; set; }
    }
}
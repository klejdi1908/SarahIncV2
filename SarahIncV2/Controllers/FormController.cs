using System;
using System.Linq;
using SarahIncV2.DbModels;
using SarahIncV2.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SarahIncV2.Helpers;

namespace SarahIncV2.Controllers
{
    public class FormController : Controller
    {
        private readonly IMapper _mapper;

        public FormController(IMapper mapper)
        {
            _mapper = mapper;
        }

        public async Task<ActionResult> Index(int? id)
        {
            ViewBag.FormId = id ?? -1;

            if (HttpContext.Session.GetInt32("UserId") == null)
            {
                return RedirectToAction("Index", "Home");
            }

            if (HttpContext.Session.GetString("Role") != "Admin" && id != -1)  // Check if user has valid access to the form
            {
                var db = new SarahIncContext();
                var dbUserId = Convert.ToInt32(HttpContext.Session.GetInt32("UserId"));
                var form = db.Form.FirstOrDefault(x => x.TempId == id);
                var user = form.FormUser.FirstOrDefault(x => x.UserId == dbUserId);
                if (user == null)
                {
                    RedirectToAction("Index", "Admin");
                }
            }

            if (id == -1)
            {
                return RedirectToAction("Index", "Form", new { id = await UpsertForm()});
            }

            return View();
        }

        public JsonResult GetEvaluationTypes(string text, int id)
        {
            var sarahDb = new SarahIncContext();

            var evalTypes = sarahDb.Evaluation.Where(x => x.FormId == null || x.FormId == id).Select(evalType => new EvaluationFormModel
            {
                EvalTypeId = evalType.Id - 1,
                EvaluationType = evalType.Type
            });

            if (!string.IsNullOrEmpty(text))
            {
                evalTypes = evalTypes.Where(e => e.EvaluationType.Contains(text));
            }

            return Json(evalTypes);
        }

        public ActionResult CreateEvalType(string evalTypeVar)
        {
            if (string.IsNullOrEmpty(evalTypeVar))
            {
                ModelState.AddModelError("Evaluation Type Variable", "Evaluation Type Variable should have a name");
            }

            if (!ModelState.IsValid) return Json(ModelState);
            using (var dbContext = new SarahIncContext())
            {
                var evalType = new EvalTypeVarModel();
                var evalTypVar = (from e in dbContext.Evaluation
                                  where e.Type == evalTypeVar
                                  select e).FirstOrDefault();

                if (evalTypVar != null) return Json(ModelState);

                evalTypVar = new Evaluation();
                dbContext.Evaluation.Add(evalTypVar);
                evalTypVar.Type = evalTypeVar;
                dbContext.SaveChanges();
                evalType.Id = evalTypVar.Id;
                evalType.Name = evalTypeVar;
            }
            // Return the updated evalTypeVar. Also return any validation errors.
            return Json(ModelState);
        }

        [HttpPost]
        public void AddEvaluationType(string text, int id)
        {
            var sarahDb = new SarahIncContext();

            if (!string.IsNullOrEmpty(text))
            {
                var existEvalType = (from e in sarahDb.Evaluation
                                     where e.Type == text && (e.FormId == null || e.FormId == id)
                                     select e).FirstOrDefault();

                if (existEvalType == null)
                {
                    var newEvalType = new Evaluation();
                    sarahDb.Evaluation.Add(newEvalType);
                    newEvalType.Type = text;
                    newEvalType.FormId = id;
                    sarahDb.SaveChanges();
                }
            }
        }

        public JsonResult GetFormVars(int formId)
        {
            var sarahDb = new SarahIncContext();
            var frmVarList = new List<FormVariableModel>();

            var formVarList = sarahDb.FormVariable.Select(formVars => new FormVariableModel(_mapper)
            {
                Id = formVars.FormDataId,
                FormId = formVars.FormId,
                Description = formVars.Description,
                Name = formVars.Name,
                Value = formVars.Value
            }).Where(f => f.FormId == formId).OrderBy(o => o.Name);

            if (formVarList.Any())
            {
                foreach (var formVar in formVarList)
                {
                    frmVarList.Add(formVar);
                }
            }

            var result = frmVarList;
            return Json(result);
        }

        public ActionResult CreateFormVars(FormVariableModel frmVar)
        {
            if (frmVar.Description.Length < 1 || frmVar.Name.Length < 1 || frmVar.Value.Length < 1)
            {
                ModelState.AddModelError("Form Variable", "Form Variable should have a name, a description and a value");
            }

            if (!ModelState.IsValid) return Json(ModelState);
            using (var dbContext = new SarahIncContext())
            {
                var formVar = (from f in dbContext.FormVariable
                               where f.Name == frmVar.Name
                               select f).FirstOrDefault();

                if (formVar != null) return Json(ModelState);

                formVar = new FormVariable();
                dbContext.FormVariable.Add(formVar);
                formVar.FormId = frmVar.FormId;
                formVar.Description = frmVar.Description;
                formVar.Name = frmVar.Name;
                formVar.Value = frmVar.Value;
                dbContext.SaveChanges();
                frmVar.Id = formVar.FormDataId;
            }
            // Return the updated frmVar. Also return any validation errors.
            return Json(ModelState);
        }

        public ActionResult CreateTmplVar(TemplateVariable tmplVar)
        {
            if (tmplVar.Description.Length < 1 || tmplVar.Name.Length < 1 || tmplVar.Value.Length < 1)
            {
                ModelState.AddModelError("Template Variable", "Template Variable should have a name, a description and a value");
            }

            if (!ModelState.IsValid) return Json(ModelState);
            using (var dbContext = new SarahIncContext())
            {
                var tplVar = (from t in dbContext.TemplateVariable
                              where t.Name == tmplVar.Name
                              select t).FirstOrDefault();

                if (tplVar != null) return Json(ModelState);

                tplVar = new TemplateVariable();
                dbContext.TemplateVariable.Add(tplVar);
                tplVar.UserId = tmplVar.UserId;
                tplVar.Description = tmplVar.Description;
                tplVar.Name = tmplVar.Name;
                tplVar.Value = tmplVar.Value;
                dbContext.SaveChanges();
                tmplVar.TmplId = tplVar.TmplId;
            }
            // Return the updated tmplVar. Also return any validation errors.
            return Json(ModelState);
        }

        public JsonResult GetPrintOptions(int formId, bool single)
        {
            if (!single) formId = 0;

            using (var db = new SarahIncContext())
            {
                var options = db.PrintOption.Where(o => o.FormId == formId || o.FormId == null).AsEnumerable();
                var result = options;
                return Json(result);
            }
        }

        public JsonResult GetTplVars(string sec, string subSec, string desc)
        {
            var sarahDb = new SarahIncContext();
            var dbUserId = Convert.ToInt32(HttpContext.Session.GetInt32("UserId"));
            var tplVarList = new List<TemplateVariableModel>();

            var tmplVarList = sarahDb.TemplateVariable.Select(tmplVars => new TemplateVariableModel(_mapper)
            {
                TmplId = tmplVars.TmplId,
                UserId = tmplVars.UserId,
                Section = tmplVars.Section,
                SubSection = tmplVars.SubSection,
                Description = tmplVars.Description,
                Name = tmplVars.Name,
                Value = tmplVars.Value
            }).Where(f => (f.UserId == dbUserId || f.UserId == null) && f.Section == sec && f.SubSection == subSec && f.Description == desc).OrderBy(o => o.Name);

            if (tmplVarList.Any())
            {
                foreach (var tmplVar in tmplVarList)
                {
                    tplVarList.Add(tmplVar);
                }
            }

            var result = tplVarList;
            return Json(result);
        }

        public ActionResult DeleteFormVars(FormVariableModel frm)
        {
            if (!ModelState.IsValid) return Json(ModelState);
            using (var dbContext = new SarahIncContext())
            {
                var frmVar = (from f in dbContext.FormVariable
                              where f.FormDataId == frm.Id
                              select f).FirstOrDefault();

                if (frmVar == null) return Json(ModelState);
                dbContext.FormVariable.Remove(frmVar);
                dbContext.SaveChanges();
            }
            // Return the updated frm. Also return any validation errors.
            return Json(ModelState);
        }

        public ActionResult UpdateFormVars(FormVariableModel frmVar)
        {
            if (frmVar.Description.Length < 1 || frmVar.Name.Length < 1 || frmVar.Value.Length < 1)
            {
                ModelState.AddModelError("Form Variable", "Form Variable should have a name, a description and a value");
            }

            if (!ModelState.IsValid) return Json(ModelState);
            using (var dbContext = new SarahIncContext())
            {
                var formVar = (from f in dbContext.FormVariable
                               where f.FormDataId == frmVar.Id
                               select f).FirstOrDefault();

                if (formVar == null) return Json(ModelState);
                formVar.FormId = frmVar.FormId;
                formVar.Description = frmVar.Description;
                formVar.Name = frmVar.Name;
                formVar.Value = frmVar.Value;
                dbContext.SaveChanges();
            }
            // Return the updated frmVar. Also return any validation errors.
            return Json(ModelState);
        }

        public ActionResult DeleteUsers(TemplateVariableModel tpl)
        {
            if (!ModelState.IsValid) return Json(ModelState);
            using (var dbContext = new SarahIncContext())
            {
                var tmplVar = (from t in dbContext.TemplateVariable
                               where t.TmplId == tpl.TmplId
                               select t).FirstOrDefault();

                if (tmplVar == null) return Json(ModelState);
                dbContext.TemplateVariable.Remove(tmplVar);
                dbContext.SaveChanges();
            }
            // Return the updated tpl. Also return any validation errors.
            return Json(ModelState);
        }

        public ActionResult UpdateTmplVars(TemplateVariableModel tmplVar)
        {
            if (tmplVar.Description.Length < 1 || tmplVar.Name.Length < 1 || tmplVar.Value.Length < 1)
            {
                ModelState.AddModelError("Template Variable", "Template Variable should have a name, a description and a value");
            }

            if (!ModelState.IsValid) return Json(ModelState);
            using (var dbContext = new SarahIncContext())
            {
                var tplVar = (from t in dbContext.TemplateVariable
                              where t.TmplId == tmplVar.TmplId
                              select t).FirstOrDefault();

                if (tplVar == null) return Json(ModelState);
                tplVar.UserId = tmplVar.UserId;
                tplVar.Description = tmplVar.Description;
                tplVar.Name = tmplVar.Name;
                tplVar.Value = tmplVar.Value;
                dbContext.SaveChanges();
            }
            // Return the updated tmplVar. Also return any validation errors.
            return Json(ModelState);
        }

        public JsonResult GetEvaluators()
        {
            using (var db = new SarahIncContext())
            {
                var evalSet = db.User.Select(evaluators => new UserModel(_mapper)
                {
                    UserId = evaluators.UserId,
                    Firstname = evaluators.Firstname,
                    Lastname = evaluators.Lastname,
                    Title = evaluators.Title
                }).OrderBy(o => o.Lastname).ToList();

                return Json(evalSet);
            }
        }

        public JsonResult AlertOffice(int formId, string childName)
        {
            //AdminController.SendEmail("besa@jkcde.com", "Please print out Form ID " + formId, "Form " + formId + " for " + childName + " is ready for printing.");
            //AdminController.SendEmail("james@jkcde.com", "Please print out Form ID " + formId, "Form " + formId + " for " + childName + " is ready for printing.");
            AdminController.SendEmail("cpecca@sarah-inc.org", "Please print out Form ID " + formId, "Form " + formId + " for " + childName + " is ready for printing.");
            AdminController.SendEmail("mobrien@sarah-inc.org", "Please print out Form ID " + formId, "Form " + formId + " for " + childName + " is ready for printing.");

            return Json(new { Success = true, Message = "Alert Sent" });
        }

        [HttpPost]
        public JsonResult EmailReport([FromBody] EmailReportModel erm)
        {
            var targetList = erm.Targets.Split(';').Length > 0 ? erm.Targets.Split(';').ToList() : new List<string>{erm.Targets};
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

        [HttpGet]
        public async Task<JsonResult> LoadForm([FromQuery] int tempId)
        {
            var message = "Form Loaded";
            var formData = new TempFormModel();

            using (var sarahDb = new SarahIncContext())
            {
                var dbUserId = HttpContext.Session.GetInt32("UserId");

                var form = await (from f in sarahDb.Form
                            where f.TempId == tempId
                            select f).AsNoTracking().FirstOrDefaultAsync();

                if (form != null)
                {
                    var timeDiff = DateTime.Now - form.LastSaved.Value;

                    if (form.Status || timeDiff.TotalMinutes < 3)
                    {
                        if (timeDiff.TotalMinutes < 3 && dbUserId != form.LastUserId)
                        {
                            RedirectToAction("Index", "Admin");
                        }

                        if (form.Status && HttpContext.Session.GetString("Role") != "Admin" && form.FormUser.FirstOrDefault(u => u.UserId == dbUserId) == null)  // If you are not Admin and not a form creator, no access
                        {
                            RedirectToAction("Index", "Admin");
                        }
                    }

                    formData.MagicNo = form.MagicNo;
                    formData.Firstname = form.Firstname;
                    formData.Lastname = form.Lastname;
                    formData.Dob = form.Dob;
                    formData.EvalDate = form.EvalDate;
                    formData.Status = form.Status;
                    formData.FinalForm = form.FinalForm;
                    formData.CreatedOn = form.CreatedOn;

                    var formAreas = (from f in sarahDb.FormArea
                                     where f.FormId == tempId
                                     select f);

                    if (formAreas.Any())
                    {
                        var newFaList = new List<FormAreaModel>();

                        foreach (var formArea in formAreas)
                        {
                            var newFa = new FormAreaModel(_mapper);
                            newFa.FormAreaId = formArea.FormAreaId;
                            newFa.FormId = tempId;
                            newFa.Name = formArea.Name;
                            newFa.Value = formArea.Value;
                            newFaList.Add(newFa);
                        }

                        formData.FormAreaModels = newFaList;
                    }

                    var formVarData = (from f in sarahDb.FormVariable
                                       where (f.FormId == tempId)
                                       select f);

                    if (formVarData.Any())
                    {
                        var newFrmVarList = new List<FormVariableModel>();

                        foreach (var tempVar in formVarData)
                        {
                            var newFrmVar = new FormVariableModel(_mapper);
                            newFrmVar.Id = tempVar.FormDataId;
                            newFrmVar.FormId = tempVar.FormId;
                            newFrmVar.Description = tempVar.Description;
                            newFrmVar.Name = tempVar.Name;
                            newFrmVar.Value = tempVar.Value;
                            newFrmVarList.Add(newFrmVar);
                        }

                        formData.FormVariableModels = newFrmVarList;
                    }

                    var formPrintOptions = (from f in sarahDb.PrintVariable
                                            where (f.FormId == tempId)
                                            select f).FirstOrDefault();

                    if (formPrintOptions != null)
                    {
                        var list = new List<PrintVariableModel>();
                        var pvm = new PrintVariableModel(_mapper);
                        _mapper.Map(formPrintOptions, pvm);
                        list.Add(pvm);
                        formData.PrintVariableModels = list;
                    }
                    else
                    {
                        formData.PrintVariableModels = new List<PrintVariableModel>();
                    }

                    if (!form.Status)
                    {
                        var tv = sarahDb.TemplateVariable.Where(w => w.UserId == null);
                        var tvm = new List<TemplateVariableModel>();
                        _mapper.Map(tv, tvm);
                        formData.TemplateVariableModels = tvm;
                    }
                }
                else
                {
                    message = "Could not Find Form";
                }
            }

            return Json(new { Success = true, Message = message, FormData = formData });
        }

        [HttpPost]
        public JsonResult UpsertFinalForm([FromBody] FinalFormModel ffm)
        {
            var sarahDb = new SarahIncContext();

            var frm = (from t in sarahDb.Form
                where t.TempId == ffm.TempId
                select t).FirstOrDefault();

            frm.FinalForm = ffm.FinalForm;
            sarahDb.SaveChanges();
            return Json(new { Success = true, Message = "Final Saved", Id = ffm.TempId });
        }

        [HttpPost]
        public async Task<int> UpsertForm([FromBody] TempFormModel tfm = null)
        {
            Form formData;
            var dbUserId = HttpContext.Session.GetInt32("UserId");

           if (dbUserId != null)
            {
                try
                {
                    var dbUserIdInt = Convert.ToInt32(dbUserId);

                    using (var sarahDb = new SarahIncContext())
                    {
                        if (tfm != null)
                        {
                            formData = await (from t in sarahDb.Form
                                              where t.TempId == tfm.TempId
                                              select t).FirstOrDefaultAsync();

                            if (formData == null) return -1;

                            var fm = new FormModel(_mapper);
                            _mapper.Map(tfm, fm);
                            _mapper.Map(fm, formData);
                            formData.LastSaved = DateTime.Now;
                            formData.LastUserId = dbUserIdInt;

                            foreach (var formVar in tfm.FormVariableModels)
                            {
                                var fv = await (from f in sarahDb.FormVariable
                                                where f.Name == formVar.Name && f.FormId == formData.TempId
                                                select f).FirstAsync();

                                fv.Value = formVar.Value;

                                if (fv.Name == "frmEvalList" && fv.Value != "[Evaluators]")
                                {
                                    var evalList = formVar.Value.Split("<span id=\"ev").ToList();

                                    if (evalList.Count > 0)
                                    {
                                        foreach (var evalListItem in evalList)
                                        {
                                            var num = evalListItem.IndexOf('"');
                                            if (num != -1)
                                            {
                                                var numId = Convert.ToInt32(evalListItem.Substring(0, num));
                                                var userExists = await sarahDb.FormUser.FirstOrDefaultAsync(x => x.UserId == numId && x.TempEvalFormId == formData.TempId);

                                                if (userExists == null)
                                                {
                                                    var fu = new FormUser();
                                                    fu.TempEvalFormId = formData.TempId;
                                                    var userInFormUsers = await sarahDb.User.FirstAsync(x => x.UserId == numId);
                                                    fu.UserId = userInFormUsers.UserId;
                                                    sarahDb.FormUser.Add(fu);
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            foreach (var formArea in tfm.FormAreaModels)
                            {
                                var fa = await (from f in sarahDb.FormArea
                                                where f.Name == formArea.Name && f.FormId == formData.TempId
                                                select f).FirstOrDefaultAsync();

                                if (fa != null)
                                {
                                    fa.Value = formArea.Value;
                                }
                                else
                                {
                                    fa = new FormArea();
                                    sarahDb.FormArea.Add(fa);
                                    fa.Name = formArea.Name;
                                    fa.FormId = formData.TempId;
                                    fa.Value = formArea.Value;
                                }

                            }

                            var printVarModel = new PrintVariableModel(_mapper);
                            foreach (var printVar in tfm.PrintVariableModels)
                            {
                                printVarModel = printVar;

                            }

                            var frmPageBreak = sarahDb.PrintVariable.FirstOrDefault(x => x.FormId == formData.TempId);

                            if (frmPageBreak == null)
                            {
                                frmPageBreak = new PrintVariable();
                                sarahDb.PrintVariable.Add(frmPageBreak);
                                frmPageBreak.FormId = formData.TempId;
                            }

                            frmPageBreak.PageBreaks = printVarModel.PageBreaks;
                        }
                        else
                        {
                            formData = new Form();
                            sarahDb.Form.Add(formData);
                            formData.CreatedOn = DateTime.Now;
                            formData.LastUserId = dbUserIdInt;
                            formData.LastSaved = DateTime.Now;
                            await sarahDb.SaveChangesAsync();

                            var rootFormVars = (from f in sarahDb.FormVariable
                                                where f.FormId == null
                                                select f);

                            if (rootFormVars.Any())
                            {
                                foreach (var rootFormVar in rootFormVars)
                                {
                                    var newFormVar = new FormVariable();
                                    sarahDb.FormVariable.Add(newFormVar);
                                    newFormVar.FormId = formData.TempId;
                                    newFormVar.Description = rootFormVar.Description;
                                    newFormVar.Name = rootFormVar.Name;
                                    newFormVar.Value = rootFormVar.Value;
                                }
                            }

                            tfm = new TempFormModel();
                            tfm.TempId = formData.TempId;
                        }


                        formData.LastUserId = dbUserIdInt;
                        await sarahDb.SaveChangesAsync();

                        if (formData.FormUser.FirstOrDefault(u => u.UserId == dbUserIdInt) == null && HttpContext.Session.GetString("Role") != Constants.RoleAdminStr)
                        {
                            var fu = new FormUser();
                            fu.TempEvalFormId = formData.TempId;
                            fu.UserId = dbUserIdInt;
                            sarahDb.FormUser.Add(fu);
                            await sarahDb.SaveChangesAsync();
                        }
                    }

                    return tfm.TempId;
                }
                catch (Exception ex)
                {
                    var cat = 7;
                }
            }

            return -1;
        }

        [HttpPost]
        public async Task<JsonResult> SaveForm([FromBody] TempFormModel tfm)
        {
            var message = "Evaluation Saved";
            if (tfm != null && !tfm.NeedsUpdate) return Json(new {Success = true, Message = "No Changes"});
            var result = await UpsertForm(tfm);
            if(result == -1) return Json(new { Success = false, Message = "Could not Save Form" });
            if (tfm.Status) RedirectToAction("Index", "Admin");

            return Json(new { Success = true, Message = message, Id = tfm.TempId });
        }
    }

    public class EmailReportModel
    {
        public string Targets { get; set; }
        public string FinalForm { get; set; }
    }

    public class FinalFormModel
    {
        public int TempId { get; set; }
        public string FinalForm { get; set; }
    }
}
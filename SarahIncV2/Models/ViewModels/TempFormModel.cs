using System;
using System.Collections.Generic;

namespace SarahIncV2.Models
{
    public partial class TempFormModel
    {
        public int TempId { get; set; }
        public string MagicNo { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public DateTime? Dob { get; set; }
        public DateTime? EvalDate { get; set; }
        public bool NeedsUpdate { get; set; }
        public bool Status { get; set; }
        public string FinalForm { get; set; }
        public DateTime? LastSaved { get; set; }
        public int LastUserId { get; set; }
        public string LastUser { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ReportPrinted { get; set; }
        public bool? ReportReady { get; set; }
        public List<FormAreaModel> FormAreaModels { get; set; }
        public List<FormVariableModel> FormVariableModels { get; set; }
        public List<TemplateVariableModel> TemplateVariableModels { get; set; }
        public List<PrintVariableModel> PrintVariableModels { get; set; }
    }
}
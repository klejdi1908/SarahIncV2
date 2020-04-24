using System;
using System.Collections.Generic;

namespace SarahIncV2.DbModels
{
    public partial class Form
    {
        public Form()
        {
            Evaluation = new HashSet<Evaluation>();
            FormArea = new HashSet<FormArea>();
            FormUser = new HashSet<FormUser>();
            FormVariable = new HashSet<FormVariable>();
            PrintOption = new HashSet<PrintOption>();
            PrintVariable = new HashSet<PrintVariable>();
        }

        public int TempId { get; set; }
        public string MagicNo { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public DateTime? Dob { get; set; }
        public DateTime? EvalDate { get; set; }
        public bool Status { get; set; }
        public DateTime? LastSaved { get; set; }
        public int LastUserId { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? ReportPrinted { get; set; }
        public bool? ReportReady { get; set; }
        public string FinalForm { get; set; }

        public User LastUser { get; set; }
        public ICollection<Evaluation> Evaluation { get; set; }
        public ICollection<FormArea> FormArea { get; set; }
        public ICollection<FormUser> FormUser { get; set; }
        public ICollection<FormVariable> FormVariable { get; set; }
        public ICollection<PrintOption> PrintOption { get; set; }
        public ICollection<PrintVariable> PrintVariable { get; set; }
    }
}

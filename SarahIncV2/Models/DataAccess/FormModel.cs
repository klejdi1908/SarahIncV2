using System;
using System.Collections.Generic;
using AutoMapper;

namespace SarahIncV2.Models
{
    public partial class FormModel : DaGen<FormModel>
    {
        public FormModel(IMapper _mapper) : base(_mapper)
        {
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
        public DateTime? ReportPrinted { get; set; }
        public bool? ReportReady { get; set; }
        public string FinalForm { get; set; }
        public DateTime CreatedOn { get; set; }
        
        public UserModel LastUserModel { get; set; }
        public List<EvaluationModel> EvaluationModels { get; set; }
        public List<FormAreaModel> FormAreaModels { get; set; }
        public List<FormUserModel> FormUserModels { get; set; }
        public List<FormVariableModel> FormVariableModels { get; set; }
        public List<PrintOptionModel> PrintOptionModels { get; set; }
        public List<PrintVariableModel> PrintVariableModels { get; set; }
    }
}

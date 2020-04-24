using System;
using System.Collections.Generic;

namespace SarahIncV2.DbModels
{
    public partial class Evaluation
    {
        public Evaluation()
        {
            EvaluationSubject = new HashSet<EvaluationSubject>();
        }

        public int Id { get; set; }
        public string Type { get; set; }
        public int? FormId { get; set; }

        public Form Form { get; set; }
        public ICollection<EvaluationSubject> EvaluationSubject { get; set; }
    }
}

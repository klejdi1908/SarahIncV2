using System;
using System.Collections.Generic;

namespace SarahIncV2.DbModels
{
    public partial class EvaluationSubject
    {
        public int EvalId { get; set; }
        public int SubjId { get; set; }

        public Evaluation Eval { get; set; }
        public Subject Subj { get; set; }
    }
}

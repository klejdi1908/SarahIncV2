using System;
using System.Collections.Generic;

namespace SarahIncV2.DbModels
{
    public partial class Subject
    {
        public Subject()
        {
            EvaluationSubject = new HashSet<EvaluationSubject>();
        }

        public int Id { get; set; }
        public short Type { get; set; }
        public string FileNo { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Alias { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }

        public ICollection<EvaluationSubject> EvaluationSubject { get; set; }
    }
}

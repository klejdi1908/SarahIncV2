using System;
using System.Collections.Generic;

namespace SarahIncV2.DbModels
{
    public partial class FormUser
    {
        public int UserId { get; set; }
        public int TempEvalFormId { get; set; }

        public Form TempEvalForm { get; set; }
        public User User { get; set; }
    }
}

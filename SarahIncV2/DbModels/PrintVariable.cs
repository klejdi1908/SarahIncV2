using System;
using System.Collections.Generic;

namespace SarahIncV2.DbModels
{
    public partial class PrintVariable
    {
        public int PrintVarId { get; set; }
        public int FormId { get; set; }
        public string PageBreaks { get; set; }

        public Form Form { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace SarahIncV2.DbModels
{
    public partial class FormVariable
    {
        public int FormDataId { get; set; }
        public int? FormId { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }

        public Form Form { get; set; }
    }
}

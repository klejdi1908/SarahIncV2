using System;
using System.Collections.Generic;

namespace SarahIncV2.DbModels
{
    public partial class FormArea
    {
        public int FormAreaId { get; set; }
        public int FormId { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }

        public Form Form { get; set; }
    }
}

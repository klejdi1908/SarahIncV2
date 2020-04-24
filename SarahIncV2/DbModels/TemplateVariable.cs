using System;
using System.Collections.Generic;

namespace SarahIncV2.DbModels
{
    public partial class TemplateVariable
    {
        public int TmplId { get; set; }
        public int? UserId { get; set; }
        public string Section { get; set; }
        public string SubSection { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }

        public User User { get; set; }
    }
}

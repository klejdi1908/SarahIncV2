using System;
using System.Collections.Generic;

namespace SarahIncV2.DbModels
{
    public partial class Setting
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ValueString { get; set; }
        public int? ValueInt { get; set; }
    }
}

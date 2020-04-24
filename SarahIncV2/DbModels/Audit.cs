using System;
using System.Collections.Generic;

namespace SarahIncV2.DbModels
{
    public partial class Audit
    {
        public int AuditId { get; set; }
        public short TableType { get; set; }
        public short ActionType { get; set; }
        public int? ActionId { get; set; }
        public DateTime DateTime { get; set; }
    }
}

using System;
using AutoMapper;

namespace SarahIncV2.Models
{
    public partial class AuditModel : DaGen<AuditModel>
    {
        public AuditModel(IMapper _mapper) : base(_mapper)
        {
        }

        public int AuditId { get; set; }
        public short TableType { get; set; }
        public short ActionType { get; set; }
        public int? ActionId { get; set; }
        public DateTime DateTime { get; set; }
    }
}

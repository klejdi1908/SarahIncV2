using System;
using System.Collections.Generic;
using AutoMapper;

namespace SarahIncV2.Models
{
    public partial class TemplateVariableModel : DaGen<TemplateVariableModel>
    {
        public TemplateVariableModel(IMapper _mapper) : base(_mapper)
        {

        }

        public int TmplId { get; set; }
        public int? UserId { get; set; }
        public string Section { get; set; }
        public string SubSection { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }

        public UserModel UserModel { get; set; }
    }
}

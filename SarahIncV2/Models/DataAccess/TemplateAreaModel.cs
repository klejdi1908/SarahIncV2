using AutoMapper;

namespace SarahIncV2.Models
{
    public partial class TemplateAreaModel : DaGen<TemplateAreaModel>
    {
        public TemplateAreaModel(IMapper _mapper) : base(_mapper)
        {

        }

        public int TemplateAreaId { get; set; }
        public string Class { get; set; }
        public string Value { get; set; }
    }
}

using AutoMapper;

namespace SarahIncV2.Models
{
    public partial class FormAreaModel : DaGen<FormAreaModel>
    {
        public FormAreaModel(IMapper _mapper) : base(_mapper)
        {

        }

        public int FormAreaId { get; set; }
        public int FormId { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }

        public FormModel FormModel { get; set; }
    }
}

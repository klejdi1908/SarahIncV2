using AutoMapper;

namespace SarahIncV2.Models
{
    public partial class FormVariableModel : DaGen<FormVariableModel>
    {
        public FormVariableModel(IMapper _mapper) : base(_mapper)
        {

        }

        public int FormDataId { get; set; }
        public int? FormId { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }
        public string Value { get; set; }

        public FormModel FormModel { get; set; }
    }
}

using AutoMapper;

namespace SarahIncV2.Models
{
    public partial class SettingModel : DaGen<SettingModel>
    {
        public SettingModel(IMapper _mapper) : base(_mapper)
        {

        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string ValueString { get; set; }
        public int? ValueInt { get; set; }
    }
}

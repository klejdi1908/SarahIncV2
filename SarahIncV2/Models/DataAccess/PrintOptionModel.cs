using AutoMapper;

namespace SarahIncV2.Models
{
    public partial class PrintOptionModel : DaGen<PrintOptionModel>
    {
        public PrintOptionModel(IMapper _mapper) : base(_mapper)
        {

        }

        public int Id { get; set; }
        public int? FormId { get; set; }
        public string Name { get; set; }
        public short? Height { get; set; }
        public short? Width { get; set; }
        public byte? Widows { get; set; }
        public byte? Orphans { get; set; }

        public FormModel FormModel { get; set; }
    }
}

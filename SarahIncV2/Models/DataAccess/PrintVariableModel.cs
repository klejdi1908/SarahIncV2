using AutoMapper;

namespace SarahIncV2.Models
{
    public partial class PrintVariableModel : DaGen<PrintVariableModel>
    {
        public PrintVariableModel(IMapper _mapper) : base(_mapper)
        {

        }

        public int PrintVarId { get; set; }
        public int FormId { get; set; }
        public string PageBreaks { get; set; }

        public FormModel FormModel { get; set; }
    }
}

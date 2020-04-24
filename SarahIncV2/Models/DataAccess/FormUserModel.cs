using AutoMapper;

namespace SarahIncV2.Models
{
    public partial class FormUserModel : DaGen<FormUserModel>
    {
        public FormUserModel(IMapper _mapper) : base(_mapper)
        {

        }

        public int UserId { get; set; }
        public int TempEvalFormId { get; set; }

        public FormModel TempEvalFormModel { get; set; }
        public UserModel UserModel { get; set; }
    }
}

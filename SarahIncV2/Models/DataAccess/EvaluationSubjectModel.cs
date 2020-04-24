using AutoMapper;

namespace SarahIncV2.Models
{
    public partial class EvaluationSubjectModel : DaGen<EvaluationSubjectModel>
    {
        public EvaluationSubjectModel(IMapper _mapper) : base(_mapper)
        {

        }

        public int EvalId { get; set; }
        public int SubjId { get; set; }

        public EvaluationModel EvaluationModel { get; set; }
        public SubjectModel SubjectModel { get; set; }
    }
}

using System.Collections.Generic;
using AutoMapper;

namespace SarahIncV2.Models
{
    public partial class EvaluationModel : DaGen<EvaluationModel>
    {
        public EvaluationModel(IMapper _mapper) : base(_mapper)
        {

        }

        public int Id { get; set; }
        public string Type { get; set; }
        public int? FormId { get; set; }

        public FormModel FormModel { get; set; }
        public List<EvaluationSubjectModel> EvaluationSubjectModels { get; set; }
    }
}

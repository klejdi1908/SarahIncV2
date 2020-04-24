using System.Collections.Generic;
using System.Linq;
using SarahIncV2.DbModels;


namespace SarahIncV2.Models
{
    public partial class EvaluationFormModel
    {
        public int ClinOpinDevDelId { get; set; }
        public string ClinOpinDevDelChoice { get; set; }
        public int EvalBasisId { get; set; }
        public string EvalBasisChoice { get; set; }
        public int EvalTypeId { get; set; }
        public string EvaluationType { get; set; }
        public int GenderId { get; set; }
        public string Gender { get; set; }
        public int HearingId { get; set; }
        public string HearingChoice { get; set; }
        public const string ConcludingText =
            "For additional recommendations and community resources that may benefit you and your family, " +
            "please call Child Development Infoline at 800-505-7000, 2-1-1, or the KIDSTEPS office. If you " +
            "have any questions regarding this report and the recommendations listed above, please contact us " +
            "at the KIDSTEPS office at (203) 453-7592, ext. 100.";
        public int NutritionScreeningId { get; set; }
        public string NutritionScreeningChoice { get; set; }
        public const string Routine1Header = "WAKE UP/SLEEP";
        public const string Routine2Header = "DRESSING/TOILETING";
        public const string Routine3Header = "MEALTIME";
        public const string Routine4Header = "OUTINGS";
        public const string Routine5Header = "PLAY";
        public const string Routine6Header = "BATH TIME";
        public const string Section1Header = "Family Information";
        public const string Section2Header = "Medical History";
        public const string Section3Header = "Evaluation Process";
        public const string Section4Header = "Family and Child Routines";
        public const string Section4OtherHeader = "Observations during Testing";
        public const string Section5Header = "Results";
        public const string Section6Header = "Glossary of Terms";
        public const string Section7Header = "Summary and Recommendations";
        public int SigBirthHistId { get; set; }
        public string SigBirthHistChoice { get; set; }
        public int VisionId { get; set; }
        public string VisionChoice { get; set; }
        public int VisionScreeningId { get; set; }
        public string VisionScreeningChoice { get; set; }

        private SarahIncContext _dbContext;


        public static IEnumerable<EvaluationFormModel> GetKendoEvaluationTypes()
        {
            using (var dbContext = new SarahIncContext())
            {
                var eval = (from e in dbContext.Evaluation
                            select e);

                return eval.Select(evalElem => new EvaluationFormModel { EvalTypeId = evalElem.Id - 1, EvaluationType = evalElem.Type }).ToList();
            }
        }

        public IEnumerable<EvaluationFormModel> GetClinicalOpinDevDel()
        {
            return new List<EvaluationFormModel>
            {
                new EvaluationFormModel {ClinOpinDevDelId = 0, ClinOpinDevDelChoice = "standardized tests were not applicable due to the child’s age"},
                new EvaluationFormModel {ClinOpinDevDelId = 1, ClinOpinDevDelChoice = "standardized tests were not applicable due to significant illness"},
                new EvaluationFormModel {ClinOpinDevDelId = 2, 
                    ClinOpinDevDelChoice = "standardized tests were not applicable because it would require significant adaptation for a child to perform the items, " +
                    "thereby invalidating the results."}
            };
        }

        public IEnumerable<EvaluationFormModel> GetEvaluationBasis()
        {
            return new List<EvaluationFormModel>
            {
                new EvaluationFormModel {EvalBasisId = 0, EvalBasisChoice = "Eligible"},
                new EvaluationFormModel {EvalBasisId = 1, EvalBasisChoice = "Eligibility Using Clinical Opinion to Substantiate Developmental Delay"},
                new EvaluationFormModel {EvalBasisId = 2, EvalBasisChoice = "Eligible based on diagnosed condition"},
                new EvaluationFormModel {EvalBasisId = 3, EvalBasisChoice = "Eligible based on expressive communication delay"},
                new EvaluationFormModel {EvalBasisId = 4, EvalBasisChoice = "Eligibility Using Medical Records to Substantiate Developmental Delay"},
                new EvaluationFormModel {EvalBasisId = 5, EvalBasisChoice = "Not Eligible"},
                new EvaluationFormModel {EvalBasisId = 6, EvalBasisChoice = "Annual Evaluation"},
                new EvaluationFormModel {EvalBasisId = 7, EvalBasisChoice = "Other"}
            };
        }

        public IEnumerable<EvaluationFormModel> GetEvaluationTypes()
        {
            using (_dbContext = new SarahIncContext())
            {
                var eval = (from e in _dbContext.Evaluation
                            where e.FormId == null
                    select e);

                return eval.Select(evalElem => new EvaluationFormModel {EvalTypeId = evalElem.Id - 1, EvaluationType = evalElem.Type}).ToList();
            }
        }

        public IEnumerable<EvaluationFormModel> GetGender()
        {
            return new List<EvaluationFormModel>
            {
                new EvaluationFormModel {GenderId = 0, Gender = "Male"},
                new EvaluationFormModel {GenderId = 1, Gender = "Female"}
            };
        }

        public IEnumerable<EvaluationFormModel> GetHearing()
        {
            return new List<EvaluationFormModel>
            {
                new EvaluationFormModel {HearingId = 0, HearingChoice = "Evaluation completed within the past year with normal results"},
                new EvaluationFormModel {HearingId = 1, HearingChoice = "Evaluation completed within the past year with inconclusive results"},
                new EvaluationFormModel {HearingId = 2, HearingChoice = "Evaluation completed within the past year with noted concerns"},
                new EvaluationFormModel {HearingId = 3, HearingChoice = "Evaluation has not been completed within the past year"},
                new EvaluationFormModel {HearingId = 4, HearingChoice = "Evaluation appointment is pending"}
            };
        }

        public IEnumerable<EvaluationFormModel> GetNutritionScreening()
        {
            return new List<EvaluationFormModel>
            {
                new EvaluationFormModel {NutritionScreeningId = 0, NutritionScreeningChoice = "Completed with no concerns"},
                new EvaluationFormModel {NutritionScreeningId = 1, NutritionScreeningChoice = "Completed with noted concerns"},
            };
        }

        public IEnumerable<EvaluationFormModel> GetSigBirthHist()
        {
            return new List<EvaluationFormModel>
            {
                new EvaluationFormModel {SigBirthHistId = 0, SigBirthHistChoice = "congenital infection"},
                new EvaluationFormModel {SigBirthHistId = 1, SigBirthHistChoice = "craniofacial anomalies including cleft lip"},
                new EvaluationFormModel {SigBirthHistId = 2, SigBirthHistChoice = "birth weight less than 1500 grams"},
                new EvaluationFormModel {SigBirthHistId = 3, SigBirthHistChoice = "hyperbilirubinemia at a level requiring exchange transfusion"},
                new EvaluationFormModel {SigBirthHistId = 4, SigBirthHistChoice = "ototoxic medications"},
                new EvaluationFormModel {SigBirthHistId = 5, SigBirthHistChoice = "bacterial meningitis"},
                new EvaluationFormModel {SigBirthHistId = 6, SigBirthHistChoice = "Apgar scores of 0-4 at one minute and 0-6 at five minutes"},
                new EvaluationFormModel {SigBirthHistId = 7, SigBirthHistChoice = "mechanical ventilation lasting more than five days"},
                new EvaluationFormModel {SigBirthHistId = 8, SigBirthHistChoice = "head trauma associated with loss of consciousness or skull fracture"}
            };
        }

        public IEnumerable<EvaluationFormModel> GetVision()
        {
            return new List<EvaluationFormModel>
            {
                new EvaluationFormModel {VisionId = 0, VisionChoice = "Evaluation completed within the past year with normal results"},
                new EvaluationFormModel {VisionId = 1, VisionChoice = "Evaluation completed within the past year with inconclusive results"},
                new EvaluationFormModel {VisionId = 2, VisionChoice = "Evaluation completed within the past year with noted concerns"},
                new EvaluationFormModel {VisionId = 3, VisionChoice = "Evaluation has not been completed within the past year"},
                new EvaluationFormModel {VisionId = 4, VisionChoice = "Evaluation appointment is pending"}
            };
        }

        public IEnumerable<EvaluationFormModel> GetVisionScreening()
        {
            return new List<EvaluationFormModel>
            {
                new EvaluationFormModel {VisionScreeningId = 0, VisionScreeningChoice = "Completed with no concerns"},
                new EvaluationFormModel {VisionScreeningId = 1, VisionScreeningChoice = "Completed with noted concerns"},
            };
        }

    }
}
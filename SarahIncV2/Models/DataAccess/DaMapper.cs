using AutoMapper;
using SarahIncV2.DbModels;

namespace SarahIncV2.Models
{
    public class DaMapper : Profile
    {
        public DaMapper()
        {
            // Read
            CreateMap<Audit, AuditModel>();
            CreateMap<Evaluation, EvaluationModel>();
            CreateMap<EvaluationSubject, EvaluationSubjectModel>();
            CreateMap<Form, FormModel>();
            CreateMap<FormArea, FormAreaModel>();
            CreateMap<FormUser, FormUserModel>();
            CreateMap<FormVariable, FormVariableModel>();
            CreateMap<PrintOption, PrintOptionModel>();
            CreateMap<PrintVariable, PrintVariableModel>();
            CreateMap<Role, RoleModel>();
            CreateMap<Setting, SettingModel>();
            CreateMap<Subject, SubjectModel>();
            CreateMap<TemplateArea, TemplateAreaModel>();
            CreateMap<TemplateVariable, TemplateVariableModel>();
            CreateMap<User, UserModel>();

            // Write
            CreateMap<AuditModel, Audit>();
            CreateMap<EvaluationModel, Evaluation>();
            CreateMap<EvaluationSubjectModel, EvaluationSubject>();
            CreateMap<FormModel, Form>().ForMember(d => d.TempId, o => o.Condition(s => s.TempId != -1));
            CreateMap<FormAreaModel, FormArea>();
            CreateMap<FormUserModel, FormUser>();
            CreateMap<FormVariableModel, FormVariable>();
            CreateMap<PrintOptionModel, PrintOption>();
            CreateMap<PrintVariableModel, PrintVariable>();
            CreateMap<RoleModel, Role>();
            CreateMap<SettingModel, Setting>();
            CreateMap<SubjectModel, Subject>();
            CreateMap<TempFormModel, FormModel>(); //.ForMember(t => t.TemplateVariableModels, o => o.Ignore());
            CreateMap<TemplateAreaModel, TemplateArea>();
            CreateMap<TemplateVariableModel, TemplateVariable>();
            CreateMap<UserModel, User>().ForMember(d => d.UserId, o => o.Condition(s => s.UserId != -1));
        }
    }
}

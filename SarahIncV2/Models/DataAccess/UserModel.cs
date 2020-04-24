using System.Collections.Generic;
using AutoMapper;

namespace SarahIncV2.Models
{
    public partial class UserModel : DaGen<UserModel>
    {
        public UserModel(IMapper _mapper) : base(_mapper)
        {

        }

        public int UserId { get; set; }
        public int RoleId { get; set; }
        public string Username { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Email { get; set; }
        public string Title { get; set; }
        public string Password { get; set; }
        public bool Lockedout { get; set; }

        public RoleModel RoleModel { get; set; }
        public List<FormModel> FormModels { get; set; }
        public List<FormUserModel> FormUserModels { get; set; }
        public List<TemplateVariableModel> TemplateVariableModels { get; set; }
    }
}

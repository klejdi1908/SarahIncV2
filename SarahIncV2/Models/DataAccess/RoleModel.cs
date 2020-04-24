using System.Collections.Generic;
using AutoMapper;

namespace SarahIncV2.Models
{
    public partial class RoleModel : DaGen<RoleModel>
    {
        public RoleModel(IMapper _mapper) : base(_mapper)
        {

        }

        public int RoleId { get; set; }
        public string Rolename { get; set; }
        public short AccessLevel { get; set; }

        public List<UserModel> UserModels { get; set; }
    }
}

using System;
using System.Collections.Generic;

namespace SarahIncV2.DbModels
{
    public partial class Role
    {
        public Role()
        {
            User = new HashSet<User>();
        }

        public int RoleId { get; set; }
        public string Rolename { get; set; }
        public short AccessLevel { get; set; }

        public ICollection<User> User { get; set; }
    }
}

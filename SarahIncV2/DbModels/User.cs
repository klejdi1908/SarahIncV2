using System;
using System.Collections.Generic;

namespace SarahIncV2.DbModels
{
    public partial class User
    {
        public User()
        {
            Form = new HashSet<Form>();
            FormUser = new HashSet<FormUser>();
            TemplateVariable = new HashSet<TemplateVariable>();
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

        public Role Role { get; set; }
        public ICollection<Form> Form { get; set; }
        public ICollection<FormUser> FormUser { get; set; }
        public ICollection<TemplateVariable> TemplateVariable { get; set; }
    }
}

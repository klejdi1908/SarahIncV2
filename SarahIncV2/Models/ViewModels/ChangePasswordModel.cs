using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SarahIncV2.Models
{
    public class ChangePasswordModel
    {
        public string email { get; set; }
        public int userId { get; set; }
        public string newPass { get; set; }
    }
}
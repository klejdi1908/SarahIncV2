using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SarahIncV2.Models
{
    public partial class AdminModel
    {
        public List<UserModel> UserModels { get; set; }
        public List<TempFormModel> TempFormModels { get; set; }
    }
}
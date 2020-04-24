using SarahIncV2.Helpers;

namespace SarahIncV2.Models
{
    public partial class UserModel
    {
        public int RoleValue { get; set; }
        public string RoleName {get;set;}
        public string Fullname { get; set; }
        public string LockedoutStr { get; set; }
        public string NewPass { get; set; }

        public void MapUser()
        {
            RoleId = RoleName == Constants.RoleAdminStr
                ? Constants.RoleAdmin
                : (RoleName == Constants.RoleUserStr ? Constants.RoleUser : Constants.RoleGuest);

            Lockedout = LockedoutStr != Constants.LockedOutOk;
        }
    }
}
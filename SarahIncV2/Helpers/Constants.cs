namespace SarahIncV2.Helpers
{
    public class Constants
    {
        public const short AuditActionTypeLoginFail = 0;
        public const short AuditActionTypeLoginSuccess = 1;
        public const short AuditTableTypeEval = 0;
        public const short AuditTableTypeRole = 1;
        public const short AuditTableTypeSet = 2;
        public const short AuditTableTypeUser = 3;
        public const string LockedOutLockedOut = "Locked Out";
        public const string LockedOutOk = "OK";
        public const int RoleGuest = 1;
        public const int RoleUser = 2;
        public const int RoleAdmin = 3;
        public const string RoleAdminStr = "Admin";
        public const string RoleGuestStr = "Guest";
        public const string RoleUserStr = "User";
        public const int TempPasswordLength = 11;
        public const int TempPasswordNonAlphanumericChars = 2;
    }
}
using SarahIncV2.DbModels;
using SarahIncV2.Helpers;
using System.ComponentModel.DataAnnotations;
using System.Linq;


namespace SarahIncV2.Models
{
    public partial class RegistrationViewModel
    {
        [Required]
        [Display(Name = "Username")]
        [StringLength(128, ErrorMessage = "Less than 128 characters")]
        public string Username { get; set; }

        [Required(ErrorMessage="First Name Required:")]
        [Display(Name ="First Name")]
        [RegularExpression(@"^[a-zA-Z'.\s]{1,40}$", ErrorMessage="Special Characters not allowed")]
        [StringLength(50, ErrorMessage = "Less than 50 characters")]
        public string FirstName { get; set; }
 
        [Required(ErrorMessage="Last Name Required:")]
        [RegularExpression(@"^[a-zA-Z'.\s]{1,40}$", ErrorMessage = "Special Characters not allowed")]
        [Display(Name ="Last Name")]
        [StringLength(50, ErrorMessage = "Less than 50 characters")]
        public string LastName { get; set; }
 
        [Required(ErrorMessage="Email Address Required:")]
        [Display(Name ="Email Address")]
        [RegularExpression(@"^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$", ErrorMessage = "Email Format is wrong")]
        [StringLength(50, ErrorMessage = "Less than 50 characters")]
        public string Email { get; set; }
 
        [Required(ErrorMessage="Password Required:")]
        [DataType(DataType.Password)]
        [Display(Name ="Password")]
        [StringLength(22, ErrorMessage = "Less than 22 characters")]
        public string Password { get; set; }
 
        [Required(ErrorMessage="Confirm Password Required:")]
        [DataType(DataType.Password)]
        [Compare("Password", ErrorMessage = "Confirm not matched.")]
        [Display(Name = "Confirm password:")]
        [StringLength(30, ErrorMessage = "Less than 30 characters")]
        public string ConfirmPassword { get; set; }

        public bool DoesUserExist(string username)
        {
            using (var dbContext = new SarahIncContext())
            {
                var userList = (from u in dbContext.User
                    where u.Username == username
                    select u).FirstOrDefault();

                if (userList != null) return true;
            }

            return false;
        }
 
        public bool Insert()
        {
            if (DoesUserExist(Username)) return false;
            using (var dbContext = new SarahIncContext())
            {
                var user = new User();
                dbContext.User.Add(user);
                user.RoleId = Constants.RoleUser;
                user.Username = Username;
                user.Firstname = FirstName;
                user.Lastname = LastName;
                user.Email = Email;
                user.Password = UserData.CreateHash(Password);
                var ab = user.Password.Length;
                dbContext.SaveChanges();
            }
            return true;
        }
    }  
}
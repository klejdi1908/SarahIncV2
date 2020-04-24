using System.ComponentModel.DataAnnotations;

namespace SarahIncV2.Models
{
    public partial class LoginViewModel
    {
        [Required]
        [Display(Name = "User name")]
        [StringLength(128)]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        [StringLength(22)]
        public string Password { get; set; }

        [Display(Name = "Remember me?")]
        public bool RememberMe { get; set; }
    }
}
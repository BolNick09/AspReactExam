using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Server.Services;
using System.ComponentModel.DataAnnotations;

namespace Server.Pages.Accounts
{
    public class LoginModel : PageModel
    {
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly JwtService _jwtService;

        public LoginModel(
            SignInManager<IdentityUser> signInManager,
            UserManager<IdentityUser> userManager,
            JwtService jwtService)
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _jwtService = jwtService;
        }

        [BindProperty]
        public InputModel Input { get; set; }

        public class InputModel
        {
            [Required]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            [DataType(DataType.Password)]
            public string Password { get; set; }
        }

        // Стандартный GET-метод для UI
        public void OnGet() { }

        // API-метод для входа (вызывается из React)
        [Route("/api/auth/login")]
        [IgnoreAntiforgeryToken]
        public async Task<IActionResult> OnPostLoginApiAsync()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _signInManager.PasswordSignInAsync(
                Input.Email, Input.Password, isPersistent: false, lockoutOnFailure: false);

            if (!result.Succeeded)
                return Unauthorized();

            var user = await _userManager.FindByEmailAsync(Input.Email);
            var token = _jwtService.GenerateToken(user);

            return new JsonResult(new { token });
        }
    }
}

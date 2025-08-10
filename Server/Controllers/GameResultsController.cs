using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameResultsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public GameResultsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // POST: api/GameResults
        // Сохранение результата игры
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> SaveResult([FromBody] SaveResultRequest request)
        {
            if (request == null)
                return BadRequest("Invalid request body.");

            if (request.Score < 0)
                return BadRequest("Score cannot be negative.");

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var username = User.Identity?.Name;

            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(username))
                return Unauthorized();

            var result = new GameResult
            {
                UserId = userId,
                Username = username,
                Score = request.Score,
                PlayedAt = DateTime.UtcNow
            };

            _context.GameResults.Add(result);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Result saved successfully." });
        }

        // GET: api/GameResults
        // Получение таблицы лидеров
        [HttpGet]
        public async Task<IActionResult> GetLeaderboard()
        {
            var leaderboard = await _context.GameResults
                .OrderByDescending(r => r.Score)
                .ThenBy(r => r.PlayedAt)
                .Select(r => new
                {
                    r.Username,
                    r.Score,
                    r.PlayedAt
                })
                .ToListAsync();

            return Ok(leaderboard);
        }

        // GET: api/GameResults/my
        // Получение личных результатов
        [HttpGet("my")]
        [Authorize]
        public async Task<IActionResult> GetMyResults()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (userId == null)
                return Unauthorized();

            var myResults = await _context.GameResults
                .Where(r => r.UserId == userId)
                .OrderByDescending(r => r.Score)
                .Select(r => new
                {
                    r.Score,
                    r.PlayedAt
                })
                .ToListAsync();

            return Ok(myResults);
        }
    }
}
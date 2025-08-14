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

        // POST: /api/GameResults/save
        [HttpPost("save")]
        [Authorize]
        public async Task<IActionResult> Save([FromBody] SaveGameResultDto dto)
        {
            if (dto == null)
            {
                return BadRequest("Empty payload");
            }

            // Имя пользователя берём из токена
            string? username = User.Identity?.Name
                ?? User.FindFirstValue(ClaimTypes.NameIdentifier);
            ;

            if (string.IsNullOrWhiteSpace(username))
            {
                return Unauthorized("Username not found in token");
            }

            var entity = new GameResult
            {
                Username = username,
                Score = dto.Score,
                TimeInSeconds = dto.TimeInSeconds,
                Clicks = dto.Clicks,
                PlayedAt = DateTime.UtcNow
            };

            _context.GameResults.Add(entity);
            await _context.SaveChangesAsync();

            return Ok(new
            {
                entity.Id,
                entity.Username,
                entity.Score,
                entity.TimeInSeconds,
                entity.Clicks,
                entity.PlayedAt
            });
        }

        // GET: /api/GameResults/my
        [HttpGet("my")]
        [Authorize]
        public async Task<IActionResult> My()
        {
            string? username = User.Identity?.Name
                ?? User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;

            if (string.IsNullOrWhiteSpace(username))
            {
                return Unauthorized("Username not found in token");
            }

            var myResults = await _context.GameResults
                .Where(r => r.Username == username)
                .OrderByDescending(r => r.Score)
                .ThenBy(r => r.TimeInSeconds)
                .ThenBy(r => r.Clicks)
                .Select(r => new
                {
                    r.Score,
                    r.TimeInSeconds,
                    r.Clicks,
                    r.PlayedAt
                })
                .ToListAsync();

            return Ok(myResults);
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
                    r.PlayedAt,
                    r.TimeInSeconds,
                    r.Clicks
                })
                .ToListAsync();

            return Ok(leaderboard);
        }
    }
}
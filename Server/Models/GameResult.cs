using System;

namespace Server.Models
{
    public class GameResult
    {
        public int Id { get; set; }
        public string Username { get; set; } = string.Empty;
        public int Score { get; set; }
        public int TimeInSeconds { get; set; }   
        public int Clicks { get; set; }          
        public DateTime PlayedAt { get; set; }
    }
}
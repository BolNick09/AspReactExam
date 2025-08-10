using System;

namespace Server.Models
{
    public class GameResult
    {
        public int Id { get; set; }
        public string UserId { get; set; }       
        public string Username { get; set; }     
        public int Score { get; set; }
        public DateTime PlayedAt { get; set; }
    }
}
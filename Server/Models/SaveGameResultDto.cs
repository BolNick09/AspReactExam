namespace Server.Models
{
    // DTO для приема результата игры
    public class SaveGameResultDto
    {
        public int Score { get; set; }
        public int TimeInSeconds { get; set; }
        public int Clicks { get; set; }
    }
}
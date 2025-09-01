import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className="page-container">
            <div className="hero-section">
                <h1 className="hero-title">🎮 Добро пожаловать в Memory Game!</h1>
                <p className="hero-subtitle">Проверь свою память и реакцию в увлекательной игре</p>
                <div className="hero-features">
                    <Link to="/game" className="feature-link">
                        <div className="feature">
                            <span>⚡</span>
                            <h3>Быстрая игра</h3>
                            <p>Найди все пары карточек как можно быстрее</p>
                        </div>
                    </Link>
                    <Link to="/results" className="feature-link">
                        <div className="feature">
                            <span>🏆</span>
                            <h3>Таблица рекордов</h3>
                            <p>Соревнуйся с другими игроками</p>
                        </div>
                    </Link>
                    <Link to="/register" className="feature-link">
                        <div className="feature">
                            <span>🔐</span>
                            <h3>Безопасность</h3>
                            <p>Сохраняй свои результаты</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
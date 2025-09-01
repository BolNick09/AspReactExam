import { Link } from "react-router-dom";

export default function DeadEnd() {
    return (
        <div className="page-container">
            <div className="error-page">
                <h1>404 🫤</h1>
                <p>Страница не найдена</p>
                <Link to="/" className="back-button">
                    ← Вернуться на главную
                </Link>
            </div>
        </div>
    );
}
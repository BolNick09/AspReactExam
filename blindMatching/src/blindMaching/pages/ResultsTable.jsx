import { useState, useEffect } from 'react';
import { getAllResults } from "../scripts/gameResultsApi"

export default function ResultsTable() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const serverResults = await getAllResults();
        console.log (serverResults)
        const mapped = serverResults.map(r => ({
          playerName: r.username || r.Username || 'Аноним',
          score: r.score || 0,
          date: r.playedAt || (new Date()).toISOString(),
          time: r.timeInSeconds || null,          
          clicks: r.clicks || null
        }));
        setResults(mapped.sort((a, b) => b.score - a.score));
        return;
      } catch (e) {
        console.warn('Не удалось получить результаты с сервера, используем localStorage', e);
      }

      const storedResults = JSON.parse(localStorage.getItem('memoryGameResults') || '[]');
      setResults(storedResults.sort((a, b) => b.score - a.score));
    })();
  }, []);

  return (
    <div style={{ margin: '20px', maxWidth: '600px' }}>
      <h2>Таблица рекордов</h2>
      {results.length === 0 ? (
        <p>Пока нет сохраненных результатов</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeaderStyle}>Место</th>
              <th style={tableHeaderStyle}>Игрок</th>
              <th style={tableHeaderStyle}>Очки</th>
              <th style={tableHeaderStyle}>Дата</th>
              <th style={tableHeaderStyle}>Время (сек)</th>
              <th style={tableHeaderStyle}>Клики</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} style={index % 2 === 0 ? evenRowStyle : oddRowStyle}>
                <td style={tableCellStyle}>{index + 1}</td>
                <td style={tableCellStyle}>{result.playerName || 'Аноним'}</td>
                <td style={tableCellStyle}>{result.score}</td>
                <td style={tableCellStyle}>{result.date}</td>
                <td style={tableCellStyle}>{result.time}</td>
                <td style={tableCellStyle}>{result.clicks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const tableHeaderStyle = {
  padding: '8px',
  border: '1px solid #ddd',
  textAlign: 'left',
  backgroundColor: '#000000ff'
};

const tableCellStyle = {
  padding: '8px',
  border: '1px solid #ddd',
  color: 'black'
};

const evenRowStyle = {
  backgroundColor: '#f9f9f9'
};

const oddRowStyle = {
  backgroundColor: 'white'
};
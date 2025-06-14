import React, { useEffect } from 'react';

declare global {
  interface Window {
    Telegram: any;
  }
}

const App: React.FC = () => {
  useEffect(() => {
    if (window.Telegram?.WebApp?.ready) {
      window.Telegram.WebApp.ready();
    }
  }, []);

  const handleSendData = () => {
    if (window.Telegram?.WebApp?.sendData) {
      const payload = {
        from: 'react',
        test: true,
        timestamp: new Date().toISOString(),
      };
      window.Telegram.WebApp.sendData(JSON.stringify(payload));
    } else {
      console.warn('Telegram WebApp not available');
    }
  };

  return (
    <div style={{ padding: 24, fontFamily: 'sans-serif' }}>
      <h1>Zadrostore Mini App</h1>
      <button
        onClick={handleSendData}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          borderRadius: '8px',
          background: '#0088cc',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Отправить в Django
      </button>
    </div>
  );
};

export default App;


import React, { useEffect } from 'react';
import { Button } from './components/ui/button';
import Catalog from './components/Catalog';

declare global {
  interface Window {
    Telegram: any;
  }
}

const App: React.FC = () => {
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    tg?.ready(); // вызываем один раз для инициализации
  }, []);

  const handleSendData = () => {
    const tg = window.Telegram?.WebApp;

    const payload = {
      from: 'react',
      via: 'custom_button',
      timestamp: new Date().toISOString(),
    };

    console.log("📤 CUSTOM SEND:", payload);
    tg?.sendData(JSON.stringify(payload));
  };

  return (
    <div className="p-6 font-sans bg-red-500 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Zadrostore Mini App</h1>
      <p className="text-lg mb-6">Нажми кнопку внизу Telegram ⬇️</p>

      <Button
        variant="secondary"
        size="lg"
        onClick={handleSendData}
      >
        Отправить в Django
      </Button>

      <div className="mt-10">
        <Catalog />
      </div>
    </div>
  );
};

export default App;

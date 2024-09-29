import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Импортируем необходимые компоненты
import DataContainer from './components/Data container/DataContainer';

// Создаём экземпляр QueryClient
const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}> {/* Оборачиваем приложение в QueryClientProvider */}
      <div className="App">
        <h1>Fake Data Generator</h1>
        <DataContainer />
      </div>
    </QueryClientProvider>
  );
};

export default App;

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import DataContainer from './components/dataContainer/DataContainer';
import AppProvider from './appProvider/AppProvider';
import 'bootstrap/dist/css/bootstrap.min.css';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <AppProvider> 
      <QueryClientProvider client={queryClient}>
        <div className="App">
          <DataContainer />
        </div>
      </QueryClientProvider>
    </AppProvider>
  );
};

export default App;

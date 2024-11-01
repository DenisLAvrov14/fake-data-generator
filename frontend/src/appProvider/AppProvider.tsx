import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import store from '../store/store';

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default AppProvider;

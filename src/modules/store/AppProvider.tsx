import AppContext from './AppContext';

const AppProvider: React.FC = ({ children }): JSX.Element => {
  const ctx = 'test';

  return <AppContext.Provider value={ctx}>{children}</AppContext.Provider>;
};

export default AppProvider;

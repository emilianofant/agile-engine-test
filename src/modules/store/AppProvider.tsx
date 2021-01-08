import { useEffect, useState } from 'react';
import Core from '../core/core';
import AppContext from './AppContext';

const AppProvider: React.FC = ({ children }): JSX.Element => {
  const [core] = useState<Core>(new Core());
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const getAuthBearer = async () => {
    const res = await core.getAuth();
    setIsAuth(res.auth);
  };

  useEffect(() => {
    getAuthBearer();
  }, []);

  return <AppContext.Provider value={{ core, isAuth }}>{children}</AppContext.Provider>;
};

export default AppProvider;

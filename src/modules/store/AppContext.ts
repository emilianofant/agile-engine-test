import React from 'react';
import Core from '../core/core';

interface IAppContext {
  core: Core | null;
  isAuth: boolean;
}

const AppContext = React.createContext<IAppContext>({
  core: null,
  isAuth: false,
});

export default AppContext;

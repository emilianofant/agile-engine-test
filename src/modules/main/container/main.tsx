import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import AppContext from '../../store/AppContext';

const MainContainer: FunctionComponent = () => {
  const appContext = useContext(AppContext);

  return (
    <div>
      <h2>My Photos Gallery</h2>
    </div>
  );
};

export default MainContainer;

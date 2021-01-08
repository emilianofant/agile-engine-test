import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import { IPicturesPage } from '../../core/types';
import AppContext from '../../store/AppContext';
import Gallery from '../components/gallery/gallery';

const MainContainer: FunctionComponent = () => {
  const appContext = useContext(AppContext);
  const { core, isAuth } = appContext;
  const [picturesPage, setPicturesPage] = useState<IPicturesPage | undefined>(undefined);

  useEffect(() => {
    const getPicturesPageData = async () => {
      const res = await core?.getImages();
      setPicturesPage(res);
    };

    // @todo: eventually, a pagination component will manage
    //        the photos management.
    if (isAuth && picturesPage === undefined) {
      getPicturesPageData();
    }
  }, [core, isAuth, picturesPage]);

  return (
    <div>
      <h2>My Photo Gallery</h2>
      <Gallery picturesPage={picturesPage} />
    </div>
  );
};

export default MainContainer;

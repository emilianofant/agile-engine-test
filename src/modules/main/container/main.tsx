import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { IPicture, IPicturesPage } from '../../core/types';
import AppContext from '../../store/AppContext';
import Gallery from '../components/gallery/gallery';
import PhotoView from '../components/photoView/photoView';

const MainContainer: FunctionComponent = () => {
  const appContext = useContext(AppContext);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const { core, isAuth } = appContext;
  const [picturesPage, setPicturesPage] = useState<IPicturesPage | undefined>(undefined);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [imageId, setImageId] = useState<string | null>(null);
  const [pictureData, setPictureData] = useState<IPicture | null>(null);

  const openModal = async (id: string) => {
    const imageData = (await core?.getImageData(id)) || null;
    setPictureData(imageData);

    setIsOpen(true);
  };

  const afterOpenModal = () => {
    // subtitle.style.color = '#f00';
  };

  const closeModal = () => {
    setIsOpen(false);
  };

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

  Modal.setAppElement('#root');

  return (
    <div>
      <h2>My Photo Gallery</h2>
      <Gallery picturesPage={picturesPage} onImageClick={(id: string) => openModal(id)} />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Photo information"
      >
        <PhotoView picture={pictureData}></PhotoView>
      </Modal>
    </div>
  );
};

export default MainContainer;

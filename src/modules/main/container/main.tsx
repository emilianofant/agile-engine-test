import React, { FunctionComponent, useContext, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { IPagination, IPicture, IPicturesPage } from '../../core/types';
import AppContext from '../../store/AppContext';
import Gallery from '../components/gallery/gallery';
import PhotoView from '../components/photoView/photoView';

const MainContainer: FunctionComponent = () => {
  const appContext = useContext(AppContext);
  // Modal styles
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
  const [picturesPage, setPicturesPage] = useState<IPicturesPage>();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [pagination, setPagination] = useState<IPagination>({
    currentIndex: 0,
    hasNext: false,
    hasPrev: false,
  });
  const [pictureData, setPictureData] = useState<IPicture | null>(null);

  const updatePagination = () => {
    if (picturesPage && pictureData) {
      const { pictures } = picturesPage;
      const picIndex = pictures.find((p) => p.id === pictureData.id);
      if (picIndex !== undefined) {
        const index = pictures.indexOf(picIndex);
        setPagination({
          currentIndex: index,
          hasNext: Boolean(pictures[index + 1]),
          hasPrev: Boolean(pictures[index - 1]),
        });
      }
    }
  };

  const openModal = async (id: string) => {
    const imageData = (await core?.getImageData(id)) || null;
    setPictureData(imageData);

    setIsOpen(true);
  };

  // This could go on a pagination component
  const onNavigationChange = async (direction: string) => {
    let newImageData: IPicture | null;
    if (picturesPage !== undefined) {
      if (direction === 'next') {
        newImageData =
          (await core?.getImageData(picturesPage.pictures[pagination.currentIndex + 1].id)) || null;
      } else {
        newImageData =
          (await core?.getImageData(picturesPage.pictures[pagination.currentIndex - 1].id)) || null;
      }
      setPictureData(newImageData);
    }
  };

  const afterOpenModal = () => {
    // updatePagination();
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
    if (pictureData) {
      updatePagination();
    }
  }, [core, isAuth, picturesPage, pictureData]);

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
        <PhotoView
          picture={pictureData}
          onHandleNavigation={onNavigationChange}
          pagination={pagination}
        ></PhotoView>
      </Modal>
    </div>
  );
};

export default MainContainer;

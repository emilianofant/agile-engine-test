import { FunctionComponent } from 'react';
import { IPicturesPage } from '../../../core/types';
import './gallery.scss';

interface IGalleryProps {
  picturesPage: IPicturesPage | undefined;
  onImageClick: (id: string) => void;
}

const Gallery: FunctionComponent<IGalleryProps> = (props) => {
  const { picturesPage, onImageClick } = props;
  const handleOpenModal = (id: string) => {
    onImageClick(id);
  };

  return (
    <div className="gallery">
      {picturesPage?.pictures ? (
        <div className="gallery_wrapper">
          {picturesPage.pictures.map((p) => {
            return <img key={p.id} src={p.cropped_picture} onClick={() => handleOpenModal(p.id)} />;
          })}
        </div>
      ) : (
        'no images'
      )}
    </div>
  );
};

export default Gallery;

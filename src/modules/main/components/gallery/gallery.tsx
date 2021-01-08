import React, { FunctionComponent } from 'react';
import { IPicturesPage } from '../../../core/types';
import './gallery.scss';

interface IGalleryProps {
  picturesPage: IPicturesPage | undefined;
}

const Gallery: FunctionComponent<IGalleryProps> = (props) => {
  const { picturesPage } = props;
  return (
    <div className="gallery">
      {picturesPage?.pictures ? (
        <div className="gallery_wrapper">
          {picturesPage.pictures.map((p) => {
            return <img key={p.id} src={p.cropped_picture} />;
          })}
        </div>
      ) : (
        'no images'
      )}
    </div>
  );
};

export default Gallery;

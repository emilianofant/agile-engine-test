import React, { FunctionComponent } from 'react';
import { IPicture } from '../../../core/types';
import './photoView.scss';

interface IPhotoViewProps {
  picture: IPicture | null;
}

const PhotoView: FunctionComponent<IPhotoViewProps> = (props) => {
  const { picture } = props;
  return (
    <div>
      {picture ? (
        <div className="photoView">
          <h2>{picture.id}</h2>
          <div className="photoView_pictureContainer">
            <img
              className="photoView_pictureContainer_img"
              src={picture.full_picture}
              alt="Image"
            />
            <div className="photoView_pictureContainer_tags">{picture.tags}</div>
          </div>
          <span>{picture.author}</span>
          <span>{picture.camera}</span>
        </div>
      ) : (
        'No data available'
      )}
    </div>
  );
};

export default PhotoView;

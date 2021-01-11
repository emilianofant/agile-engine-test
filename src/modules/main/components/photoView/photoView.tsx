import React, { FunctionComponent } from 'react';
import { IPagination, IPicture } from '../../../core/types';
import './photoView.scss';

interface IPhotoViewProps {
  picture: IPicture | null;
  pagination: IPagination;
  onHandleNavigation: any;
}

const PhotoView: FunctionComponent<IPhotoViewProps> = (props) => {
  const { picture, pagination, onHandleNavigation } = props;
  const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${picture?.full_picture}`;

  return (
    <>
      {picture ? (
        <div className="photoView">
          <div className="photoView_pictureContainer">
            <img
              className="photoView_pictureContainer_img"
              src={picture.full_picture}
              alt="Image"
            />
            {/* Example sharing an image through FB. Ideally, it should share the gallery URL. */}
            <button className="circular ui icon button shareButton">
              <a href={facebookShareURL}>
                <i className="icon share"></i>
              </a>
            </button>
            <div className="photoView_pictureContainer_tags">
              <h4 className="ui horizontal divider header">
                <i className="bar chart icon"></i>
                Photo information
              </h4>
              <table className="ui definition table">
                <tbody>
                  <tr>
                    <td className="two wide column">Author</td>
                    <td>{picture.author}</td>
                  </tr>
                  <tr>
                    <td>Camera</td>
                    <td>{picture.camera}</td>
                  </tr>
                  <tr>
                    <td>Hashtags</td>
                    <td>{picture.tags}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="photoView_buttonsContainer">
            <div className="ui buttons">
              <button
                className="ui labeled icon button"
                onClick={() => onHandleNavigation('prev')}
                disabled={!pagination.hasPrev}
              >
                <i className="left chevron icon"></i>
                Prev
              </button>
              <button
                className="ui right labeled icon button"
                onClick={() => onHandleNavigation('next')}
                disabled={!pagination.hasNext}
              >
                Next
                <i className="right chevron icon"></i>
              </button>
            </div>
          </div>
        </div>
      ) : (
        'No data available'
      )}
    </>
  );
};

export default PhotoView;

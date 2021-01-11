export interface IPicturesPage {
  pictures: Array<IPictureMin>;
  hasMore: boolean;
  page: number;
  pageCount: number;
}

export interface IPictureMin {
  id: string;
  cropped_picture: string;
}

export interface IPicture {
  id: string;
  author: string;
  camera: string;
  tags: string;
  cropped_picture: string;
  full_picture: string;
}

export interface IPagination {
  currentIndex: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export type DoujinshiUploaderProps = {};
export interface ImageData {
  id: string;
  name: string;
  url: string;
  order: number;
}

export interface Chapter {
  id: number;
  title: string;
  images: ImageData[];
}

export interface Image {
  uuid: string;
  password: string;
  name: string;
  src: string;
  index?: number;
}

export interface ImageInput {
  password: string;
  name: string;
  src: string;
  index?: number;
}

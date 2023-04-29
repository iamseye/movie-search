export interface ImageType {
  height: number;
  id: string;
  url: string;
  width: number;
}

export interface MovieType {
  id: string;
  image: ImageType;
  runningTimeInMinutes: number;
  nextEpisode: 'string';
  numberOfEpisodes: number;
  seriesStartYear: number;
  title: string;
  titleType: string;
  year: number;
  principals: unknown[];
}

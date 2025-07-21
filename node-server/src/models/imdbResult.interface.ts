export interface IImdbResult {
  description: Array<{
    '#ACTORS': string;
    '#AKA': string;
    '#IMDB_ID': string;
    '#IMDB_IV': string;
    '#IMDB_URL': string;
    '#IMG_POSTER': string;
    '#RANK': number;
    '#TITLE': string;
    '#YEAR': number;
    photo_height: number;
    photo_width: number;
  }>;
}

import { IItem } from '../../core/models/item';

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

export const convertImdbResult = (results: IImdbResult): IItem[] => {
  const { description: items } = results;

  return items.map(
    (item) =>
      ({
        category: 'movie',
        id: item['#IMDB_ID'],
        imageUrl: item['#IMG_POSTER'],
        name: item['#TITLE'],
        actors: item['#ACTORS'],
        year: item['#YEAR'],
        rank: item['#RANK'],
      } satisfies IItem)
  );
};

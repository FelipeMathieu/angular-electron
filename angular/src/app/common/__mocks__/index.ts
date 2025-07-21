import { IItem } from '../../core/models/item';
import { IImdbResult } from '../helpers/convert-imdb-result.helper';

export const MockImdbResult: IImdbResult = {
  description: [
    {
      '#ACTORS': 'Han',
      '#AKA': 'Rocky',
      '#IMDB_ID': '12',
      '#IMDB_IV': '231',
      '#IMDB_URL': 'string',
      '#IMG_POSTER': 'string',
      '#RANK': 123,
      '#TITLE': 'Rocky',
      '#YEAR': 2222,
      photo_height: 200,
      photo_width: 200,
    },
  ],
};

export const MockItems: IItem[] = [
  {
    actors: 'Han',
    category: 'Movie/TV series',
    id: '12',
    imageUrl: 'string',
    imgHeight: 200,
    imgWidth: 200,
    name: 'Rocky',
    rank: 123,
    year: 2222,
    detailsUrl: 'string',
  },
];

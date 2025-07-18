import { environment } from '../../../environments/environment';
import * as helper from '../../common/helpers/convert-imdb-result.helper';
import { IImdbResult } from '../../common/helpers/convert-imdb-result.helper';
import { IItem } from '../models/item';
import { ItemsCommandsAndQueriesService } from './items-commands-and-queries.service';
import { SearchItemsService } from './search-items.service';
import {
  createHttpFactory,
  HttpMethod,
  SpectatorHttp,
  SpyObject,
} from '@ngneat/spectator';

const mockSetItems = jasmine.createSpy();

describe('SearchItemsService', () => {
  const imdbResult: IImdbResult = {
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
  const result: IItem = {
    actors: 'Han',
    category: 'Movie',
    id: '12',
    imageUrl: 'string',
    imgHeight: 200,
    imgWidth: 200,
    name: 'Rocky',
    rank: 123,
    year: 2222,
  };

  let spectator: SpectatorHttp<SearchItemsService>;
  const createService = createHttpFactory({
    service: SearchItemsService,
    mocks: [ItemsCommandsAndQueriesService],
  });

  let mockCommandsAndQueriesService: SpyObject<ItemsCommandsAndQueriesService>;

  beforeEach(() => {
    spectator = createService();

    mockCommandsAndQueriesService =
      spectator.inject<ItemsCommandsAndQueriesService>(
        ItemsCommandsAndQueriesService
      );

    Object.defineProperty(mockCommandsAndQueriesService, 'Commands', {
      get: () => ({
        SetItems: mockSetItems,
      }),
    });
  });

  it('should be created', () => {
    const spy = spyOn(
      helper.ConverterHelper,
      'ConvertImdbResult'
    ).and.returnValue([result]);
    const searchTerm = 'breaking bad';

    spectator.service.GetItems(searchTerm);

    spectator
      .expectOne(`${environment.apiUrl}/search?q=${searchTerm}`, HttpMethod.GET)
      .flush(imdbResult);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(mockSetItems).toHaveBeenCalledOnceWith([result]);
  });
});

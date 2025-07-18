import { environment } from '../../../environments/environment';
import { ConverterHelper } from '../../common/helpers/convert-imdb-result.helper';
import { MockImdbResult, MockItems } from '../../common/__mocks__';
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
    const spy = spyOn(ConverterHelper, 'ConvertImdbResult').and.returnValue(
      MockItems
    );
    const searchTerm = 'breaking bad';

    spectator.service.GetItems(searchTerm);

    spectator
      .expectOne(`${environment.apiUrl}/search?q=${searchTerm}`, HttpMethod.GET)
      .flush(MockImdbResult);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(mockSetItems).toHaveBeenCalledOnceWith(MockItems);
  });
});

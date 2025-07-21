import {
  createComponentFactory,
  mockProvider,
  Spectator,
  SpyObject,
} from '@ngneat/spectator';
import { HomeComponent } from './home.component';
import { MockComponent } from 'ng-mocks';
import { ListItemsComponent } from './list-items/list-items.component';
import { SearchItemsService } from '../../core/services/search-items.service';
import { ItemsCommandsAndQueriesService } from '../../core/services/items-commands-and-queries.service';
import { BehaviorSubject, of } from 'rxjs';
import { MockItems } from '../../common/__mocks__';
import { fakeAsync } from '@angular/core/testing';

const mockResetStore = jasmine.createSpy();

const mockItemsSubject = new BehaviorSubject({
  data: MockItems,
  fetchStatus: 'idle',
});

describe('HomeComponent', () => {
  let spectator: Spectator<HomeComponent>;
  const createComponent = createComponentFactory({
    component: HomeComponent,
    declarations: [MockComponent(ListItemsComponent)],
    mocks: [SearchItemsService],
    providers: [
      mockProvider(ItemsCommandsAndQueriesService, {
        get Commands() {
          return {
            ResetStore: mockResetStore,
          };
        },
        get Queries() {
          return {
            Items$: mockItemsSubject.asObservable(),
          };
        },
      }),
    ],
    shallow: true,
    detectChanges: false,
  });

  let mockSearchItemsService: SpyObject<SearchItemsService>;

  beforeEach(() => {
    spectator = createComponent();

    mockSearchItemsService =
      spectator.inject<SearchItemsService>(SearchItemsService);

    spectator.detectChanges();
  });

  it('should render component', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });

  it('should have the search input enabled', () => {
    const element = spectator.query('#search-input') as HTMLInputElement;

    expect(element.disabled).toBeFalsy();
  });

  it('should not make a search if search input is empty. Using keyup enter', () => {
    const element = spectator.query('#search-input') as HTMLInputElement;

    spectator.dispatchKeyboardEvent(element, 'keyup', 'Enter');

    expect(mockSearchItemsService.GetItems).not.toHaveBeenCalled();
  });

  it('should not make a search if search input is empty. Using button click', () => {
    const element = spectator.query('#search-button')!;

    spectator.click(element);

    expect(mockSearchItemsService.GetItems).not.toHaveBeenCalled();
  });

  it('should call the get items functions when search text is filled out', () => {
    const searchText = 'god of war';
    const element = spectator.query('#search-input') as HTMLInputElement;
    const button = spectator.query('#search-button')!;

    spectator.typeInElement(searchText, element);

    spectator.click(button);

    expect(mockSearchItemsService.GetItems).toHaveBeenCalledOnceWith(
      searchText
    );
  });

  it('should disabled de input when loading results', fakeAsync(() => {
    mockItemsSubject.next({
      data: MockItems,
      fetchStatus: 'fetching',
    });

    spectator.detectChanges();
    spectator.tick();

    const element = spectator.query('#search-input') as HTMLInputElement;

    expect(element.disabled).toBeTruthy();
  }));
});

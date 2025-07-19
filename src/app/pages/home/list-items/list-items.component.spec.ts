import {
  createComponentFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { ListItemsComponent } from './list-items.component';
import { MockItems } from '../../../common/__mocks__';
import { BehaviorSubject } from 'rxjs';
import { ItemsCommandsAndQueriesService } from '../../../core/services/items-commands-and-queries.service';
import { MockComponent } from 'ng-mocks';
import { SelectedItemComponent } from '../../selected-item/selected-item.component';
import { Router } from '@angular/router';

const INITIAL_STATE = {
  data: MockItems,
  fetchStatus: 'idle',
};

const mockItemsSubject = new BehaviorSubject(INITIAL_STATE);

describe('ListItemsComponent', () => {
  let spectator: Spectator<ListItemsComponent>;
  const createComponent = createComponentFactory({
    component: ListItemsComponent,
    providers: [
      mockProvider(ItemsCommandsAndQueriesService, {
        get Queries() {
          return {
            Items$: mockItemsSubject.asObservable(),
          };
        },
      }),
    ],
    declarations: [MockComponent(SelectedItemComponent)],
    shallow: true,
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();

    mockItemsSubject.next(INITIAL_STATE);
    spectator.detectChanges();
  });

  it('should render list of items component', () => {
    expect(spectator.fixture.componentInstance).toBeTruthy();
  });

  it('should render the exact number of items', () => {
    const elements = spectator.queryAll('nz-card');

    expect(elements.length).toBe(MockItems.length);
  });

  it('should render empty list when there is no item', async () => {
    mockItemsSubject.next({
      data: [],
      fetchStatus: 'idle',
    });

    spectator.detectChanges();

    await spectator.fixture.whenStable();

    const element = spectator.query('nz-empty');

    expect(element).toBeTruthy();
  });

  it('should navigate to selected item', () => {
    const selectedItemRoute = 'selected-item';
    const item = MockItems[0];
    const element = spectator.queryAll('button')[0] as HTMLButtonElement;

    const router = spectator.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    expect(element).toBeTruthy();

    spectator.click(element);

    expect(navigateSpy).toHaveBeenCalledOnceWith([selectedItemRoute, item.id]);
  });

  it('should show up loading when is fetching results', async () => {
    mockItemsSubject.next({
      data: [],
      fetchStatus: 'fetching',
    });

    spectator.detectChanges();
    await spectator.fixture.whenStable();

    const element = spectator.query('nz-spin');

    expect(element).toBeTruthy();
  });
});

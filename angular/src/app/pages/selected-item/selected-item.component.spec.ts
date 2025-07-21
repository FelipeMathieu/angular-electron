import {
  createRoutingFactory,
  mockProvider,
  Spectator,
  SpectatorRoutingOptions,
} from '@ngneat/spectator';
import { SelectedItemComponent } from './selected-item.component';
import { MockItems } from '../../common/__mocks__';
import { ItemsCommandsAndQueriesService } from '../../core/services/items-commands-and-queries.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { fakeAsync } from '@angular/core/testing';
import { omit } from 'lodash';

const ID = MockItems[0].id;

const mockGetSelectedItems$ = jasmine.createSpy();

const INITIAL_STATE: SpectatorRoutingOptions<SelectedItemComponent> = {
  component: SelectedItemComponent,
  params: { id: ID },
  providers: [
    mockProvider(ItemsCommandsAndQueriesService, {
      get Queries() {
        return {
          GetSelectedItem$: mockGetSelectedItems$,
        };
      },
    }),
  ],
  shallow: true,
  detectChanges: false,
};

describe('SelectedItemComponent', () => {
  describe('When there is a selected item', () => {
    let spectator: Spectator<SelectedItemComponent>;
    const createComponent = createRoutingFactory(INITIAL_STATE);

    beforeEach(() => {
      mockGetSelectedItems$.and.returnValue(of(MockItems[0]));

      (window as any).electronAPI = {
        openExternal: jasmine.createSpy('openExternal'),
      };

      spectator = createComponent();
      spectator.detectChanges();
    });

    it('should render selected item component', () => {
      const descriptionElement = spectator.query('nz-descriptions');

      expect(spectator.fixture.componentInstance).toBeTruthy();
      expect(descriptionElement).toBeTruthy();
      expect(mockGetSelectedItems$).toHaveBeenCalledWith(ID);
    });

    it('should navigate to home page', () => {
      const router = spectator.inject(Router);
      const element = spectator.query('#go-to-home') as HTMLButtonElement;

      spectator.click(element);

      expect(router.navigate).toHaveBeenCalledOnceWith(['']);
    });

    it('should call IPC function to open the detail page of the item in an external browser', () => {
      const element = spectator.query('#open-details') as HTMLButtonElement;

      spectator.click(element);

      expect(window.electronAPI.openExternal).toHaveBeenCalledOnceWith(
        MockItems[0].detailsUrl
      );
    });
  });

  describe('When there is no selected item in the store', () => {
    let spectator: Spectator<SelectedItemComponent>;
    const createComponent = createRoutingFactory({
      ...omit(INITIAL_STATE, 'params'),
    });

    beforeEach(() => {
      spectator = createComponent();
      spectator.detectChanges();
    });

    it('should render the alert', () => {
      const element = spectator.query('nz-alert');

      expect(element).toBeTruthy();
    });
  });
});

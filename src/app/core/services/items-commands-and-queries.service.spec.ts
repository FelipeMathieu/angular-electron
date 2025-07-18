import { setEntities } from '@ngneat/elf-entities';
import ItemsStore from '../store/items.store';
import { ItemsCommandsAndQueriesService } from './items-commands-and-queries.service';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { MockItems } from './__mocks__';
import { fakeAsync, tick } from '@angular/core/testing';
import { take } from 'rxjs';
import { IItem } from '../models/item';

describe('ItemsCommandsAndQueriesService', () => {
  let spectator: SpectatorService<ItemsCommandsAndQueriesService>;
  const createService = createServiceFactory({
    service: ItemsCommandsAndQueriesService,
  });

  beforeEach(() => {
    spectator = createService();

    ItemsStore.update(setEntities(MockItems));
  });

  it('should reset the store', () => {
    const { ResetStore } = spectator.service.Commands;
    const { Items$ } = spectator.service.Queries;

    ResetStore();

    Items$.pipe(take(1)).subscribe((response) => {
      expect(response.data.length).toBe(0);
    });
  });

  it('should set items in the store', () => {
    const items: IItem[] = [
      ...MockItems,
      {
        ...MockItems[0],
        id: '13',
      },
    ];

    const { SetItems } = spectator.service.Commands;
    const { Items$ } = spectator.service.Queries;

    SetItems(items);

    Items$.pipe(take(1)).subscribe((response) => {
      expect(response.data).toEqual(items);
    });
  });

  it('should select the selected entity', () => {
    const id = MockItems[0].id;

    const { GetSelectedItem$ } = spectator.service.Queries;

    GetSelectedItem$(id)
      .pipe(take(1))
      .subscribe((response) => {
        expect(response).toEqual(MockItems[0]);
      });
  });
});

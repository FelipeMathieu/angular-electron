import { Injectable } from '@angular/core';
import ItemsStore from '../store/items.store';
import { selectAllEntities, setEntities } from '@ngneat/elf-entities';
import { IItem } from '../models/item';
import { joinRequestResult } from '@ngneat/elf-requests';

@Injectable({
  providedIn: 'root',
})
export class ItemsCommandsAndQueriesService {
  constructor() {}

  public get Queries() {
    return {
      Items$: this.Items$,
    };
  }

  public get Commands() {
    return {
      SetItems: this.SetItems,
    };
  }

  private get Items$() {
    return ItemsStore.pipe(selectAllEntities(), joinRequestResult(['items']));
  }

  private SetItems(items: IItem[]): void {
    ItemsStore.update(setEntities(items));
  }
}

import { Injectable } from '@angular/core';
import ItemsStore from '../store/items.store';
import {
  selectAllEntities,
  selectEntity,
  setEntities,
} from '@ngneat/elf-entities';
import { IItem } from '../models/item';
import { joinRequestResult } from '@ngneat/elf-requests';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ItemsCommandsAndQueriesService {
  constructor() {}

  public get Queries() {
    return {
      Items$: this.Items$,
      GetSelectedItem$: this.GetSelectedItem$,
    };
  }

  public get Commands() {
    return {
      SetItems: this.SetItems,
      ResetStore: this.ResetStore,
    };
  }

  private get Items$() {
    return ItemsStore.pipe(selectAllEntities(), joinRequestResult(['items']));
  }

  private GetSelectedItem$(id: number | string): Observable<IItem | undefined> {
    return ItemsStore.pipe(selectEntity(id));
  }

  private SetItems(items: IItem[]): void {
    ItemsStore.update(setEntities(items));
  }

  private ResetStore(): void {
    ItemsStore.reset();
  }
}

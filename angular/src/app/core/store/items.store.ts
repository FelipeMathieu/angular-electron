import { createStore } from '@ngneat/elf';
import { withEntities } from '@ngneat/elf-entities';
import { IItem } from '../models/item';

const ItemsStore = createStore(
  {
    name: 'Items',
  },
  withEntities<IItem>()
);

export default ItemsStore;

import { TestBed } from '@angular/core/testing';

import { ItemsCommandsAndQueriesService } from './items-commands-and-queries.service';

describe('ItemsCommandsAndQueriesService', () => {
  let service: ItemsCommandsAndQueriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsCommandsAndQueriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

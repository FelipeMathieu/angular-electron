import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ConverterHelper,
  type IImdbResult,
} from '../../common/helpers/convert-imdb-result.helper';
import { ItemsCommandsAndQueriesService } from './items-commands-and-queries.service';
import { trackRequestResult } from '@ngneat/elf-requests';

const path = 'api/items';

@Injectable({
  providedIn: 'root',
})
export class SearchItemsService {
  constructor(
    private readonly _httpClient: HttpClient,
    private readonly _service: ItemsCommandsAndQueriesService
  ) {}

  public GetItems(searchText: string): void {
    const { SetItems } = this._service.Commands;

    this._httpClient
      .get<IImdbResult>(
        `${environment.apiUrl}/${path}?searchText=${searchText}`
      )
      .pipe(
        take(1),
        tap((response) => {
          const items = ConverterHelper.ConvertImdbResult(response);

          SetItems(items);
        }),
        trackRequestResult(['items'], { skipCache: true })
      )
      .subscribe();
  }
}

import { Component } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { SearchItemsService } from '../../core/services/search-items.service';
import { ListItemsComponent } from './list-items/list-items.component';
import { ItemsCommandsAndQueriesService } from '../../core/services/items-commands-and-queries.service';
import { map, Observable } from 'rxjs';
import { LetDirective } from '@ngrx/component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    NzFlexModule,
    NzInputModule,
    NzButtonModule,
    FaIconComponent,
    FormsModule,
    ListItemsComponent,
    LetDirective,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected faMagnifyingGlass = faMagnifyingGlass;
  protected SearchText = '';
  protected IsLoading$!: Observable<boolean>;

  constructor(
    private readonly _searchItems: SearchItemsService,
    private readonly _service: ItemsCommandsAndQueriesService
  ) {
    const { Items$ } = this._service.Queries;

    this.IsLoading$ = Items$.pipe(
      map((response) => response.fetchStatus === 'fetching')
    );
  }

  public OnSearch(): void {
    if (!!this.SearchText) {
      this._searchItems.GetItems(this.SearchText);
      this.SearchText = '';
    }
  }
}

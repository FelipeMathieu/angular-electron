import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IItem } from '../../../core/models/item';
import { ItemsCommandsAndQueriesService } from '../../../core/services/items-commands-and-queries.service';
import { LetDirective } from '@ngrx/component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { NzFlexDirective, NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'app-list-items',
  imports: [
    LetDirective,
    AsyncPipe,
    NzEmptyModule,
    CommonModule,
    NzSpinComponent,
    NzFlexModule,
  ],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemsComponent {
  protected ItemsList$!: Observable<IItem[]>;
  protected IsLoading$!: Observable<boolean>;

  constructor(private readonly _service: ItemsCommandsAndQueriesService) {
    const { Items$ } = this._service.Queries;

    this.ItemsList$ = Items$.pipe(map((response) => response.data));
    this.IsLoading$ = Items$.pipe(
      map((response) => response.fetchStatus === 'fetching')
    );
  }
}

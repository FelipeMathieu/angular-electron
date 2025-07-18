import { ChangeDetectionStrategy, Component } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IItem } from '../../../core/models/item';
import { ItemsCommandsAndQueriesService } from '../../../core/services/items-commands-and-queries.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinComponent } from 'ng-zorro-antd/spin';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-items',
  imports: [
    AsyncPipe,
    NzEmptyModule,
    CommonModule,
    NzSpinComponent,
    NzFlexModule,
    NzCardModule,
    NzDescriptionsModule,
    NzButtonModule,
    NzGridModule,
  ],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemsComponent {
  protected ItemsList$!: Observable<IItem[]>;
  protected IsLoading$!: Observable<boolean>;

  constructor(
    private readonly _service: ItemsCommandsAndQueriesService,
    private readonly _router: Router
  ) {
    const { Items$ } = this._service.Queries;

    this.ItemsList$ = Items$.pipe(map((response) => response.data));
    this.IsLoading$ = Items$.pipe(
      map((response) => response.fetchStatus === 'fetching')
    );
  }

  protected OnClick(id: number | string): void {
    this._router.navigate(['selected-item', id]);
  }
}

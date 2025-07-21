import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faArrowUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, shareReplay } from 'rxjs';
import { IItem } from '../../core/models/item';
import { ItemsCommandsAndQueriesService } from '../../core/services/items-commands-and-queries.service';
import { AsyncPipe, CommonModule } from '@angular/common';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzAlertModule } from 'ng-zorro-antd/alert';

@Component({
  selector: 'app-selected-item',
  imports: [
    NzFlexModule,
    NzGridModule,
    NzButtonModule,
    FaIconComponent,
    AsyncPipe,
    CommonModule,
    NzDescriptionsModule,
    NzImageModule,
    NzAlertModule,
  ],
  templateUrl: './selected-item.component.html',
  styleUrl: './selected-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedItemComponent {
  protected faArrowLeft = faArrowLeft;
  protected faArrowUpRightFromSquare = faArrowUpRightFromSquare;
  protected SelectedItem$!: Observable<IItem | undefined>;

  constructor(
    private readonly _router: Router,
    private readonly _service: ItemsCommandsAndQueriesService,
    private readonly _activatedRoute: ActivatedRoute
  ) {
    const { GetSelectedItem$ } = this._service.Queries;

    const id = this._activatedRoute.snapshot.paramMap.get('id');

    this.SelectedItem$ = id
      ? GetSelectedItem$(id).pipe(shareReplay(1))
      : of(undefined);
  }

  protected OnBackHome(): void {
    this._router.navigate(['']);
  }

  protected OpenDetails(url: string): void {
    window.electronAPI.openExternal(url);
  }
}

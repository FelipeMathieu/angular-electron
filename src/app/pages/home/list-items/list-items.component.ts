import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-list-items',
  imports: [],
  templateUrl: './list-items.component.html',
  styleUrl: './list-items.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemsComponent {}

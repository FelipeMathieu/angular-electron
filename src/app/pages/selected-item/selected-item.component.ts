import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-selected-item',
  imports: [NzFlexModule, NzGridModule, NzButtonModule, FaIconComponent],
  templateUrl: './selected-item.component.html',
  styleUrl: './selected-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectedItemComponent {
  protected faArrowLeft = faArrowLeft;

  constructor(private readonly _router: Router) {}

  protected OnBackHome(): void {
    this._router.navigate(['']);
  }
}

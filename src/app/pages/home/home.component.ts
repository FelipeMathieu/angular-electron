import { Component } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [
    NzFlexModule,
    NzInputModule,
    NzButtonModule,
    FaIconComponent,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  protected faMagnifyingGlass = faMagnifyingGlass;
  protected SearchText = '';

  public OnSearch(): void {
    if (!!this.SearchText) {
      console.log('**', this.SearchText);
    }
  }
}

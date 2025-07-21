import { AppComponent } from './app.component';
import { createComponentFactory, Spectator } from '@ngneat/spectator';

describe('AppComponent', () => {
  let spectator: Spectator<AppComponent>;
  const createComponent = createComponentFactory({
    component: AppComponent,
    shallow: true,
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createComponent();
  });

  it('should render component', () => {
    const element = spectator.query('main');

    expect(element).toBeTruthy();
  });
});

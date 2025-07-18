import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedItemComponent } from './selected-item.component';

xdescribe('SelectedItemComponent', () => {
  let component: SelectedItemComponent;
  let fixture: ComponentFixture<SelectedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectedItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

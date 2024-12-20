import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferesLayoutComponent } from './choferes-layout.component';

describe('ChoferesLayoutComponent', () => {
  let component: ChoferesLayoutComponent;
  let fixture: ComponentFixture<ChoferesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoferesLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoferesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

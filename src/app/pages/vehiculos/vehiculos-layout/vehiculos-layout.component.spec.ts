import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculosLayoutComponent } from './vehiculos-layout.component';

describe('VehiculosLayoutComponent', () => {
  let component: VehiculosLayoutComponent;
  let fixture: ComponentFixture<VehiculosLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculosLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculosLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

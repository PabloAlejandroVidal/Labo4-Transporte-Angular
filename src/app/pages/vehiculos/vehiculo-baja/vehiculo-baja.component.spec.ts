import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoBajaComponent } from './vehiculo-baja.component';

describe('VehiculoBajaComponent', () => {
  let component: VehiculoBajaComponent;
  let fixture: ComponentFixture<VehiculoBajaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculoBajaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculoBajaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

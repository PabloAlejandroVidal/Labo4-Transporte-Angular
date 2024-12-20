import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoModificacionComponent } from './vehiculo-modificacion.component';

describe('VehiculoModificacionComponent', () => {
  let component: VehiculoModificacionComponent;
  let fixture: ComponentFixture<VehiculoModificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculoModificacionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculoModificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoAltaNuevoComponent } from './vehiculo-alta-nuevo.component';

describe('VehiculoAltaNuevoComponent', () => {
  let component: VehiculoAltaNuevoComponent;
  let fixture: ComponentFixture<VehiculoAltaNuevoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculoAltaNuevoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculoAltaNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

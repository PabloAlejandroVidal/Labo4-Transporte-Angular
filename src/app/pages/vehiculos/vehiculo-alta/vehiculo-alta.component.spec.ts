import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculoAltaComponent } from './vehiculo-alta.component';

describe('VehiculoAltaComponent', () => {
  let component: VehiculoAltaComponent;
  let fixture: ComponentFixture<VehiculoAltaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculoAltaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiculoAltaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoferDetalleComponent } from './chofer-detalle.component';

describe('ChoferDetalleComponent', () => {
  let component: ChoferDetalleComponent;
  let fixture: ComponentFixture<ChoferDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoferDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChoferDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaChoferesComponent } from './lista-choferes.component';

describe('ListaChoferesComponent', () => {
  let component: ListaChoferesComponent;
  let fixture: ComponentFixture<ListaChoferesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaChoferesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaChoferesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

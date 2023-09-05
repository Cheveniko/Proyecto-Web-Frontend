import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionVueloComponent } from './seleccion-vuelo.component';

describe('SeleccionVueloComponent', () => {
  let component: SeleccionVueloComponent;
  let fixture: ComponentFixture<SeleccionVueloComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionVueloComponent]
    });
    fixture = TestBed.createComponent(SeleccionVueloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItinerarioComponent } from './itinerario.component';

describe('ItinerarioComponent', () => {
  let component: ItinerarioComponent;
  let fixture: ComponentFixture<ItinerarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItinerarioComponent]
    });
    fixture = TestBed.createComponent(ItinerarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
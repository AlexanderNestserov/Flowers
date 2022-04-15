import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartOrderErrorFormComponent } from './cart-order-error-form.component';

describe('CartOrderErrorFormComponent', () => {
  let component: CartOrderErrorFormComponent;
  let fixture: ComponentFixture<CartOrderErrorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CartOrderErrorFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartOrderErrorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
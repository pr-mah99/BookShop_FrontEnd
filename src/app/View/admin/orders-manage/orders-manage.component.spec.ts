import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersManageComponent } from './orders-manage.component';

describe('OrdersManageComponent', () => {
  let component: OrdersManageComponent;
  let fixture: ComponentFixture<OrdersManageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersManageComponent]
    });
    fixture = TestBed.createComponent(OrdersManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

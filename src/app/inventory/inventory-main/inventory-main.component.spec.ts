import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { InventoryMainComponent } from './inventory-main.component';

describe('InventoryMainComponent', () => {
  let component: InventoryMainComponent;
  let fixture: ComponentFixture<InventoryMainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ InventoryMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventoryMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

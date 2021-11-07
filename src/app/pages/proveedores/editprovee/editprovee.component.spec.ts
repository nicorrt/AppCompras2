import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditproveeComponent } from './editprovee.component';

describe('EditproveeComponent', () => {
  let component: EditproveeComponent;
  let fixture: ComponentFixture<EditproveeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditproveeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditproveeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
